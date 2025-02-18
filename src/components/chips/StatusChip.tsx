import CheckIcon from "@mui/icons-material/Check";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import PendingIcon from "@mui/icons-material/Pending";
import { Chip } from "@mui/material";
import React, { useMemo } from "react";
import { Status } from "../../types/task";
import { ChipColors } from "../../types/utility";

interface StatusChipProps {
    status: Status;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
    const [icon, label, color] = useMemo(() => {
        const label = status
            .split("_")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ");

        switch (status) {
            case "completed":
                return [<CheckIcon />, label, "success"];
            case "in_progress":
                return [<KeyboardDoubleArrowRightIcon />, label, "primary"];
            default:
                return [<PendingIcon />, label, "warning"];
        }
    }, [status]);

    return <Chip {...{ icon, label, color: color as ChipColors }} />;
};

export default StatusChip;
