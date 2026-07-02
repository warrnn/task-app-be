import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title must be filled!']
    },
    description: {
        type: String,
        required: false
    },
    isDone: {
        type: Boolean,
        required: true,
        default: false
    },
    startedAt: {
        type: Date,
        required: false
    },
    endAt: {
        type: Date,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Task must belong to a user!']
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;