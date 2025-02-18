import { Typography } from "@mui/material";
import { SelectOption } from "../../components/form/mui-wrapper/ControlledSingleDropdrown";
import { Priority, Status } from "../../types/task";

// TODO: Add some icons for the options
export const priorityOptions: SelectOption<Priority>[] = [
    {
        label: <Typography>None</Typography>,
        value: "none",
    },
    {
        label: <Typography>Urgent</Typography>,
        value: "urgent",
    },
    {
        label: <Typography>High</Typography>,
        value: "high",
    },
    {
        label: <Typography>Medium</Typography>,
        value: "medium",
    },
    {
        label: <Typography>Low</Typography>,
        value: "low",
    },
] as SelectOption<Priority>[];

export const statusOptions: SelectOption<Status>[] = [
    {
        label: <Typography>Not Started</Typography>,
        value: "not_started",
    },
    {
        label: <Typography>In Progress</Typography>,
        value: "in_progress",
    },
    {
        label: <Typography>Completed</Typography>,
        value: "completed",
    },
];
