import React from "react";
import { BaseTextFieldProps, TextField as MuiTextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
interface ControlledTextFieldProps extends BaseTextFieldProps {}

/**
 * An extension of the MUI TextField with Controller wrapping it, please make sure to wrap it around react-hook-form's FormProvider component.
 *
 * Please use alongside Zod for validation of these fields.
 *
 * Accepts additional props under the BaseTextFieldProps by MUI types
 *
 * @param {string?} name Represents the "key" of the value of the field, defaults to "text field"
 * @param {string | ReactNode} label A label displayed to the user to indicate the purpose of the field
 * @param {React.HTMLInputTypeAttribute?} type To indicate type of input data such as "number", "password" etc, defaults to "text"
 * @param {"standard" | "outlined" | "filled" | undefined} variant To indicate the MUI variant of the text field, defaults to "standard"
 * @param {MUIIcon} Icon Indicates an icon appended at "iconPosition" of the text field
 * @param {"end" | "start" | undefined} iconPosition Indicates the position to place the "Icon" stated
 * @param {SxProps<Theme>?} sx Additional styles to be applied on top of the ones by MUI
 *
 * @returns {ReactNode} Returns an MUI TextField
 */

const ControlledTextField: React.FC<ControlledTextFieldProps> = ({
    name,
    label,
    type,
    variant,
    sx,
    multiline,
    rows,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            {...props}
            control={control}
            defaultValue={type === "number" ? 0 : ""}
            name={name ? name : "text field"}
            render={({ field, fieldState }) => (
                <MuiTextField
                    {...field}
                    multiline={multiline}
                    rows={rows}
                    sx={sx}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    label={label}
                    type={type}
                    variant={variant}
                />
            )}
        />
    );
};

export default ControlledTextField;
