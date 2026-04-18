import express from "express";
import {
  createTask,
  getTasksByProject,
  updateTask,
  moveTask,
  assignUserToTask,
} from "../controllers/task.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.post("/", createTask);
router.get("/project/:projectId", getTasksByProject);
router.put("/:taskId", updateTask);
router.put("/:taskId/move", moveTask);
router.put("/:taskId/assign", assignUserToTask);

export default router;
