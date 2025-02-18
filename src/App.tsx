import {
    Box,
    Divider,
    Grid2,
    Paper,
    Table,
    TableBody,
    TableContainer,
    Toolbar,
    Typography,
} from "@mui/material";
import MutateTaskDialog from "./components/dialog/MutateTaskDialog";
import TaskTableFilters from "./components/table/TaskTableFilters";
import TaskTableHeader from "./components/table/TaskTableHeader";
import TaskTablePagination from "./components/table/TaskTablePagination";
import TaskTableRow from "./components/table/TaskTableRow";
import useTaskList from "./hooks/useTaskList";
import { TaskItem } from "./types/task";
import MutateCustomFieldsDialog from "./components/dialog/MutateCustomFieldsDialog";

const App = () => {
    const tasks = useTaskList();

    return (
        <>
            <header>
                <Typography
                    component="h1"
                    sx={{ fontSize: "2rem", fontWeight: "bold" }}
                >
                    Task Management App
                </Typography>
            </header>
            <main>
                <Grid2 container direction="row" spacing={2}>
                    <MutateTaskDialog />
                    <MutateCustomFieldsDialog />
                </Grid2>
                <Box sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%", my: 2 }} elevation={5}>
                        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
                            <Typography
                                variant="h6"
                                fontWeight={500}
                                component="h2"
                            >
                                Task List
                            </Typography>
                            <Grid2 container flexDirection="row" spacing={2}>
                                <TaskTableFilters />
                            </Grid2>
                        </Toolbar>
                        <Divider />
                        <TableContainer>
                            <Table>
                                <TaskTableHeader />
                                <TableBody>
                                    {((tasks as TaskItem[]) ?? []).map(
                                        (task) => (
                                            <TaskTableRow
                                                key={task.id}
                                                task={task}
                                            />
                                        )
                                    )}
                                </TableBody>
                                <TaskTablePagination />
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </main>
        </>
    );
};

export default App;
