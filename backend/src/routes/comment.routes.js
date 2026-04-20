import express from "express";
import { createComment, getCommentsByTask } from "../controllers/comment.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.post("/task/:taskId", createComment);
router.get("/task/:taskId", getCommentsByTask);

export default router;
