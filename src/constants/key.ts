export const KEY = {
    STRING: "string",
    NUMBER: "number",
} as const;

export type KEY_TYPES = (typeof KEY)[keyof typeof KEY];
