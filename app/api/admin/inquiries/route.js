import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export const dynamic = "force-dynamic";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("billzoa_admin")?.value === "authenticated";
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    // Return all inquiries sorted latest first, mapped with virtual id for backward compatibility
    const docs = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
    const inquiries = docs.map((doc) => ({
      ...doc,
      id: doc._id.toString(),
    }));

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error("[mongodb] fetch inquiries error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, _id, status, admin_notes, offer_amount, offer_details } = body;
    const targetId = _id || id;

    if (!targetId) {
      return NextResponse.json({ error: "Missing inquiry ID" }, { status: 400 });
    }

    await connectDB();

    const updateFields = {};
    if (status !== undefined) updateFields.status = status;
    if (admin_notes !== undefined) updateFields.admin_notes = admin_notes;
    if (offer_amount !== undefined) updateFields.offer_amount = offer_amount;
    if (offer_details !== undefined) updateFields.offer_details = offer_details;

    const updated = await Inquiry.findByIdAndUpdate(
      targetId,
      { $set: updateFields },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({
      inquiry: {
        ...updated,
        id: updated._id.toString(),
      },
    });
  } catch (error) {
    console.error("[mongodb] update inquiry error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}