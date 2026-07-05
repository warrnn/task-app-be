import mongoose from "mongoose";
import Task from "../../models/task.js";

export async function createTask(args, context) {
    try {
        const { title, description, startedAt, endAt } = args;

        if (!title) {
            throw new Error("Title field is required");
        }

        const userId = context.user._id;

        const newTask = await Task.create({ title, description, startedAt, endAt, userId });

        return {
            message: "Task created successfully",
            task: newTask
        };
    } catch (err) {
        console.error("Create task error:", err);
        throw new Error(err.message || "Internal server error");
    }
}

export async function updateTask(args, context) {
    try {
        const { id: taskId, title, description, startedAt, endAt } = args;

        if (!title) {
            throw new Error("Title field is required");
        }

        const userId = context.user._id;

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

        return {
            message: "Task updated successfully",
            task: updatedTask
        };
    } catch (err) {
        console.error("Update task error:", err)
        throw new Error(err.message || "Internal server error");
    }
}

export async function deleteTask(args, context) {
    try {
        const { id: taskId } = args;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            throw new Error("Invalid task ID format");
        }

        const userId = context.user._id;

        const deletedTask = await Task.findOneAndDelete(
            { _id: taskId, userId: userId }
        );

        if (!deletedTask) {
            throw new Error("Task not found");
        }

        return {
            message: "Task has been successfully deleted",
            task: deletedTask
        };
    } catch (err) {
        console.error("Delete task error:", err)
        throw new Error(err.message || "Internal server error");
    }
}

export async function toggleTaskCompletion(args, context) {
    try {
        const { id: taskId } = args;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            throw new Error("Invalid task ID format");
        }

        const userId = context.user._id;

        const task = await Task.findOne({ _id: taskId, userId: userId });

        if (!task) {
            throw new Error("Task not found");
        }

        const markedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId: userId },
            {
                $set: {
                    isDone: !task.isDone
                }
            },
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        return {
            message: `Task marked as ${markedTask.isDone ? 'completed' : 'incomplete'} successfully`,
            task: markedTask
        };
    } catch (err) {
        console.error("Toggle task completion error:", err)
        throw new Error(err.message || "Internal server error");
    }
}