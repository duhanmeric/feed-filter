"use client";

import React, { useCallback } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import KeyCheck from "./KeyCheck";
import { submitFilters } from "@/actions/file";
import { useToast } from "../ui/use-toast";
import KeyInput from "./KeyInput";
import NumberConditions from "./NumberConditions";
import DataType from "./DataType";
import SubmitButton from "./SubmitButton";

type Props = {
    keys: string[];
    fileName: string;
};

export const DATA = {
    STRING: "string",
    NUMBER: "number",
} as const;

export type DATATYPE = (typeof DATA)[keyof typeof DATA];

export type SelectedKey = {
    label: string;
    dataType: DATATYPE;
};

const KeyFilter = ({ fileName, keys }: Props) => {
    const { toast } = useToast();
    const [selectedKeys, setSelectedKeys] = React.useState<SelectedKey[]>([]);

    const handleSelectKey = useCallback(
        (isChecked: CheckedState, selectedKey: SelectedKey) => {
            setSelectedKeys((prevSelectedKeys) =>
                isChecked
                    ? [...prevSelectedKeys, selectedKey]
                    : prevSelectedKeys.filter(
                        (key) => key.label !== selectedKey.label,
                    ),
            );
        },
        [],
    );

    const updateKeyDataType = useCallback((e: DATATYPE, label: string) => {
        setSelectedKeys((prevSelectedKeys) =>
            prevSelectedKeys.map((key) =>
                key.label === label ? { ...key, dataType: e } : key,
            ),
        );
    }, []);

    const clientAction = async (formData: FormData) => {
        const result = await submitFilters(fileName, formData);

        if (result?.message) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: result.message,
            });
        } else {
            toast({
                title: "Success!",
                description:
                    "Please take a seat while we are processing your file.",
            });
        }
    };

    return (
        <div>
            <h1 className="mb-2">Select your filter</h1>
            <div className="grid grid-cols-3 space-y-2">
                {keys.map((key) => (
                    <KeyCheck
                        key={key}
                        keyLabel={key}
                        onCheckedChange={handleSelectKey}
                    />
                ))}
            </div>

            {selectedKeys.length > 0 && (
                <form className="mt-10 space-y-4" action={clientAction}>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {selectedKeys.map((key, index) => (
                            <div
                                key={key.label}
                                className="self-start rounded-md border border-black p-4"
                            >
                                <div className="flex w-full justify-between gap-4">
                                    <KeyInput
                                        name={`${index}?${key.label}`}
                                        keyLabel={key.label}
                                        placeholder={
                                            key.dataType === DATA.NUMBER
                                                ? "E.g: 5000"
                                                : "Enter value"
                                        }
                                    />
                                    <DataType
                                        name={`${index}?dataType`}
                                        dataType={key.dataType}
                                        keyLabel={key.label}
                                        updateKeyDataType={updateKeyDataType}
                                    />
                                </div>
                                {key.dataType === DATA.NUMBER && (
                                    <NumberConditions
                                        keyLabel={key.label}
                                        name={`${index}?condition`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="ml-auto max-w-32">
                        <SubmitButton title="Apply filter" />
                    </div>
                </form>
            )}
        </div>
    );
};

export default KeyFilter;