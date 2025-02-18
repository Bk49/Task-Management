import React from "react";
import {
    priorityOptions,
    statusOptions,
} from "../../constants/dropdown-options/taskOptions";
import useTaskComputeStore from "../../hooks/store/useTaskComputeStore";
import UncontrolledSingleDropdown from "../form/mui-wrapper/UncontrolledSingleDropdown";

interface TaskTableFiltersProps {}

const TaskTableFilters: React.FC<TaskTableFiltersProps> = ({}) => {
    const { priorityFilter, statusFilter, setPriorityFilter, setStatusFilter } =
        useTaskComputeStore();

    return (
        <>
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
