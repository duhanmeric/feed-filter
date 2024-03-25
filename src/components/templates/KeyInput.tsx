import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

type Props = {
  keyLabel: string;
  placeholder: string;
  name: `${number}?${string}`
}

const KeyInput = ({ keyLabel, placeholder, name }: Props) => {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={keyLabel}>{keyLabel}</Label>
      <Input
        className="w-full"
        id={keyLabel}
        placeholder={placeholder}
        name={name}
        type="text"
      />
    </div>
  )
}

export default KeyInput