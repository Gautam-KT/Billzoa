import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    project_type: {
      type: String,
      default: null,
    },
    budget: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    status: {
      type: String,
      enum: ["new", "replied", "offered", "scheduled", "archived"],
      default: "new",
    },
    admin_notes: {
      type: String,
      default: "",
    },
    offer_amount: {
      type: String,
      default: "",
    },
    offer_details: {
      type: String,
      default: "",
    },
    zoom_meeting: {
      join_url: String,
      start_url: String,
      meeting_id: String,
      password: String,
      scheduled_time: String,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Prevent model overwrite in development hot reloading
export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema)