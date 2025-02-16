import { useMemo } from "react";
import useTaskStore from "./useTaskStore";

const useTaskList = () => {
    const {
        tasks,
        priorityFilter,
        statusFilter,
        titleFilter,
        sortBy,
        direction,
    } = useTaskStore();

    return useMemo(() => {
        const filteredTasks = tasks.filter((task) => {
            const isPassPriorityFilter = priorityFilter
                ? task.priority === priorityFilter
                : true;
            const isPassStatusFilter = statusFilter
                ? task.status === statusFilter
                : true;
            const isPassTitleFilter =
                titleFilter.length > 0 ? task.title === titleFilter : true;

            return (
                isPassPriorityFilter && isPassStatusFilter && isPassTitleFilter
            );
        });

        const sortedAsc = filteredTasks.sort((a, b) => {
            if (!sortBy) return 0;

            return a[sortBy] < b[sortBy] ? -1 : a[sortBy] === b[sortBy] ? 0 : 1;
        });

        return direction === "asc" ? sortedAsc : sortedAsc.reverse();

    }, [
        tasks,
        priorityFilter,
        statusFilter,
        titleFilter,
        sortBy,
        direction,
    ]);
};

export default useTaskList;
