import React from "react";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type Props = {
    keyLabel: string;
    name: `${number}?condition`;
};

export const NUMBER_CONDITION_VALUES = {
    GREATER_THAN: ">",
    GREATER_THAN_OR_EQUAL: ">=",
    LESS_THAN: "<",
    LESS_THAN_OR_EQUAL: "<=",
    EQUAL_TO: "===",
    NOT_EQUAL_TO: "!==",
} as const;

export type NUMBER_CONDITION_TYPES = typeof NUMBER_CONDITION_VALUES[keyof typeof NUMBER_CONDITION_VALUES]

type NumberCondition = {
    label: string;
    value: NUMBER_CONDITION_TYPES;
};

const CONDITIONS: NumberCondition[] = [
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

const NumberConditions = ({ keyLabel, name }: Props) => {
    return (
        <div className="mt-4 flex w-full justify-between gap-4">
            <div className="w-full space-y-2">
                <Label htmlFor={`${keyLabel}-condition`}>Condition</Label>
                <Select name={name}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent id={`${keyLabel}-condition`}>
                        {CONDITIONS.map((condition) => (
                            <SelectItem
                                key={condition.value}
                                value={condition.value}
                            >
                                {condition.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default NumberConditions;
