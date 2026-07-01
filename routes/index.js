import express from 'express';
import authRoutes from './api/auth.js';
import taskRoutes from './api/task.js';
import { protect } from '../middlewares/authMiddleware.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/task', protect, taskRoutes);

export default apiRouter;