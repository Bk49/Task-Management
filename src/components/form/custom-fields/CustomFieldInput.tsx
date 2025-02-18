import React, { useMemo } from "react";
import { KeyTypes } from "../../../types/utility";
import ControlledTextField from "../mui-wrapper/ControlledTextField";
import ControlledCheckBox from "../mui-wrapper/ControlledCheckbox";

interface CustomFieldInputProps {
    name: string;
    type: KeyTypes;
}

const CustomFieldInput: React.FC<CustomFieldInputProps> = ({ name, type }) => {
    const label = useMemo(
        () => name.charAt(0).toUpperCase() + name.slice(1),
        [name]
    );

    return (
        <>
            {type === "boolean" ? (
                <ControlledCheckBox
                    name={name}
                    label={label}
                    aria-label={`Custom field - ${name} Checkbox`}
                />
            ) : (
                <ControlledTextField
                    name={name}
                    type={type}
                    aria-label={`Custom field - ${name} Text Field`}
                    variant="outlined"
                    label={label}
                />
            )}
        </>
    );
};

export default CustomFieldInput;
