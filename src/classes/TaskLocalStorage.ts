import { TaskItem } from "../types/task";
import TASKS from "../data/task.json";

class TaskLocalStorage {
    private static readonly taskKey = "tasks"; // Prevent accidental key mismatches

    // Retrieves tasks from localStorage. Initializes with TASKS if empty or corrupted
    static getTasks(): TaskItem[] {
        try {
            const storedTasks = localStorage.getItem(this.taskKey);
            if (storedTasks) {
                return JSON.parse(storedTasks) as TaskItem[];
            }
        } catch (_) {
            console.error("Error reading tasks from localStorage.");
        }

        // Fallback to default TASKS and initialize localStorage
        this.setTasks(TASKS as TaskItem[]);
        return TASKS as TaskItem[];
    }

    // Overwrite tasks in local storage
    static setTasks(tasks: TaskItem[]) {
        try {
            localStorage.setItem(this.taskKey, JSON.stringify(tasks));
        } catch (_) {
            console.error("Error saving tasks to localStorage.");
        }
    }

    static getNextTaskId(): number {
        const tasks = this.getTasks();
        return tasks[tasks.length - 1].id + 1;
    }

    // Append new task at the end of tasks array
    // static addTask(newTask: TaskItem) {
    //     try {
    //         const tasks = this.getTasks();
    //         this.setTasks([...tasks, newTask]);
    //     } catch (_) {
    //         console.error("Error adding task to localStorage.");
    //     }
    // }

    // Delete a task by its id
    // static removeTask(taskId: number) {
    //     const tasks = this.getTasks().filter((task) => task.id !== taskId);
    //     this.setTasks(tasks);
    // }

    // Edit an existing task
    // static updateTask(updatedTask: TaskItem): void {
    //     try {
    //         const tasks = this.getTasks().map((task) =>
    //             task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    //         );
    //         this.setTasks(tasks);
    //     } catch (_) {
    //         console.error("Error updating task in localStorage.");
    //     }
    // }
}

export default TaskLocalStorage;
