import { Status } from "../types/task";

const statusOrder: Record<Status, number> = {
    completed: 3,
    in_progress: 2,
    not_started: 1,
};

export default statusOrder;
