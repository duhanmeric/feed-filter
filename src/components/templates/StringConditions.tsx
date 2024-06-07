import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { STRING_CONDITIONS, type STRING_CONDITION_TYPES } from "@/constants/string";

type Props = {
    keyLabel: string;
    name: `${number}?condition`;
    defaultValue: STRING_CONDITION_TYPES;
};

const StringConditions = ({ keyLabel, name, defaultValue }: Props) => {
    return (
        <div className="mt-4 flex w-full justify-between gap-4">
            <div className="w-full space-y-2">
                <Label htmlFor={name}>Condition</Label>
                <Select name={name} defaultValue={defaultValue}>
                    <SelectTrigger className="w-full" data-testid={`key-scondition-${keyLabel}`}>
                        <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent id={`${keyLabel}-condition`}>
                        {STRING_CONDITIONS.map((condition) => (
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

export default StringConditions;
