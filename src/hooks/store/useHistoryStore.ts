import { create } from "zustand";
import { History } from "../../types/history";
import { TaskItem } from "../../types/task";

interface HistoryStore {
    history: History[];
    undoList: History[];

    undo: (currentState: TaskItem[]) => History | undefined;
    redo: (currentState: TaskItem[]) => History | undefined;
    addHistory: (newHistory: History) => void;
}

const useHistoryStore = create<HistoryStore>((set, get) => ({
    history: [],
    undoList: [],

    undo: () => {
        const { history, undoList } = get();
        const clonedHistory = [...history];
        const popped = clonedHistory.pop();

        set(() => ({
            history: clonedHistory,
            undoList: popped ? [...undoList, popped] : undoList,
        }));

        return popped;
    },

    redo: () => {
        const { history, undoList } = get();
        const clonedUndoList = [...undoList];
        const popped = clonedUndoList.pop();

        set(() => ({
            history: popped ? [...history, popped] : history,
            undoList: clonedUndoList,
        }));

        return popped;
    },

    addHistory: (newHistory: History) =>
        set(({ history }) => {
            return {
                history: [...history, newHistory],
                undoList: [],
            };
        }),
}));

export default useHistoryStore;
