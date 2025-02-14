import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import tasks from "./data/task.json";

type TaskItem = {
    id: number;
    title: string;
    status: "in_progress" | "not_started" | "completed";
    priority: "high" | "none" | "medium" | "low" | "urgent";
};

const App = () => {
    return (
        <>
            <header>
                <Typography
                    variant="h1"
                    sx={{ fontSize: "2rem", fontWeight: "bold" }}
                >
                    Task Management App
                </Typography>
            </header>
            <Button variant="contained">Create Task</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        {["ID", "Title", "Status", "Priority"].map((label) => (
                            <TableCell key={label} aria-label={`${label}-h`}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={800}
                                >
                                    {label}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(tasks as TaskItem[]).map(
                        ({ id, title, status, priority }) => (
                            <TableRow key={id}>
                                <TableCell>{id}</TableCell>
                                <TableCell>{title}</TableCell>
                                <TableCell>{status}</TableCell>
                                <TableCell>{priority}</TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default App;
