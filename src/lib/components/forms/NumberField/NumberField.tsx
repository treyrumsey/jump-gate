import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";
import { Control, useController } from "react-hook-form";

interface NumberFieldRules {
  min?: number;
  max?: number;
}
interface NumberFieldProps {
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
  const {
    field: { ref, ...inputProps },
  } = useController({
    name: name || id,
    control,
    rules,
    defaultValue: defaultValue ?? 0,
  });

  return (
    <NumberInput id={id} {...inputProps} {...rules} {...props} size={size}>
      <NumberInputField ref={ref} placeholder={placeholder} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};
