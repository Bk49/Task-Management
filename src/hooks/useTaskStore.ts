import { create } from "zustand";
import TaskLocalStorage from "../classes/TaskLocalStorage";
import { Priority, Status, TaskItem } from "../types/task";
import { AddTaskI } from "../zod/addTaskSchema";
import { EditTaskI } from "../zod/editTaskSchema";
import { Sort } from "../types/utility";

interface TaskStore {
    tasks: TaskItem[];
    nextId: number;

    addTask: (task: AddTaskI) => void;
    editTask: (updatedTask: EditTaskI) => void;
    deleteTask: (taskId: number) => void;

    // For performing sorting, filtering and pagination
    sortBy: keyof TaskItem;
    direction: Sort;
    priorityFilter?: Priority;
    statusFilter?: Status;
    titleFilter: string;

    setSort: (label: string) => void;
    setPriorityFilter: (priority: Priority) => void;
    setStatusFilter: (status: Status) => void;
    setTitleFilter: (title: string) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
    tasks: TaskLocalStorage.getTasks(),
    nextId: TaskLocalStorage.getNextTaskId(),

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

    sortBy: "id",
    direction: "asc",
    priorityFilter: undefined,
    statusFilter: undefined,
    titleFilter: "",

    setSort: (label) => {
        console.log("Sort problem");
        set(({ direction, sortBy }) =>
            sortBy === label
                ? { direction: direction === "asc" ? "desc" : "asc" }
                : { sortBy: label }
        );
    },
    setPriorityFilter: (priority) => set(() => ({ priorityFilter: priority })),
    setStatusFilter: (status) => set(() => ({ statusFilter: status })),
    setTitleFilter: (title) => set(() => ({ titleFilter: title })),
}));

export default useTaskStore;
