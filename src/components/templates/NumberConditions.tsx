import React from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { NUMBER_CONDITIONS } from "@/constants/number";

type Props = {
    keyLabel: string;
    name: `${number}?condition`;
    defaultValue: string;
};

const NumberConditions = ({ keyLabel, name, defaultValue }: Props) => {
    return (
        <div className="mt-4 flex w-full justify-between gap-4">
            <div className="w-full space-y-2">
                <Label htmlFor={name}>Condition</Label>
                <Select name={name} defaultValue={defaultValue}>
                    <SelectTrigger className="w-full" data-testid={`key-ncondition-${keyLabel}`}>
                        <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent id={`${keyLabel}-condition`}>
                        {NUMBER_CONDITIONS.map((condition) => (
                            <SelectItem key={condition.value} value={condition.value}>
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
