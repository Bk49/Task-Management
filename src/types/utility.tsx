export type Sort = "asc" | "desc";
export type KeyTypes = "boolean" | "string" | "number";
export type Key = {
    name: string;
    type: KeyTypes;
};

export type ChipColors =
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
