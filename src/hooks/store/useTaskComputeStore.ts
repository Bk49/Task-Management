import { create } from "zustand";
import { TaskItem, Priority, Status } from "../../types/task";
import { Sort } from "../../types/utility";

// TODO: Include filtering by title
interface TaskComputeStore {
    sortBy: keyof TaskItem;
    direction: Sort;
    priorityFilter?: Priority;
    statusFilter?: Status;
    titleFilter: string;
    page: number;
    pageSize: number;

    setSort: (label: string) => void;
    setPriorityFilter: (priority: Priority) => void;
    setStatusFilter: (status: Status) => void;
    setTitleFilter: (title: string) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
}

const useTaskComputeStore = create<TaskComputeStore>((set) => ({
    sortBy: "id",
    direction: "asc",
    priorityFilter: undefined,
    statusFilter: undefined,
    titleFilter: "",
    page: 0,
    pageSize: 10,

    setSort: (label) =>
        set(({ direction, sortBy }) =>
            sortBy === label
                ? { direction: direction === "asc" ? "desc" : "asc" }
                : { sortBy: label }
        ),
    setPriorityFilter: (priority) => set(() => ({ priorityFilter: priority })),
    setStatusFilter: (status) => set(() => ({ statusFilter: status })),
    setTitleFilter: (title) => set(() => ({ titleFilter: title })),
    setPage: (page) => set(() => ({ page })),
    setPageSize: (pageSize) => set(() => ({ pageSize })),
}));

export default useTaskComputeStore;
