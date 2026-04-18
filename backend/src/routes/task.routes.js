import express from 'express';
import { createTask, updateTask, moveTask } from '../controllers/task.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.post('/', createTask);
router.put('/:taskId', updateTask);
router.patch('/:taskId/move', moveTask);

export default router;
