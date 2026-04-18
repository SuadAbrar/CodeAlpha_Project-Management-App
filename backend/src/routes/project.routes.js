import express from "express";
import {
  createProject,
  getProjects,
  getProject,
  addMember,
} from "../controllers/project.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.route("/").post(createProject).get(getProjects);
router.get("/:projectId", getProject);
router.post("/:projectId/members", addMember);

export default router;
