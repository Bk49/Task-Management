import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import { Grid2, IconButton } from "@mui/material";
import React from "react";
import { customFieldsOptions } from "../../../constants/dropdown-options/customFieldsOptions";
import ControlledSingleDropdown from "../mui-wrapper/ControlledSingleDropdrown";
import ControlledTextField from "../mui-wrapper/ControlledTextField";
import { UseFieldArrayRemove } from "react-hook-form";

interface CustomFieldFieldArrayProps {
    index: number;
    remove: UseFieldArrayRemove;
}

const CustomFieldFieldArray: React.FC<CustomFieldFieldArrayProps> = ({
    index,
    remove,
}) => {
    return (
        <Grid2 container direction="row" spacing={1}>
            <Grid2 container direction="column" justifyContent="center">
                <IconButton size="small" onClick={() => remove(index)}>
                    <RemoveIcon />
                </IconButton>
            </Grid2>

            <ControlledTextField
                name={`customFields.${index}.name`}
                aria-label={`Custom Field Name ${index + 1} Text Field`}
                label={`Custom Field Name ${index + 1}`}
                variant="outlined"
            />
            <ControlledSingleDropdown
                name={`customFields.${index}.type`}
                aria-label={`Custom Field Type ${index + 1} Text Field`}
                label={`Custom Field Type ${index + 1}`}
                options={customFieldsOptions}
            />
        </Grid2>
    );
};

export default CustomFieldFieldArray;
