import {
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import React, { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

export interface SelectOption<T> {
    label: ReactNode;
    value: T;
}

interface ControlledSingleDropdownProps {
    name: string;
    label: string;
    "aria-label": string;
    emptySelectionStr?: string;
    options: SelectOption<any>[];
}

const ControlledSingleDropdown: React.FC<ControlledSingleDropdownProps> = ({
    name,
    label,
    emptySelectionStr,
    options,
    ...rest
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            defaultValue=""
            name={name}
            render={({ field, fieldState }) => (
                <Box sx={{ minWidth: 240 }}>
                    <FormControl error={!!fieldState.error} fullWidth>
                        <InputLabel>{label}</InputLabel>
                        <Select
                            {...field}
                            label={label}
                            aria-label={rest["aria-label"]}
                        >
                            {emptySelectionStr && (
                                <MenuItem value="">
                                    {emptySelectionStr}
                                </MenuItem>
                            )}
                            {options.map(({ label, value }) => (
                                <MenuItem key={value} value={value}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                        {fieldState.error && fieldState.error.message && (
                            <FormHelperText>
                                {fieldState.error.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Box>
            )}
        />
    );
};

export default ControlledSingleDropdown;
