import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
} from "@mui/material";
import React from "react";
import useKeyStore from "../../hooks/store/useKeyStore";
import useTaskComputeStore from "../../hooks/store/useTaskComputeStore";

const TaskTableHeader: React.FC = ({}) => {
    const { sortBy, direction, setSort } = useTaskComputeStore();
    const { keys } = useKeyStore();

    return (
        <TableHead>
            <TableRow>
                {[
                    "id",
                    "title",
                    "status",
                    "priority",
                    ...keys.map(({ name }) => name),
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
