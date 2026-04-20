import ActivityLog from "../models/activityLog.model.js";

export const logActivity = async (userId, projectId, action, details = {}) => {
  try {
    await ActivityLog.create({
      userId,
      projectId,
      action,
      details,
    });
  } catch (error) {
    console.error("Error logging activity:", error);
    // Don't throw error to avoid breaking main functionality
  }
};