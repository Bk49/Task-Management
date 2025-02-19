import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";
import useHistoryStore from "../store/useHistoryStore";
import useTaskStore from "../store/useTaskStore";

const useHistoryActions = () => {
    const { undo, redo } = useHistoryStore();
    const { tasks, addTask, deleteTask, editTask } = useTaskStore();

    return useCallback(
        (action: "undo" | "redo") => {
            const history = action === "undo" ? undo(tasks) : redo(tasks);
            if (!history) return;

            const { operation, next, prev } = history;
            const snackString = operation.split("-").join(" ");

            // setTasks(action === "undo" ? snapshot : redoHistory!);
            switch (operation) {
                case "add-task":
                    action === "redo" ? addTask(next) : deleteTask(next.id);
                    break;
                case "delete-task":
                    action === "redo" ? deleteTask(next.id) : addTask(next);
                    break;
                case "edit-task":
                    action === "redo" ? editTask(next) : editTask(prev!);
                    break;
            }

            enqueueSnackbar(
                `${snackString.charAt(0).toUpperCase()}${snackString.slice(
                    1
                )} operation has been ${action}!`,
                { variant: "info" }
            );
        },
        [undo, redo]
    );
};

export default useHistoryActions;
