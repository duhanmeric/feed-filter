import React from 'react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  keyLabel: string;
}

const CONDITIONS = [
  {
    label: 'Greater than',
    value: 'greater'
  },
  {
    label: 'Greater than or equal to',
    value: 'greaterEqual'
  },
  {
    label: 'Less than',
    value: 'less'
  },
  {
    label: 'Less than or equal to',
    value: 'lessEqual'
  },
  {
    label: 'Equal to',
    value: 'equal'
  },
  {
    label: 'Not equal to',
    value: 'notEqual'
  }
]

const NumberConditions = ({ keyLabel }: Props) => {
  return (
    <div className="mt-4 w-full justify-between flex gap-4">
      <div className="space-y-2 w-full">
        <Label htmlFor={`${keyLabel}-condition`}>Condition</Label>
        <Select
        // onValueChange={(e) => updateKeyCondition(e, key.label)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent id={`${keyLabel}-condition`}>
            {CONDITIONS.map((condition) => (
              <SelectItem key={condition.value} value={condition.value}>{condition.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default NumberConditions