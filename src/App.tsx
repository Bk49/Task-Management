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
import TaskTableHeader from "./components/table/TaskTableHeader";
import TaskTableRow from "./components/table/TaskTableRow";
import useTaskList from "./hooks/useTaskList";
import { TaskItem } from "./types/task";
import TaskTableFilters from "./components/table/TaskTableFilters";

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
                <Grid2 sx={{ py: 2 }} container direction="row" spacing={2}>
                    {/* TODO: Add custom fields button here */}
                </Grid2>
                <Box sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%", mb: 2 }}>
                        <Toolbar sx={{ justifyContent: "space-between" }}>
                            <Typography
                                variant="h6"
                                fontWeight={500}
                                component="h2"
                            >
                                Task List
                            </Typography>
                            <Grid2 container flexDirection="row" spacing={2} >
                                <TaskTableFilters />
                                {/* For creating new tasks */}
                                <MutateTaskDialog />
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
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </main>
        </>
    );
};

export default App;
