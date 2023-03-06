import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  useNumberInput,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IconNumberFieldProps {
  name: string;
  max: number;
  icon: React.ReactNode;
  size: number;
}

const IconNumberField = ({ name, max, icon, size }: IconNumberFieldProps) => {
  const { register, control } = useFormContext();
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      min: 0,
      max: max,
      precision: 0,
      defaultValue: max ?? 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const sizePx = `${size}px`;

  return (
    <div className="msc-IconNumberField">
      <Box className="msc-IconNumberField__group" height={sizePx}>
        {icon}
        <IconButton
          aria-label={`Subtract 1 from ${name}`}
          icon={<MinusIcon />}
          size="sm"
          {...dec}
        />
        <Input id={name} {...input} width={sizePx} {...register(name)} />
        <IconButton
          aria-label={`Add 1 to ${name}`}
          icon={<AddIcon />}
          size="sm"
          {...inc}
        />
      </Box>
      <Text>{name}</Text>
    </div>
  );
};

export default IconNumberField;
