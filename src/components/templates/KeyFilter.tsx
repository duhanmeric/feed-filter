"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

type Props = {
  keys: string[];
};

const KeyFilter = ({ keys }: Props) => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  const handleSelectKey = (isChecked: CheckedState, selectedKey: string) => {
    if (!isChecked) {
      setSelectedKeys(selectedKeys.filter((key) => key !== selectedKey));
      return;
    }

    if (!selectedKeys.includes(selectedKey)) {
      setSelectedKeys([...selectedKeys, selectedKey]);
    }
  };

  return (
    <div>
      <h1 className="mb-2">Select your filter</h1>
      <div className="grid grid-cols-4 space-y-2">
        {keys.map((key) => (
          <div key={key} className="flex items-center gap-2">
            <Checkbox
              id={key}
              onCheckedChange={(e) => handleSelectKey(e, key)}
            />
            <Label htmlFor={key}>{key}</Label>
          </div>
        ))}
      </div>

      {selectedKeys.length > 0 && (
        <form className="space-y-4 mt-10">
          {selectedKeys.map((key) => (
            <div
              key={key}
              className="grid grid-cols-2 items-center gap-2 max-w-lg"
            >
              <div>
                <Label htmlFor={key}>{key}</Label>
              </div>
              <Input id={key} placeholder="Enter value" type="text" />
            </div>
          ))}

          <Button type="submit">Apply filter</Button>
        </form>
      )}
    </div>
  );
};

export default KeyFilter;
