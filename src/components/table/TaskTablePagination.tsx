import { TableFooter, TablePagination, TableRow } from "@mui/material";
import React from "react";
import useTaskStore from "../../hooks/store/useTaskStore";
import useTaskComputeStore from "../../hooks/store/useTaskComputeStore";

interface TaskTablePaginationProps {}

const TaskTablePagination: React.FC<TaskTablePaginationProps> = ({}) => {
    const tasks = useTaskStore(({ tasks }) => tasks);
    const { page, setPage, pageSize, setPageSize } = useTaskComputeStore();

    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    aria-label="Task Table Pagination Form"
                    count={tasks.length}
                    rowsPerPage={pageSize}
                    page={page}
                    onPageChange={(_, pageTo) => setPage(pageTo)}
                    onRowsPerPageChange={({ target }) => {
                        setPage(0);
                        setPageSize(parseInt(target.value, 10));
                    }}
                />
            </TableRow>
        </TableFooter>
    );
};

export default TaskTablePagination;
