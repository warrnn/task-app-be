import express from 'express';
import authRoutes from './api/auth.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);

export default apiRouter;