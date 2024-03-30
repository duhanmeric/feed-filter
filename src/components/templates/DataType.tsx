import React from "react";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { KEY, type KEY_TYPES } from "@/constants/key";

type Props = {
    keyLabel: string;
    name: `${number}?dataType`;
    updateKeyDataType: (e: KEY_TYPES, label: string) => void;
    dataType: KEY_TYPES;
};
const DataType = ({ keyLabel, name, updateKeyDataType, dataType }: Props) => {
    return (
        <div className="w-full space-y-2">
            <Label htmlFor={`${keyLabel}-select`}>Data Type</Label>
            <Select
                name={name}
                onValueChange={(e: KEY_TYPES) => updateKeyDataType(e, keyLabel)}
                value={dataType}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Data Type" />
                </SelectTrigger>
                <SelectContent id={`${keyLabel}-select`}>
                    <SelectItem value={KEY.STRING}>String</SelectItem>
                    <SelectItem value={KEY.NUMBER}>Number</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default DataType;
