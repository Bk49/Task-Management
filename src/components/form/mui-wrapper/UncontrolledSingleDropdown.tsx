import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { SelectOption } from "./ControlledSingleDropdrown";
import { SelectInputProps } from "@mui/material/Select/SelectInput";

interface UncontrolledSingleDropdownProps<T> {
    label: string;
    "aria-label": string;
    emptySelectionStr: string;
    options: SelectOption<any>[];
    value: T;
    onChange: SelectInputProps<T>["onChange"];
}

const UncontrolledSingleDropdown: React.FC<
    UncontrolledSingleDropdownProps<any>
> = ({ label, emptySelectionStr, options, onChange, value, ...rest }) => {
    return (
        <Box sx={{ minWidth: 240 }}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value}
                    onChange={onChange}
                    label={label}
                    aria-label={rest["aria-label"]}
                >
                    {emptySelectionStr && (
                        <MenuItem value={undefined}>
                            {emptySelectionStr}
                        </MenuItem>
                    )}
                    {options.map(({ label, value }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default UncontrolledSingleDropdown;
