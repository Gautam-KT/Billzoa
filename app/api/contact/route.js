import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/validate";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

const transporter =
  process.env.GMAIL_USER && process.env.GMAIL_PASS
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      })
    : null;

// Simple in-memory limiter (per server instance). Replace with a shared store if you scale out.
const hits = new Map();
const limited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return NextResponse.json(
      { error: "Too many inquiries from this connection. Try again in a few minutes." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The request was malformed." }, { status: 400 });
  }

  // Honeypot filled → pretend success, drop it.
  if (body?.website) return NextResponse.json({ ok: true });

  const { values, errors, valid } = validateInquiry(body || {});
  if (!valid) {
    return NextResponse.json({ error: "Some fields need attention.", errors }, { status: 422 });
  }

  // 1. Insert lead directly into Supabase
  try {
    const { error: dbError } = await supabase.from("inquiries").insert([
      {
        name: values.name,
        company: values.company || null,
        email: values.email,
        project_type: values.projectType,
        budget: values.budget || null,
        message: values.message,
      },
    ]);

    if (dbError) {
      console.error("[supabase] insert error:", dbError.message);
      return NextResponse.json(
        { error: "Could not save your inquiry right now. Please try again later." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[supabase] unexpected connection error:", err);
    return NextResponse.json(
      { error: "Database service unavailable." },
      { status: 500 }
    );
  }

  // 2. Dispatch Email Alert directly to your Gmail inbox
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Billzoa Inquiries" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        replyTo: values.email,
        subject: `New Project Inquiry from ${values.name} (${values.projectType})`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #222; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px;">
            <h2 style="margin-top: 0; color: #111;">New Project Inquiry</h2>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
            <p><strong>Name:</strong> ${values.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${values.email}">${values.email}</a></p>
            <p><strong>Company:</strong> ${values.company || "Not provided"}</p>
            <p><strong>Service Type:</strong> ${values.projectType}</p>
            <p><strong>Budget Range:</strong> ${values.budget || "Unspecified"}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
            <p><strong>Message / Project Scope:</strong></p>
            <p style="white-space: pre-wrap; background: #f9f9f9; padding: 12px; border-radius: 6px;">${values.message}</p>
            <small style="color: #888;">Submitted via Billzoa Contact Form</small>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("[nodemailer] email notification failed:", emailErr);
    }
  }

  // 3. Optional: Forward to external webhook if configured
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "billzoa.com",
          receivedAt: new Date().toISOString(),
          ...values,
        }),
      });
    } catch (err) {
      console.error("[contact] secondary webhook delivery failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}