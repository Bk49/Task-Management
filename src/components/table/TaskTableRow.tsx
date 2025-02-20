import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import React from "react";
import useKeyStore from "../../hooks/store/useKeyStore";
import { TaskItem } from "../../types/task";
import PriorityChip from "../chips/PriorityChip";
import StatusChip from "../chips/StatusChip";
import DeleteTaskDialog from "../dialog/DeleteTaskDialog";
import MutateTaskDialog from "../dialog/MutateTaskDialog";
import useSelectedRowStore from "../../hooks/store/useSelectedRowStore";

interface TaskTableRowProps {
    task: TaskItem;
}

const TaskTableRow: React.FC<TaskTableRowProps> = ({ task }) => {
    const { keys } = useKeyStore();
    const { selectedIds, add, remove } = useSelectedRowStore();

    return (
        <TableRow selected={selectedIds.has(task.id)}>
            <TableCell padding="checkbox">
                <Checkbox
                    checked={selectedIds.has(task.id)}
                    onChange={(_, isChecked) =>
                        isChecked ? add(task.id) : remove(task.id)
                    }
                />
            </TableCell>
            {[
                "id",
                "title",
                "status",
                "priority",
                ...keys.map(({ name }) => name),
            ].map((key) => (
                <TableCell key={`${task.id} - ${key}`}>
                    {key === "priority" ? (
                        <PriorityChip priority={task["priority"]} />
                    ) : key === "status" ? (
                        <StatusChip status={task["status"]} />
                    ) : // For handling text
                    keys.findIndex(
                          ({ name, type }) => name === key && type === "boolean"
                      ) === -1 ? (
                        task[key]?.toString() ?? "Undefined"
                    ) : task[key] ? (
                        // For handling check boxes
                        <CheckIcon color="success" />
                    ) : (
                        <CloseIcon color="error" />
                    )}
                </TableCell>
            ))}
            <TableCell>
                <MutateTaskDialog isEdit task={task} />
                <DeleteTaskDialog task={task} />
            </TableCell>
        </TableRow>
    );
};

export default TaskTableRow;
