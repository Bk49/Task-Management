import * as z from "zod";

const editTaskSchema = z
    .object({
        id: z.number().min(1),
        title: z.string().min(1, "Title is a required field"),
        priority: z.enum(["high", "none", "medium", "low", "urgent"]),
        status: z.enum(["in_progress", "not_started", "completed"]),
    })
    .passthrough();

export type EditTaskI = z.infer<typeof editTaskSchema>;
export default editTaskSchema;
