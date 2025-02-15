import EditIcon from "@mui/icons-material/Edit";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Stack,
} from "@mui/material";
import React from "react";
import { FormProvider } from "react-hook-form";
import {
    priorityOptions,
    statusOptions,
} from "../../constants/dropdown-options/taskOptions";
import useMutateTask from "../../hooks/useMutateTask";
import { TaskItem } from "../../types/task";
import ControlledSingleDropdown from "../form/ControlledSingleDropdrown";
import ControlledTextField from "../form/ControlledTextField";

interface MutateTaskDialogProps {
    isEdit?: boolean;
    task?: TaskItem;
}

const MutateTaskDialog: React.FC<MutateTaskDialogProps> = ({
    isEdit = false,
    task,
}) => {
    const { submitForm, open, handleClose, handleOpen, formState } =
        useMutateTask(isEdit, task);

    return (
        <>
            {isEdit ? (
                <IconButton
                    color="info"
                    aria-label={`Edit Task: ${task?.title}`}
                    onClick={handleOpen}
                >
                    <EditIcon />
                </IconButton>
            ) : (
                <Button
                    variant="contained"
                    aria-label="Open Create Task Dialog"
                    onClick={handleOpen}
                >
                    {`${isEdit ? "Edit" : "Create"} task`}
                </Button>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby={`${isEdit ? "Edit" : "Create New"} Task`}
                aria-describedby={`A modal to ${
                    isEdit ? "edit" : "create new"
                } task with title, priority, status and custom properties`}
            >
                <DialogTitle>
                    {`${isEdit ? "Edit" : "Create"} Task`}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <FormProvider {...formState}>
                        <Stack spacing={2}>
                            <ControlledTextField
                                name="title"
                                aria-label="Title Text Field"
                                sx={{ width: { sm: "20rem", md: "30rem" } }}
                                variant="outlined"
                                label="Title"
                            />
                            <ControlledSingleDropdown
                                name="priority"
                                label="Priority"
                                aria-label="Priority Single Option Dropdown"
                                options={priorityOptions}
                            />
                            <ControlledSingleDropdown
                                name="status"
                                label="Status"
                                aria-label="Status Single Option Dropdown"
                                options={statusOptions}
                            />
                            {/* TODO: handle additional fields */}
                        </Stack>
                    </FormProvider>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={submitForm}>
                        {isEdit ? "Edit Task" : "Create Task"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MutateTaskDialog;
