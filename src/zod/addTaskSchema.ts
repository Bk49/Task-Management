import * as z from "zod";

const addTaskSchema = z
    .object({
        title: z.string().min(1, "Title is a required field"),
        priority: z.enum(["high", "none", "medium", "low", "urgent"]),
        status: z.enum(["in_progress", "not_started", "completed"]),
    })
    .passthrough();

export type AddTaskI = z.infer<typeof addTaskSchema>;
export default addTaskSchema;
