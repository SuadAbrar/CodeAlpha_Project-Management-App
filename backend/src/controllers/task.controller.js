import Task from "../models/task.model.js";
import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import { logActivity } from "../utils/activityLogger.js";

export const createTask = async (req, res) => {
  const { title, description, projectId, assignedTo } = req.body;

  if (!title || !projectId) {
    return res
      .status(400)
      .json({ message: "Title and projectId are required" });
  }

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const isMember = project.members.some(
    (memberId) => memberId.toString() === req.user._id.toString(),
  );
  if (!isMember) {
    return res
      .status(403)
      .json({ message: "Access denied. You are not a member of this project" });
  }

  if (assignedTo) {
    const assignee = await User.findById(assignedTo);
    if (!assignee) {
      return res.status(404).json({ message: "Assigned user not found" });
    }
    const isAssigneeMember = project.members.some(
      (memberId) => memberId.toString() === assignedTo,
    );
    if (!isAssigneeMember) {
      return res
        .status(400)
        .json({ message: "Assigned user must be a project member" });
    }
  }

  const task = await Task.create({
    title,
    description,
    projectId,
    assignedTo,
  });

  // Log activity
  await logActivity(req.user._id, projectId, "TASK_CREATED", {
    taskId: task._id,
    title: task.title,
  });

  res.status(201).json(task);
};

export const getTasksByProject = async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const isMember = project.members.some(
    (memberId) => memberId.toString() === req.user._id.toString(),
  );
  if (!isMember) {
    return res
      .status(403)
      .json({ message: "Access denied. You are not a member of this project" });
  }

  const tasks = await Task.find({ projectId }).populate(
    "assignedTo",
    "name email",
  );
  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, assignedTo } = req.body;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const project = await Project.findById(task.projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const isMember = project.members.some(
    (memberId) => memberId.toString() === req.user._id.toString(),
  );
  if (!isMember) {
    return res
      .status(403)
      .json({ message: "Access denied. You are not a member of this project" });
  }

  if (assignedTo) {
    const assignee = await User.findById(assignedTo);
    if (!assignee) {
      return res.status(404).json({ message: "Assigned user not found" });
    }
    const isAssigneeMember = project.members.some(
      (memberId) => memberId.toString() === assignedTo,
    );
    if (!isAssigneeMember) {
      return res
        .status(400)
        .json({ message: "Assigned user must be a project member" });
    }
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.assignedTo = assignedTo !== undefined ? assignedTo : task.assignedTo;

  const updatedTask = await task.save();
  res.json(updatedTask);
};

export const moveTask = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!["TODO", "IN_PROGRESS", "DONE"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const project = await Project.findById(task.projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const isMember = project.members.some(
    (memberId) => memberId.toString() === req.user._id.toString(),
  );
  if (!isMember) {
    return res
      .status(403)
      .json({ message: "Access denied. You are not a member of this project" });
  }

  const oldStatus = task.status;
  task.status = status;
  const updatedTask = await task.save();

  // Log activity
  await logActivity(req.user._id, project._id, "TASK_MOVED", {
    taskId: task._id,
    taskTitle: task.title,
    oldStatus,
    newStatus: status,
  });

  res.json(updatedTask);
};

export const assignUserToTask = async (req, res) => {
  const { taskId } = req.params;
  const { userId } = req.body;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const project = await Project.findById(task.projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const isMember = project.members.some(
    (memberId) => memberId.toString() === req.user._id.toString(),
  );
  if (!isMember) {
    return res
      .status(403)
      .json({ message: "Access denied. You are not a member of this project" });
  }

  if (userId) {
    const assignee = await User.findById(userId);
    if (!assignee) {
      return res.status(404).json({ message: "Assigned user not found" });
    }
    const isAssigneeMember = project.members.some(
      (memberId) => memberId.toString() === userId,
    );
    if (!isAssigneeMember) {
      return res
        .status(400)
        .json({ message: "Assigned user must be a project member" });
    }
  }

  task.assignedTo = userId;
  const updatedTask = await task.save();
  res.json(updatedTask);
};
