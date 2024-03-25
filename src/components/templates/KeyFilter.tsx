"use client";

import React, { useCallback } from "react";
import { Button } from "../ui/button";
import { CheckedState } from "@radix-ui/react-checkbox";
import KeyForm from "./KeyForm";
import KeyCheck from "./KeyCheck";

type Props = {
  keys: string[];
};

export type SelectedKey = {
  label: string;
  dataType: "string" | "number";
};

const KeyFilter = ({ keys }: Props) => {
  const [selectedKeys, setSelectedKeys] = React.useState<SelectedKey[]>([]);

  const handleSelectKey = useCallback(
    (isChecked: CheckedState, selectedKey: SelectedKey) => {
      setSelectedKeys((prevSelectedKeys) =>
        isChecked
          ? [...prevSelectedKeys, selectedKey]
          : prevSelectedKeys.filter((key) => key.label !== selectedKey.label)
      );
    },
    []
  );

  const updateKeyDataType = useCallback(
    (e: string, label: string) => {
      setSelectedKeys((prevSelectedKeys) =>
        prevSelectedKeys.map((key) =>
          key.label === label ? { ...key, dataType: e as "string" | "number" } : key
        )
      );
    },
    []
  );

  return (
    <div>
      <h1 className="mb-2">Select your filter</h1>
      <div className="grid grid-cols-3 space-y-2">
        {keys.map((key) => (
          <KeyCheck key={key} keyLabel={key} onCheckedChange={handleSelectKey} />
        ))}
      </div>

      {selectedKeys.length > 0 && (
        <form className="mt-10 space-y-4">
          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4">
            <KeyForm selectedKeys={selectedKeys} updateKeyDataType={updateKeyDataType} />
          </div>
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
