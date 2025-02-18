import DragHandleIcon from "@mui/icons-material/DragHandle";
import HelpIcon from "@mui/icons-material/Help";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Chip } from "@mui/material";
import React, { useMemo } from "react";
import { Priority } from "../../types/task";
import { ChipColors } from "../../types/utility";

interface PriorityChipProps {
    priority: Priority;
}

const PriorityChip: React.FC<PriorityChipProps> = ({ priority }) => {
    const [icon, label, color] = useMemo(() => {
        const label = priority.charAt(0).toUpperCase() + priority.slice(1);

        switch (priority) {
            case "urgent":
                return [<KeyboardDoubleArrowUpIcon />, label, "error"];
            case "high":
                return [<KeyboardControlKeyIcon />, label, "error"];
            case "medium":
                return [<DragHandleIcon />, label, "warning"];
            case "low":
                return [<KeyboardArrowDownIcon />, label, "primary"];
            default:
                return [<HelpIcon />, label, "default"];
        }
    }, [priority]);

    return <Chip {...{ icon, label, color: color as ChipColors }} />;
};

export default PriorityChip;
