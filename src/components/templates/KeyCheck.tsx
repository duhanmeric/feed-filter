import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label';
import { CheckedState } from '@radix-ui/react-checkbox';
import { SelectedKey } from './KeyFilter';

type Props = {
  keyLabel: string;
  onCheckedChange: (isChecked: CheckedState, selectedKey: SelectedKey) => void;
}

const KeyCheck = ({ keyLabel, onCheckedChange }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={keyLabel}
        onCheckedChange={(e) => onCheckedChange(e, { label: keyLabel, dataType: "string" })}
      />
      <Label htmlFor={keyLabel}>{keyLabel}</Label>
    </div>
  )
}

const KeyCheckMemo = React.memo(KeyCheck);

export default KeyCheckMemo;