import React from 'react'
import { SelectedKey } from './KeyFilter'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  selectedKeys: SelectedKey[];
  updateKeyDataType: (e: string, label: string) => void;
}

const KeyForm = ({ selectedKeys, updateKeyDataType }: Props) => {
  return (
    <>
      {
        selectedKeys.map((key) => (
          <div key={key.label} className="p-4 border border-black rounded-md self-start">
            <div
              className="w-full justify-between flex gap-4"
            >
              <div className="space-y-2 w-full">
                <Label htmlFor={key.label}>{key.label}</Label>
                <Input
                  className="w-full"
                  id={key.label}
                  placeholder={
                    key.dataType === "number" ? "E.g: 5000" : "Enter value"
                  }
                  type="text"
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor={`${key.label}-select`}>Data Type</Label>
                <Select onValueChange={(e) => updateKeyDataType(e, key.label)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Data Type" />
                  </SelectTrigger>
                  <SelectContent id={`${key.label}-select`} defaultValue="string">
                    <SelectItem value="string">String</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {key.dataType === "number" && (
              <div className="mt-4 w-full justify-between flex gap-4">
                {key.dataType === "number" && (
                  <div className="space-y-2 w-full">
                    <Label htmlFor={`${key.label}-condition`}>Condition</Label>
                    <Select
                    // onValueChange={(e) => updateKeyCondition(e, key.label)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent id={`${key.label}-condition`}>
                        <SelectItem value="greater">Greater than (&gt;)</SelectItem>
                        <SelectItem value="greaterEqual">Greater than or equal to (≥)</SelectItem>
                        <SelectItem value="less">Less than (&st;)</SelectItem>
                        <SelectItem value="lessEqual">Less than or equal to (≤)</SelectItem>
                        <SelectItem value="equal">Equal to (=)</SelectItem>
                        <SelectItem value="notEqual">Not equal to (≠)</SelectItem>
                        <SelectItem value="between">Between</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      }
    </>
  )
}

const KeyFormMemo = React.memo(KeyForm);

export default KeyFormMemo;