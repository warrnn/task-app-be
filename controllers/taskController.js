import Task from "../models/task.js";

export async function createTask(req, res) {
    try {
        const { title, description, startedAt, endAt } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title field is required"
            });
        }

        const newTask = await Task.create({ title, description, startedAt, endAt });

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