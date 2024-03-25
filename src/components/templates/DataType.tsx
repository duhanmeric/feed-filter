import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DATA, type DATATYPE } from "./KeyFilter";

type Props = {
  keyLabel: string;
  name: string;
  updateKeyDataType: (e: DATATYPE, label: string) => void;
  dataType: DATATYPE;
};

const DataType = ({ keyLabel, name, updateKeyDataType, dataType }: Props) => {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={`${keyLabel}-select`}>Data Type</Label>
      <Select
        name={name}
        onValueChange={(e: DATATYPE) => updateKeyDataType(e, keyLabel)}
        value={dataType}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Data Type" />
        </SelectTrigger>
        <SelectContent id={`${keyLabel}-select`}>
          <SelectItem value={DATA.STRING}>String</SelectItem>
          <SelectItem value={DATA.NUMBER}>Number</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DataType;
