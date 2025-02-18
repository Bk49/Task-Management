import { Typography } from "@mui/material";
import { SelectOption } from "../../components/form/mui-wrapper/ControlledSingleDropdrown";
import { KeyTypes } from "../../types/utility";

export const customFieldsOptions: SelectOption<KeyTypes>[] = [
    {
        label: <Typography>Text</Typography>,
        value: "string",
    },
    {
        label: <Typography>Number</Typography>,
        value: "number",
    },
    {
        label: <Typography>Checkbox</Typography>,
        value: "boolean",
    },
];
