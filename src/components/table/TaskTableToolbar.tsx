import { Toolbar, Typography, Grid2 } from "@mui/material";
import React from "react";
import TaskTableFilters from "./TaskTableFilters";
import useSelectedRowStore from "../../hooks/store/useSelectedRowStore";
import TaskTableBulkActions from "./TaskTableBulkActions";

interface TaskTableToolbarProps {}

const TaskTableToolbar: React.FC<TaskTableToolbarProps> = ({}) => {
    const { selectedIds } = useSelectedRowStore();

    return (
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            {selectedIds.size > 0 ? (
                <>
                    <Typography variant="subtitle1">
                        {selectedIds.size} items selected
                    </Typography>
                    <Grid2 container flexDirection="row" spacing={2}>
                        <TaskTableBulkActions />
                    </Grid2>
                </>
            ) : (
                <>
                    <Typography variant="h6" fontWeight={500} component="h2">
                        Task List
                    </Typography>
                    <Grid2 container flexDirection="row" spacing={2}>
                        <TaskTableFilters />
                    </Grid2>
                </>
            )}
        </Toolbar>
    );
};

export default TaskTableToolbar;
