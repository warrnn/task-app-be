import 'dotenv/config'
import mongoose from 'mongoose';

// Connect to MongoDB
export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected!")
    } catch (err) {
        console.error("Failed to connect DB:", err);
        process.exit(1);
    }
}