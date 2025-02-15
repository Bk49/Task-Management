import {
    TableHead,
    TableRow,
    TableCell,
    Typography,
    TableSortLabel,
} from "@mui/material";
import React from "react";
import useTaskStore from "../../hooks/useTaskStore";
import useKeyStore from "../../hooks/useKeyStore";

const TaskTableHeader: React.FC = ({}) => {
    const { sortTasks, sortBy, direction } = useTaskStore();
    const { keys } = useKeyStore();

    return (
        <TableHead>
            <TableRow>
                {[
                    "id",
                    "title",
                    "status",
                    "priority",
                    ...keys.map(({ key }) => key),
                ].map((label) => (
                    <TableCell
                        onClick={() =>
                            sortTasks(
                                label,
                                sortBy === label
                                    ? direction === "asc"
                                        ? "desc"
                                        : "asc"
                                    : direction
                            )
                        }
                        key={label}
                        aria-label={`${label}-h`}
                    >
                        <Typography variant="subtitle1" fontWeight={800}>
                            <TableSortLabel
                                active={sortBy === label}
                                direction={direction}
                            >
                                {label.length === 0
                                    ? label
                                    : label.charAt(0).toUpperCase() +
                                      label.slice(1)}
                            </TableSortLabel>
                        </Typography>
                    </TableCell>
                ))}
                <TableCell>
                    <Typography variant="subtitle1" fontWeight={800}>
                        Actions
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TaskTableHeader;
