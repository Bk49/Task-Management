export type Priority = "high" | "none" | "medium" | "low" | "urgent";
export type Status = "in_progress" | "not_started" | "completed";

export type TaskItem = {
    id: number;
    title: string;
    status: Status;
    priority: Priority;
    [key: string]: string | number | boolean;
};
