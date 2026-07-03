import express from 'express';
import { createTask, deleteTask, getTask, toggleTaskCompletion, updateTask } from '../../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id', toggleTaskCompletion);

export default router;