"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  keys: string[];
};

type SelectedKey = {
  label: string;
  dataType: "string" | "number";
};

const KeyFilter = ({ keys }: Props) => {
  const [selectedKeys, setSelectedKeys] = React.useState<SelectedKey[]>([]);

  const handleSelectKey = (
    isChecked: CheckedState,
    selectedKey: SelectedKey
  ) => {
    if (!isChecked) {
      setSelectedKeys(
        selectedKeys.filter((key) => key.label !== selectedKey.label)
      );
      return;
    }

    if (!selectedKeys.includes(selectedKey)) {
      setSelectedKeys([...selectedKeys, selectedKey]);
    }
  };

  const updateKeyDataType = (e: string, label: string) => {
    const updatedKeys = selectedKeys.map((key) =>
      key.label === label ? { ...key, dataType: e as "string" | "number" } : key
    );

    setSelectedKeys(updatedKeys);
  };

  return (
    <div>
      <h1 className="mb-2">Select your filter</h1>
      <div className="grid grid-cols-3 space-y-2">
        {keys.map((key) => (
          <div key={key} className="flex items-center gap-2">
            <Checkbox
              id={key}
              onCheckedChange={(e) =>
                handleSelectKey(e, { label: key, dataType: "string" })
              }
            />
            <Label htmlFor={key}>{key}</Label>
          </div>
        ))}
      </div>

      {selectedKeys.length > 0 && (
        <form className="mt-10 space-y-4 max-w-xl mx-auto">
          {selectedKeys.map((key) => (
            <div
              key={key.label}
              className="border border-black rounded-md w-full grid grid-cols-2 gap-2 p-4"
            >
              <div className="space-y-2">
                <Label htmlFor={`${key.label}-select`}>Data Type</Label>
                <Select onValueChange={(e) => updateKeyDataType(e, key.label)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Data Type" />
                  </SelectTrigger>
                  <SelectContent id={`${key.label}-select`}>
                    <SelectItem value="string">String</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={key.label}>{key.label}</Label>
                <Input
                  id={key.label}
                  placeholder={
                    key.dataType === "number" ? "E.g: >= 5000" : "Enter value"
                  }
                  type="text"
                />
              </div>
            </div>
          ))}
          <div className="flex">
            <Button type="submit" className="mt-4 ml-auto">
              Apply filter
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default KeyFilter;
