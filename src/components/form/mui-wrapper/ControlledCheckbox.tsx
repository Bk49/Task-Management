import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ControlledCheckBoxProps {
    name: string;
    label: string;
}

const ControlledCheckBox: React.FC<ControlledCheckBoxProps> = ({
    name,
    label,
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <FormControlLabel
                    control={<Checkbox {...field} checked={!!field.value} />}
                    label={label}
                />
            )}
        />
    );
};

export default ControlledCheckBox;
