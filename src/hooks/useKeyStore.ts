import { enqueueSnackbar } from "notistack";
import { create } from "zustand";
import { Key } from "../types/utility";

interface KeyStore {
    keys: Key[];
    checkKeyExists: (key: string) => boolean;
    addKey: (newKey: Key) => void;
    updateKey: (updatedKey: Key) => void;
    deleteKey: (keyToDelete: string) => void;
}

const useKeyStore = create<KeyStore>((set, get) => ({
    keys: [],
    checkKeyExists: (key) => {
        const { keys } = get();
        return keys.findIndex((it) => it.key === key) === -1;
    },
    addKey: (newKey) => {
        const { checkKeyExists } = get();

        if (checkKeyExists(newKey.key)) {
            enqueueSnackbar(
                `Key: ${newKey.key}, with type: ${newKey.type}, already exists!`,
                { variant: "error" }
            );
        }

        set(({ keys }) => ({ keys: [...keys, newKey] }));
    },
    updateKey: (updatedKey) => {
        const { checkKeyExists } = get();

        if (!checkKeyExists(updatedKey.key)) {
            enqueueSnackbar(
                `Key: ${updatedKey.key}, with type: ${updatedKey.type}, does not exists!`,
                { variant: "error" }
            );
        }

        set(({ keys }) => ({
            keys: keys.map((it) =>
                it.key === updatedKey.key ? { ...it, ...updatedKey } : it
            ),
        }));
    },
    deleteKey: (keyToDelete) => {
        const { checkKeyExists } = get();

        if (!checkKeyExists(keyToDelete)) {
            enqueueSnackbar(`Key: ${keyToDelete} does not exists!`, {
                variant: "error",
            });
        }
        set(({ keys }) => ({
            keys: keys.filter((it) => it.key === keyToDelete),
        }));
    },
}));

export default useKeyStore;
