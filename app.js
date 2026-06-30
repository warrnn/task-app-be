import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import apiRouter from './routes/index.js';

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware to fetch JSON data from client
app.use(express.json());

// Import routes endpoint
app.use('/api', apiRouter);

// Calling function from config to connecting DB
connectDB().then(() => {
    // Server Running
    app.listen(port, () => {
        console.log(`Running on ${port}...`);
    });
})