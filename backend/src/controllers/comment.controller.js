import Comment from "../models/comment.model.js";
import Task from "../models/task.model.js";
import Project from "../models/project.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { logActivity } from "../utils/activityLogger.js";

export const createComment = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  if (!text || text.trim().length === 0) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  // Validate task exists
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Validate user is member of project
  const project = await Project.findById(task.projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const isMember = project.members.some(member => member.toString() === userId.toString()) ||
                   project.owner.toString() === userId.toString();

  if (!isMember) {
    return res.status(403).json({ message: "Not authorized to comment on this task" });
  }

  // Create comment
  const comment = await Comment.create({
    userId,
    taskId,
    text: text.trim(),
  });

  // Populate user info
  await comment.populate('userId', 'name email');

  // Log activity
  await logActivity(userId, project._id, "COMMENT_ADDED", {
    taskId,
    taskTitle: task.title,
    commentId: comment._id,
  });

  res.status(201).json(comment);
});

export const getCommentsByTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user._id;

  // Validate task exists
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Validate user is member of project
  const project = await Project.findById(task.projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const isMember = project.members.some(member => member.toString() === userId.toString()) ||
                   project.owner.toString() === userId.toString();

  if (!isMember) {
    return res.status(403).json({ message: "Not authorized to view comments on this task" });
  }

  // Get comments with user info
  const comments = await Comment.find({ taskId })
    .populate('userId', 'name email')
    .sort({ createdAt: 1 });

  res.json(comments);
});
