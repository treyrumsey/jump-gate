import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useController } from "react-hook-form";

interface NumberFieldProps {
  id: string;
  name: string;
  placeholder?: string;
  control: any;
  rules: any;
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
    rules: rules,
    defaultValue: defaultValue !== undefined ? defaultValue : 0,
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
