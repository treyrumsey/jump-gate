import React from "react";
import { Control, Controller } from "react-hook-form";

import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

interface NumberFieldRules {
  min?: number;
  max?: number;
}
interface NumberFieldProps {
  augmented?: string;
  id: string;
  name: string;
  placeholder?: string;
  control: Control;
  rules: NumberFieldRules;
  defaultValue?: number;
  size?: string;
  hasSlider?: boolean;
}

export const NumberField = ({
  augmented,
  id,
  name,
  placeholder,
  control,
  rules,
  defaultValue,
  size,
  hasSlider = false,
  ...props
}: NumberFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? 0}
      render={({ field: { ref, onChange, value } }) => (
        <NumberInput
          id={id}
          {...rules}
          {...props}
          size={size}
          data-augmented-ui={augmented ? "tl-clip border" : undefined}
          className={augmented ? "augmented" : undefined}
          value={value}
          onChange={(_, valueAsNumber) => onChange(valueAsNumber)}
        >
          <NumberInputField
            ref={ref}
            placeholder={placeholder}
            inputMode="numeric"
            type="number"
            border={augmented ? "0" : undefined}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      )}
    />
  );
};
