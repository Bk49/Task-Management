import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
} from "@mui/material";
import React from "react";
import { FormProvider } from "react-hook-form";
import useMutateKeys from "../../hooks/mutate/useMutateKeys";
import CustomFieldFieldArray from "../form/custom-fields/CustomFieldFieldArray";

interface MutateCustomFieldsDialogProps {}

const MutateCustomFieldsDialog: React.FC<
    MutateCustomFieldsDialogProps
> = ({}) => {
    const {
        open,
        formState,
        handleOpen,
        handleClose,
        fields,
        append,
        remove,
        submitForm,
    } = useMutateKeys();

    return (
        <>
            <Button
                color="info"
                variant="contained"
                aria-label="Open Add or Edit Custom Fields Dialog"
                onClick={handleOpen}
            >
                Add or Edit Custom Fields
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="Create or Edit Custom Fields"
                aria-describedby="A modal to create or edit custom fields"
            >
                <DialogTitle>Create or Edit Custom Fields</DialogTitle>
                <Divider />
                <DialogContent
                    sx={{
                        maxWidth: "1200px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                        gap: 2,
                    }}
                >
                    <FormProvider {...formState}>
                        <Stack spacing={2}>
                            {fields.map(({ id }, index) => (
                                <CustomFieldFieldArray
                                    key={id}
                                    {...{ index, remove }}
                                />
                            ))}
                        </Stack>
                    </FormProvider>
                    <Button
                        color="primary"
                        variant="contained"
                        aria-label="Add a new custom field"
                        onClick={() => append({ name: "", type: "string" })}
                    >
                        Add Custom Field
                    </Button>
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
                        Confirm Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MutateCustomFieldsDialog;
