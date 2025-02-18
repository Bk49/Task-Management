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
import useMutateTask from "../../hooks/mutate/useMutateTask";
import { TaskItem } from "../../types/task";
import ControlledSingleDropdown from "../form/mui-wrapper/ControlledSingleDropdrown";
import ControlledTextField from "../form/mui-wrapper/ControlledTextField";
import useKeyStore from "../../hooks/store/useKeyStore";
import CustomFieldInput from "../form/custom-fields/CustomFieldInput";

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
    const { keys } = useKeyStore();

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
                        <Stack
                            sx={{ width: { sm: "20rem", md: "30rem" } }}
                            spacing={2}
                        >
                            <ControlledTextField
                                name="title"
                                aria-label="Title Text Field"
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
                            {keys.map((key) => (
                                <CustomFieldInput {...key} />
                            ))}
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
