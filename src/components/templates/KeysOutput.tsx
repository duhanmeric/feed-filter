"use client";

import { useFeedState } from "@/context/FeedContext";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useState } from "react";
import { FeedKey } from "./FileFormURL";
import { CheckedState } from "@radix-ui/react-checkbox";

const KeysOutput = () => {
  const [localKeys, setLocalKeys] = useState<FeedKey>([]);
  const { feedKeys } = useFeedState();

  if (!feedKeys) {
    return <div className="mt-4">Sorry, there is no key.</div>;
  }

  const handleChange = (e: CheckedState, column: string) => {
    if (e) {
      setLocalKeys([...localKeys, column]);
    }
  };

  const proceedWithAllKeys = () => {
    console.log("proceed with all keys");
  };

  const proceedWithSpecKeys = () => {
    if (localKeys.length === 0) {
      alert("Please select at least one key.");
      return;
    }
    console.log("proceed with specific keys");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mt-10 mb-1">
        These are the keys that your XML file has.
      </h1>
      <p className="mb-4">
        Please select the keys you want to use for filtering.
      </p>
      <div className="grid grid-cols-3 mb-10">
        {feedKeys.map((column) => {
          return (
            <div key={column} className="space-x-2">
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

export default KeysOutput;
