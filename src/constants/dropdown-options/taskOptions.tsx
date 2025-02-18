import PriorityChip from "../../components/chips/PriorityChip";
import StatusChip from "../../components/chips/StatusChip";
import { SelectOption } from "../../components/form/mui-wrapper/ControlledSingleDropdrown";
import { Priority, Status } from "../../types/task";

export const priorityOptions: SelectOption<Priority>[] = (
    ["none", "low", "medium", "high", "urgent"] as Priority[]
).map(
    (priority: Priority) =>
        ({
            label: <PriorityChip priority={priority} />,
            value: priority,
        } as SelectOption<Priority>)
);

export const statusOptions: SelectOption<Status>[] = (
    ["not_started", "in_progress", "completed"] as Status[]
).map(
    (status: Status) =>
        ({
            label: <StatusChip status={status} />,
            value: status,
        } as SelectOption<Status>)
);
