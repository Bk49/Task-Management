import { create } from "zustand";
import TaskLocalStorage from "../../classes/TaskLocalStorage";
import { TaskItem } from "../../types/task";
import { AddTaskI } from "../../zod/addTaskSchema";
import { EditTaskI } from "../../zod/editTaskSchema";
import { Key } from "../../types/utility";

interface TaskStore {
    tasks: TaskItem[];
    nextId: number;

    addTask: (task: AddTaskI) => void;
    editTask: (updatedTask: EditTaskI) => void;
    deleteTask: (taskId: number) => void;
    updateTaskKeys: (keys: Key[]) => void;
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

    updateTaskKeys: (keys: Key[]) => {
        const allowedKeys = new Set([
            "id",
            "title",
            "status",
            "priority",
            ...keys.map(({ name }) => name),
        ]);

        set(({ tasks }) => {
            const newTasks = tasks.map((task) => {
                const updatedTask = { ...task };

                Object.keys(updatedTask).forEach((key) => {
                    if (!allowedKeys.has(key)) {
                        delete updatedTask[key];
                    }
                });

                return updatedTask;
            }) as TaskItem[];

            TaskLocalStorage.setTasks(newTasks);
            return { tasks: newTasks };
        });
    },
}));

export default useTaskStore;
