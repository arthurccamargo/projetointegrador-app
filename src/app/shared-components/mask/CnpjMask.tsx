import React from "react";
import { IMaskInput } from "react-imask";
import type { CustomProps } from "./interface/CustomProps";


export const CnpjMaskInput = React.forwardRef<HTMLInputElement, CustomProps>(
  function CnpjMaskInput(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00.000.000/0000-00"
        inputRef={ref}
        // Passa o valor mascarado para o form
        onAccept={(value: string) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);
