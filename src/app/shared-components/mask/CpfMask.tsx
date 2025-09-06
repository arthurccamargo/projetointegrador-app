import React from "react";
import { IMaskInput } from "react-imask";
import type { CustomProps } from "./interface/CustomProps";

export const CPFMaskInput = React.forwardRef<HTMLElement, CustomProps>((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000.000.000-00"
      inputRef={ref as React.Ref<HTMLInputElement>}
      onAccept={(value: string) =>
        onChange({ target: { name: props.name, value } })
      }
      overwrite
    />
  );
});
