import React from "react";
import { IMaskInput } from "react-imask";

export const CPFMaskInput = React.forwardRef<HTMLElement, any>((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000.000.000-00"
      inputRef={ref as React.Ref<HTMLInputElement>}
      onAccept={(value: any) =>
        onChange({ target: { name: props.name, value } })
      }
      overwrite
    />
  );
});
