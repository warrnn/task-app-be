import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import apiRouter from './routes/index.js';
import { protect } from './middlewares/authMiddleware.js';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema, rootValue } from './graphql/index.js';

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware to fetch JSON data from client
app.use(express.json());

// Import routes endpoint
app.use('/api', apiRouter);

// GraphQL Endpoint
app.all(
    '/graphql',
    protect,
    createHandler({
        schema: schema,
        rootValue: rootValue,
        context: (req) => ({
            user: req.raw.user // Accomodate user for resolver via context
        })
    })
);

// Calling function from config to connecting DB
connectDB().then(() => {
    // Server Running
    app.listen(port, () => {
        console.log(`Running on ${port}...`);
    });
})

// For Vercel
export default app;