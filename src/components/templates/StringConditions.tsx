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

export const STRING_CONDITION_VALUES = {
    EXACTLY: "exactly",
    INCLUDES: "includes",
} as const;

export type STRING_CONDITION_TYPES = typeof STRING_CONDITION_VALUES[keyof typeof STRING_CONDITION_VALUES]

type StringCondition = {
    label: string;
    value: STRING_CONDITION_TYPES;
};

const CONDITIONS: StringCondition[] = [
    {
        label: "Exactly Matches",
        value: STRING_CONDITION_VALUES.EXACTLY,
    },
    {
        label: "Includes",
        value: STRING_CONDITION_VALUES.INCLUDES,
    }
];

const StringConditions = ({ keyLabel, name }: Props) => {
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

export default StringConditions;
