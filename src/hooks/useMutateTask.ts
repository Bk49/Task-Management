import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import addTaskSchema, { AddTaskI } from "../zod/addTaskSchema";
import editTaskSchema, { EditTaskI } from "../zod/editTaskSchema";
import useTaskStore from "./useTaskStore";
import { TaskItem } from "../types/task";
import { enqueueSnackbar } from "notistack";

const useMutateTask = (isEdit: boolean, task?: TaskItem) => {
    const [open, setOpen] = useState(false);
    const formState = useForm<AddTaskI | EditTaskI>({
        resolver: zodResolver(isEdit ? editTaskSchema : addTaskSchema),
        defaultValues:
            isEdit && task
                ? task
                : {
                      title: "",
                      priority: "none",
                      status: "not_started",
                  },
    });
    const { handleSubmit, reset } = formState;
    const { addTask, editTask } = useTaskStore();

    const submitForm = useCallback(
        handleSubmit(
            (data) => {
                isEdit ? editTask(data as EditTaskI) : addTask(data);

                enqueueSnackbar(
                    `Successfully ${isEdit ? "edited" : "added"} '${
                        data.title
                    }'`,
                    { variant: "success" }
                );
                reset();
                setOpen(false);
            },
            () =>
                enqueueSnackbar(
                    `Task cannot be ${
                        isEdit ? "edited" : "added"
                    }\nPlease check your input again!`,
                    { variant: "warning" }
                )
        ),
        [handleSubmit, editTask, enqueueSnackbar, reset, setOpen, addTask]
    );

    const handleClose = useCallback(() => {
        setOpen(false);
        reset();
    }, [setOpen, reset]);

    return {
        submitForm,
        open,
        handleClose,
        handleOpen: () => setOpen(true),
        formState,
    };
};

export default useMutateTask;
