import React from 'react';
import { IMaskInput } from 'react-imask';

export const PhoneMaskInput = React.forwardRef<HTMLElement, any>((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00) 00000-0000"
      inputRef={ref as React.Ref<HTMLInputElement>}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});