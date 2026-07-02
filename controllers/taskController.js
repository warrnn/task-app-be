import Task from "../models/task.js";

export async function createTask(req, res) {
    try {
        const { title, description, startedAt, endAt } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title field is required"
            });
        }

        const userId = req.user._id;

        const newTask = await Task.create({ title, description, startedAt, endAt, userId });

        return res.status(201).json({
            message: "Task created successfully",
            task: newTask
        });
    } catch (err) {
        console.error("Create task error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function getTask(req, res) {
    try {
        const userId = req.user._id;

        const tasks = await Task.find({ userId: userId });

        return res.status(200).json({
            message: tasks.length > 0 ? "Task found" : "No tasks found",
            task: tasks
        });
    } catch (err) {
        console.error("Get task error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}