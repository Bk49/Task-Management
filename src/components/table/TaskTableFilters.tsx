import React from "react";
import {
    priorityOptions,
    statusOptions,
} from "../../constants/dropdown-options/taskOptions";
import useTaskComputeStore from "../../hooks/store/useTaskComputeStore";
import UncontrolledSingleDropdown from "../form/mui-wrapper/UncontrolledSingleDropdown";
import { TextField } from "@mui/material";

interface TaskTableFiltersProps {}

const TaskTableFilters: React.FC<TaskTableFiltersProps> = ({}) => {
    const {
        priorityFilter,
        statusFilter,
        setPriorityFilter,
        setStatusFilter,
        titleFilter,
        setTitleFilter,
    } = useTaskComputeStore();

    return (
        <>
            <TextField
                label="Search for task by Title"
                aria-label="Search task by Title Text Field"
                value={titleFilter}
                onChange={({ target }) => setTitleFilter(target.value)}
            />
            <UncontrolledSingleDropdown
                label="Priority Filter"
                aria-label="Priority Filter Single Option Dropdown"
                options={priorityOptions}
                emptySelectionStr="All priority"
                value={priorityFilter}
                onChange={({ target }) => setPriorityFilter(target.value)}
            />
            <UncontrolledSingleDropdown
                label="Status Filter"
                aria-label="Status FilterSingle Option Dropdown"
                options={statusOptions}
                emptySelectionStr="All Status"
                value={statusFilter}
                onChange={({ target }) => setStatusFilter(target.value)}
            />
        </>
    );
};

export default TaskTableFilters;
