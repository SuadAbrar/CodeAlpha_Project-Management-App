import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed, // For additional data like taskId, oldStatus, newStatus, etc.
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("ActivityLog", activityLogSchema);