import express from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.post("/task/:taskId", addComment);
router.get("/task/:taskId", getComments);

export default router;
