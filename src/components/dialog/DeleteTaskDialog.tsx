import DeleteIcon from "@mui/icons-material/Delete";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import useKeyStore from "../../hooks/store/useKeyStore";
import useTaskStore from "../../hooks/store/useTaskStore";
import { TaskItem } from "../../types/task";

interface DeleteTaskDialogProps {
    task: TaskItem;
}

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({ task }) => {
    const [open, setOpen] = useState(false);
    const { keys } = useKeyStore();
    const { deleteTask } = useTaskStore();

    return (
        <>
            <IconButton
                color="error"
                aria-label={`Delete Task: ${task.title}`}
                onClick={() => setOpen(true)}
            >
                <DeleteIcon />
            </IconButton>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="Delete Task"
                aria-describedby="A modal to delete an existing task"
            >
                <DialogTitle>Delete Task</DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography variant="subtitle1">
                        Are you sure you want to delete the following task?
                    </Typography>
                    <ul>
                        {[
                            "id",
                            "title",
                            "status",
                            "priority",
                            ...keys.map(({ name }) => name),
                        ].map((key) => (
                            <li key={key}>
                                <Typography>{`${key}: ${task[key]}`}</Typography>
                            </li>
                        ))}
                    </ul>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(false)}
                        color="inherit"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            deleteTask(task.id);
                            enqueueSnackbar(
                                `Task '${task.title}' has been deleted`,
                                { variant: "error" }
                            );
                        }}
                        color="error"
                    >
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteTaskDialog;
