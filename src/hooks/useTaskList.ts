import { useMemo } from "react";
import useTaskStore from "./store/useTaskStore";
import useTaskComputeStore from "./store/useTaskComputeStore";
import priorityOrder from "../records/priorityOrder";
import statusOrder from "../records/statusOrder";

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
                titleFilter.length > 0
                    ? task.title
                          .toLowerCase()
                          .includes(titleFilter.toLowerCase())
                    : true;

            return (
                isPassPriorityFilter && isPassStatusFilter && isPassTitleFilter
            );
        });

        const sortedAsc = filteredTasks.sort((a, b) => {
            if (!sortBy) return 0;

            if (sortBy === "priority") {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }

            if (sortBy === "status") {
                return statusOrder[a.status] - statusOrder[b.status];
            }

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
