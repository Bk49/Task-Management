import React from "react";
import {
    priorityOptions,
    statusOptions,
} from "../../constants/dropdown-options/taskOptions";
import useTaskStore from "../../hooks/useTaskStore";
import UnControlledSingleDropdown from "../form/UnControlledSingleDropdown";

interface TaskTableFiltersProps {}

const TaskTableFilters: React.FC<TaskTableFiltersProps> = ({}) => {
    const { priorityFilter, statusFilter, setPriorityFilter, setStatusFilter } =
        useTaskStore();

    return (
        <>
            <UnControlledSingleDropdown
                label="Priority Filter"
                aria-label="Priority Filter Single Option Dropdown"
                options={priorityOptions}
                emptySelectionStr="All priority"
                value={priorityFilter}
                onChange={({ target }) => setPriorityFilter(target.value)}
            />
            <UnControlledSingleDropdown
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
