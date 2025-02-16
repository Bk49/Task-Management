import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
} from "@mui/material";
import React from "react";
import useKeyStore from "../../hooks/useKeyStore";
import useTaskStore from "../../hooks/useTaskStore";

const TaskTableHeader: React.FC = ({}) => {
    const { sortBy, direction, setSort } = useTaskStore();
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
                        onClick={() => setSort(label)}
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
