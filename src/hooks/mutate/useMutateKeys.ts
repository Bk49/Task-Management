import { enqueueSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import editCustomFieldsSchema, {
    EditCustomFieldsI,
} from "../../zod/editCustomFields";
import useKeyStore from "../store/useKeyStore";
import { zodResolver } from "@hookform/resolvers/zod";
import useTaskStore from "../store/useTaskStore";

const useMutateKeys = () => {
    const { setKeys, keys } = useKeyStore();
    const { updateTaskKeys } = useTaskStore();
    const [open, setOpen] = useState(false);
    const formState = useForm<EditCustomFieldsI>({
        resolver: zodResolver(editCustomFieldsSchema),
        defaultValues: {
            customFields:
                keys.length > 0 ? keys : [{ name: "", type: "string" }],
        },
    });
    const { handleSubmit, control } = formState;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "customFields",
    });

    const submitForm = useCallback(
        handleSubmit(
            ({ customFields }) => {
                const fieldKeys = customFields.map(({ name }) => name);

                if (fieldKeys.length !== new Set(fieldKeys).size) {
                    return enqueueSnackbar("There are duplicated keys!", {
                        variant: "error",
                    });
                }

                setKeys(customFields);
                updateTaskKeys(customFields);

                enqueueSnackbar("Successfully updated custom fields", {
                    variant: "success",
                });
                setOpen(false);
            },
            () =>
                enqueueSnackbar(
                    "Unable to edit custom fields, please check for duplicates!",
                    { variant: "warning" }
                )
        ),
        [handleSubmit, enqueueSnackbar, setOpen, setKeys]
    );

    return {
        open,
        formState,
        handleOpen: () => setOpen(true),
        handleClose: () => setOpen(false),
        fields,
        append,
        remove,
        submitForm,
    };
};

export default useMutateKeys;
