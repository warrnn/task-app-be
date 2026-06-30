import express from 'express';
import testRoutes from './api/test.js';

const apiRouter = express.Router();

apiRouter.use('/test', testRoutes);

export default apiRouter;