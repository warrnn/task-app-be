import mongoose from "mongoose";
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

export async function updateTask(req, res) {
    try {
        const { title, description, startedAt, endAt } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title field is required"
            });
        }

        const taskId = req.params.id;
        const userId = req.user._id;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId: userId },
            {
                $set: {
                    title: title,
                    description: description,
                    startedAt: startedAt,
                    endAt: endAt
                }
            },
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        return res.status(201).json({
            message: "Task updated successfully",
            task: updatedTask
        });
    } catch (err) {
        console.error("Update task error:", err)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function deleteTask(req, res) {
    try {
        const taskId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                message: "Invalid task ID format"
            });
        }

        const userId = req.user._id;

        const deletedTask = await Task.findOneAndDelete(
            { _id: taskId, userId: userId }
        );

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task has been successfully deleted",
            task: deletedTask
        });
    } catch (err) {
        console.error("Delete task error:", err)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}