import Task from "../../models/task.js";

export async function getTasks(args, context) {
    try {
        if (!context.user) {
            throw new Error("Unauthorized");
        }

        const userId = context.user._id

        const tasks = await Task.find({
            userId: userId
        });

        return {
            message: tasks.length > 0 ? "Task found" : "No tasks found",
            task: tasks
        };
    } catch (err) {
        console.error("Get task error:", err);
        throw new Error(err.message || "Internal server error");
    }
}