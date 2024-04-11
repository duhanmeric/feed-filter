import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type Props = {
    keyLabel: string;
    placeholder: string;
    name: `${number}?${string}`;
};

const KeyInput = ({ keyLabel, placeholder, name }: Props) => {
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
            />
        </div>
    );
};

export default KeyInput;
