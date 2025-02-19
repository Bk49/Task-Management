import { Button } from "@mui/material";
import React from "react";
import useHistoryActions from "../../hooks/mutate/useHistoryAction";
import useHistoryStore from "../../hooks/store/useHistoryStore";

interface HistoryActionButtonsProps {}

const HistoryActionButtons: React.FC<HistoryActionButtonsProps> = ({}) => {
    const { undoList, history } = useHistoryStore();
    const applyHistoryAction = useHistoryActions();

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                aria-label="Undo the latest action"
                onClick={() => applyHistoryAction("undo")}
                disabled={history.length === 0}
            >
                Undo Action
            </Button>
            <Button
                variant="contained"
                color="secondary"
                aria-label="Redo the latest action"
                onClick={() => applyHistoryAction("redo")}
                disabled={undoList.length === 0}
            >
                Redo Action
            </Button>
        </>
    );
};

export default HistoryActionButtons;
