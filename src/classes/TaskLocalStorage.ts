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
}

export default TaskLocalStorage;
