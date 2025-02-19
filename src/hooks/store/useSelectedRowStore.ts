import { create } from "zustand";

interface SelectedRowStore {
    selectedIds: Set<number>;

    add: (id: number) => void;
    remove: (id: number) => void;
    clear: () => void;
    bulkAdd: (numbers: number[]) => void;
}

const useSelectedRowStore = create<SelectedRowStore>((set, get) => ({
    selectedIds: new Set<number>(),

    add: (id) =>
        set(({ selectedIds }) => ({
            selectedIds: selectedIds.add(id),
        })),

    remove: (id) =>
        set(({ selectedIds }) => {
            const newSelectedIds = [...selectedIds].filter(
                (selectedId) => selectedId !== id
            );
            return { selectedIds: new Set(newSelectedIds) };
        }),

    clear: () =>
        set(() => ({
            selectedIds: new Set<number>(),
        })),

    bulkAdd: (numbers) => {
        set(() => ({
            selectedIds: new Set<number>([...numbers]),
        }));
        console.log(get().selectedIds);
    },
}));

export default useSelectedRowStore;
