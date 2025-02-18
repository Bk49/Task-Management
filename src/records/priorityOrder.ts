import { Priority } from "../types/task";

const priorityOrder: Record<Priority, number> = {
    urgent: 5,
    high: 4,
    medium: 3,
    low: 2,
    none: 1,
};

export default priorityOrder;
