import React from 'react';
import { IMaskInput } from 'react-imask';
import type { CustomProps } from './interface/CustomProps';

export const PhoneMaskInput = React.forwardRef<HTMLElement, CustomProps>((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00) 00000-0000"
      inputRef={ref as React.Ref<HTMLInputElement>}
      onAccept={(value: string) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});