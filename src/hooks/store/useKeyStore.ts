import { create } from "zustand";
import { Key } from "../../types/utility";

interface KeyStore {
    keys: Key[];
    checkKeyExists: (key: string) => boolean;
    setKeys: (newKeys: Key[]) => void;
}

const useKeyStore = create<KeyStore>((set, get) => ({
    keys: [],
    checkKeyExists: (key) => {
        const { keys } = get();
        return keys.findIndex((it) => it.name === key) === -1;
    },

    setKeys: (newKeys) => set(() => ({ keys: newKeys })),
}));

export default useKeyStore;
