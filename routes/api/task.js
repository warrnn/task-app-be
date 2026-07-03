import express from 'express';
import { createTask, deleteTask, getTask, updateTask } from '../../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;