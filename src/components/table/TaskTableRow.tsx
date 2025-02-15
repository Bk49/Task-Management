import { TableCell, TableRow } from "@mui/material";
import React from "react";
import useKeyStore from "../../hooks/useKeyStore";
import { TaskItem } from "../../types/task";
import DeleteTaskDialog from "../dialog/DeleteTaskDialog";
import MutateTaskDialog from "../dialog/MutateTaskDialog";

interface TaskTableRowProps {
    task: TaskItem;
}

const TaskTableRow: React.FC<TaskTableRowProps> = ({ task }) => {
    const { keys } = useKeyStore();

    return (
        <TableRow>
            {[
                "id",
                "title",
                "status",
                "priority",
                ...keys.map(({ key }) => key),
            ].map((key) => (
                <TableCell key={`${task.id} - ${key}`}>{task[key]}</TableCell>
            ))}
            <TableCell>
                <MutateTaskDialog isEdit task={task} />
                <DeleteTaskDialog task={task} />
            </TableCell>
        </TableRow>
    );
};

export default TaskTableRow;
