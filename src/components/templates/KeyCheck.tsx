import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { CheckedState } from "@radix-ui/react-checkbox";
import type { SelectedKey } from "./KeyFilter";

type Props = {
    keyLabel: string;
    onCheckedChange: (isChecked: CheckedState, selectedKey: SelectedKey) => void;
    isChecked: boolean;
};

const KeyCheck = ({ keyLabel, onCheckedChange, isChecked }: Props) => {
    return (
        <div className="flex items-center gap-2">
            <Checkbox
                id={keyLabel}
                checked={isChecked}
                aria-label={`key-check-${keyLabel}`}
                data-testid="key-check"
                onCheckedChange={(e) =>
                    onCheckedChange(e, {
                        label: keyLabel,
                        dataType: "string",
                        value: "",
                    })
                }
            />
            <Label htmlFor={keyLabel} className="break-all leading-tight">
                {keyLabel}
            </Label>
        </div>
    );
};

const KeyCheckMemo = React.memo(KeyCheck);

export default KeyCheckMemo;
