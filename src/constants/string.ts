export const STRING_CONDITION_VALUES = {
    EXACTLY: "exactly",
    INCLUDES: "includes",
} as const;

export type STRING_CONDITION_TYPES =
    (typeof STRING_CONDITION_VALUES)[keyof typeof STRING_CONDITION_VALUES];

type StringCondition = {
    label: string;
    value: STRING_CONDITION_TYPES;
};

export const STRING_CONDITIONS: StringCondition[] = [
    {
        label: "Exactly Matches",
        value: STRING_CONDITION_VALUES.EXACTLY,
    },
    {
        label: "Includes",
        value: STRING_CONDITION_VALUES.INCLUDES,
    },
];
