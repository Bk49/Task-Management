import {
    Box,
    Divider,
    Grid2,
    Paper,
    Table,
    TableBody,
    TableContainer,
    Typography,
} from "@mui/material";
import HistoryActionButtons from "./components/button/HistoryActionButtons";
import MutateCustomFieldsDialog from "./components/dialog/MutateCustomFieldsDialog";
import MutateTaskDialog from "./components/dialog/MutateTaskDialog";
import TaskTableHeader from "./components/table/TaskTableHeader";
import TaskTablePagination from "./components/table/TaskTablePagination";
import TaskTableRow from "./components/table/TaskTableRow";
import TaskTableToolbar from "./components/table/TaskTableToolbar";
import useTaskList from "./hooks/useTaskList";
import { TaskItem } from "./types/task";

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
                    <HistoryActionButtons />
                </Grid2>
                <Box sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%", my: 2 }} elevation={5}>
                        <TaskTableToolbar />
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
