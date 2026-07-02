import express from 'express';
import { createTask, getTask, updateTask } from '../../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/', getTask);
router.patch('/', updateTask);

export default router;