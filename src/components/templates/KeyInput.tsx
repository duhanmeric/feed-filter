import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type Props = {
    keyLabel: string;
    placeholder: string;
    name: `${number}?${string}`;
    defaultValue: string;
};

const KeyInput = ({ keyLabel, placeholder, name, defaultValue }: Props) => {
    return (
        <div className="w-full space-y-2">
            <Label htmlFor={keyLabel}>{keyLabel}</Label>
            <Input
                className="w-full"
                id={keyLabel}
                placeholder={placeholder}
                name={name}
                type="text"
                data-testid={`key-input-${keyLabel}`}
                defaultValue={defaultValue}
            />
        </div>
    );
};

export default KeyInput;
