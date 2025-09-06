import React from "react";
import { IMaskInput } from "react-imask";

export const CepMaskInput = React.forwardRef<HTMLInputElement, any>(
  (props, ref) => {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00000-000"
        definitions={{
          "0": /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value: string) => {
          if (onChange) {
            onChange({ target: { name: props.name, value } } as any);
          }
        }}
        overwrite
      />
    );
  }
);
