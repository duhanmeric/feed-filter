"use client"

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import useSelectKey from "@/hooks/useSelectKey";

type Props = {
  keys: string[];
};

const KeysOutput2 = ({ keys }: Props) => {
  const { handleChange, proceedWithAllKeys, proceedWithSpecKeys } =
    useSelectKey();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">
        These are the keys that your XML file has.
      </h1>
      <p className="mb-4">
        Please select the keys you want to use for filtering.
      </p>
      <div className="grid grid-cols-3 gap-y-3 mb-10">
        {keys.map((column: string) => {
          return (
            <div key={column} className="gap-2 flex items-center">
              <Checkbox
                id={column}
                onCheckedChange={(e) => handleChange(e, column)}
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
      <div className="space-x-4">
        <Button onClick={proceedWithAllKeys} variant="outline">
          Select All
        </Button>
        <Button onClick={proceedWithSpecKeys}>Confirm</Button>
      </div>
    </div>
  );
};

export default KeysOutput2;
