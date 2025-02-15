import { create } from "zustand";
import TaskLocalStorage from "../classes/TaskLocalStorage";
import { TaskItem } from "../types/task";
import { AddTaskI } from "../zod/addTaskSchema";
import { EditTaskI } from "../zod/editTaskSchema";
import { Sort } from "../types/utility";

interface TaskStore {
    tasks: TaskItem[];
    nextId: number;
    sortBy: string;
    direction: Sort;

    addTask: (task: AddTaskI) => void;
    editTask: (updatedTask: EditTaskI) => void;
    deleteTask: (taskId: number) => void;
    sortTasks: (sortBy: string, direction: Sort) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
    tasks: TaskLocalStorage.getTasks(),
    nextId: TaskLocalStorage.getNextTaskId(),
    sortBy: "id",
    direction: "asc",

    addTask: (task) =>
        set(({ nextId, tasks }) => {
            const newTask = { id: nextId, ...task };
            const newTasks = [...tasks, newTask];
            TaskLocalStorage.setTasks(newTasks);
            return { tasks: newTasks, nextId: nextId + 1 };
        }),

    editTask: (updatedTask) =>
        set(({ tasks }) => {
            const newTasks = tasks.map((task) =>
                task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            ) as TaskItem[];
            TaskLocalStorage.setTasks(newTasks);
            return { tasks: newTasks };
        }),

    deleteTask: (taskId) =>
        set(({ tasks }) => {
            const newTasks = tasks.filter((task) => task.id !== taskId);
            TaskLocalStorage.setTasks(newTasks);
            return { tasks: newTasks };
        }),

    sortTasks: (sortBy, direction) =>
        set(({ tasks }) => {
            const sortedAsc = tasks.sort((a, b) => {
                if (!sortBy) return 0;

                return a[sortBy] < b[sortBy]
                    ? -1
                    : a[sortBy] === b[sortBy]
                    ? 0
                    : 1;
            });

            return {
                tasks: direction === "asc" ? sortedAsc : sortedAsc.reverse(),
                direction,
                sortBy,
            };
        }),
}));

export default useTaskStore;
