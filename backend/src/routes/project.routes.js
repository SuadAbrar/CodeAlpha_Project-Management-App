import express from 'express';
import { createProject, getProjects, addMember } from '../controllers/project.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.route('/').post(createProject).get(getProjects);
router.post('/:projectId/members', addMember);

export default router;
