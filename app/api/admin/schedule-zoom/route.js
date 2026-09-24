export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { createZoomMeeting } from "@/lib/zoom";
import nodemailer from "nodemailer";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("billzoa_admin")?.value === "authenticated";
}

export async function POST(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { inquiryId, clientEmail, clientName, projectType, startTime } = body;

    if (!inquiryId || !startTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Create Zoom Meeting
    const meeting = await createZoomMeeting({
      topic: `Billzoa x ${clientName || "Client"}: ${projectType || "Discovery"}`,
      startTime: new Date(startTime).toISOString(),
      duration: 30,
    });

    // 2. Save into MongoDB
    await connectDB();
    await Inquiry.findByIdAndUpdate(inquiryId, {
      $set: {
        status: "scheduled",
        offer_details: `Zoom Scheduled: ${meeting.joinUrl}`,
        zoom_meeting: {
          join_url: meeting.joinUrl,
          start_url: meeting.startUrl,
          meeting_id: meeting.meetingId,
          password: meeting.password,
          scheduled_time: new Date(startTime).toISOString(),
        },
      },
    });

    // 3. Email client the meeting details
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS && clientEmail) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Billzoa" <${process.env.GMAIL_USER}>`,
        to: clientEmail,
        subject: `Discovery Call: Billzoa x ${clientName || "Client"}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.5; color: #222; max-width: 560px;">
            <h2>Project Discovery Meeting</h2>
            <p>Hi ${clientName || "there"},</p>
            <p>A 30-minute discovery call has been scheduled to discuss your project (<strong>${projectType || "Discovery"}</strong>).</p>
            <p><strong>Time:</strong> ${new Date(startTime).toUTCString()}</p>
            <p style="margin: 20px 0;">
              <a href="${meeting.joinUrl}" style="background: #2563eb; color: #fff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                Join Zoom Meeting
              </a>
            </p>
            <p style="font-size: 0.85rem; color: #666;">Meeting ID: ${meeting.meetingId} | Passcode: ${meeting.password}</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true, meeting });
  } catch (err) {
    console.error("[zoom error]:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}