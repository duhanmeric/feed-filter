import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  keys: string[];
};

const KeysOutput2 = ({ keys }: Props) => {
  return (
    <div className="grid grid-cols-3 mb-10">
      {keys.map((column: string) => {
        return (
          <div key={column} className="space-x-2">
            <Checkbox
              id={column}
              // onCheckedChange={(e) => handleChange(e, column)}
            />
            <label
              htmlFor={column}
              className="capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {column}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default KeysOutput2;
