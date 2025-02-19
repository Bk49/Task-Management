import { TaskItem } from "./task";

export type History = {
    prev?: TaskItem;
    next: TaskItem;
    operation: "add-task" | "edit-task" | "delete-task";
};
