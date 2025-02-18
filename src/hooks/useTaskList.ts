import { useMemo } from "react";
import useTaskStore from "./store/useTaskStore";
import useTaskComputeStore from "./store/useTaskComputeStore";

const useTaskList = () => {
    const tasks = useTaskStore(({ tasks }) => tasks);

    const {
        priorityFilter,
        statusFilter,
        titleFilter,
        sortBy,
        direction,
        page,
        pageSize,
    } = useTaskComputeStore();

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

        const paginatedTasks = (
            direction === "asc" ? sortedAsc : sortedAsc.reverse()
        ).slice(page * pageSize, pageSize * (page + 1));

        return paginatedTasks;
    }, [
        tasks,
        priorityFilter,
        statusFilter,
        titleFilter,
        sortBy,
        direction,
        page,
        pageSize,
    ]);
};

export default useTaskList;
