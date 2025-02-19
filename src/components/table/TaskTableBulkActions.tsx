import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import useHistoryStore from "../../hooks/store/useHistoryStore";
import useSelectedRowStore from "../../hooks/store/useSelectedRowStore";
import useTaskStore from "../../hooks/store/useTaskStore";
import { enqueueSnackbar } from "notistack";

interface TaskTableBulkActionsProps {}

const TaskTableBulkActions: React.FC<TaskTableBulkActionsProps> = ({}) => {
    const { selectedIds, clear } = useSelectedRowStore();
    const { reset } = useHistoryStore();
    const { deleteTask } = useTaskStore();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                aria-label="Bulk delete selected tasks"
                variant="contained"
                color="error"
                onClick={() => setOpen(true)}
            >
                Bulk Delete
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="Bulk Delete Task"
                aria-describedby="A modal to confirm deletion of multiple tasks"
            >
                <DialogTitle>Bulk Delete Tasks</DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography variant="subtitle1">
                        {`Are you sure you want to delete ${selectedIds.size} selected tasks?`}
                    </Typography>
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
                        color="error"
                        onClick={() => {
                            selectedIds.forEach((id) => deleteTask(id));
                            clear();
                            reset();
                            enqueueSnackbar(
                                `${selectedIds.size} tasks has been deleted successfully!`,
                                { variant: "success" }
                            );
                            setOpen(false);
                        }}
                    >
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TaskTableBulkActions;
