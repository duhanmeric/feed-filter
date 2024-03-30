export const NUMBER_CONDITION_VALUES = {
    GREATER_THAN: ">",
    GREATER_THAN_OR_EQUAL: ">=",
    LESS_THAN: "<",
    LESS_THAN_OR_EQUAL: "<=",
    EQUAL_TO: "===",
    NOT_EQUAL_TO: "!==",
} as const;

export type NUMBER_CONDITION_TYPES =
    (typeof NUMBER_CONDITION_VALUES)[keyof typeof NUMBER_CONDITION_VALUES];

type NumberCondition = {
    label: string;
    value: NUMBER_CONDITION_TYPES;
};

export const NUMBER_CONDITIONS: NumberCondition[] = [
    {
        label: "Greater than",
        value: ">",
    },
    {
        label: "Greater than or equal to",
        value: ">=",
    },
    {
        label: "Less than",
        value: "<",
    },
    {
        label: "Less than or equal to",
        value: "<=",
    },
    {
        label: "Equal to",
        value: "===",
    },
    {
        label: "Not equal to",
        value: "!==",
    },
];
