import React from "react";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { NUMBER_CONDITIONS } from "@/constants/number";

type Props = {
    keyLabel: string;
    name: `${number}?condition`;
};

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
                        {NUMBER_CONDITIONS.map((condition) => (
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
