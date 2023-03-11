import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, useNumberInput, Text } from "@chakra-ui/react";
import CustomIcon, { IconType } from "lib/components/icons/CustomIcon";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

interface IconNumberFieldProps {
  name: string;
  max: number;
  icon: IconType;
  size: number;
  defaultValue?: number;
  altIcon?: IconType;
  altIconDisplayValue?: number;
}

const IconNumberField = ({
  name,
  max,
  icon,
  size,
  defaultValue = max,
  altIcon,
  altIconDisplayValue = 0,
}: IconNumberFieldProps) => {
  const { control } = useFormContext();
  const { field } = useController({
    name: `${name}.current`,
    control,
    defaultValue: defaultValue,
  });
  const { getIncrementButtonProps, getDecrementButtonProps, getInputProps } =
    useNumberInput({
      step: 1,
      min: 0,
      max: max,
      precision: 0,
      defaultValue: defaultValue ?? 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange: (_, valueAsNumber) => field.onChange(valueAsNumber as any),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const sizePx = `${size}px`;

  const displayIcon =
    altIcon && altIconDisplayValue === field.value ? altIcon : icon;

  return (
    <div className="msc-IconNumberField">
      <Box className="msc-IconNumberField__group" height={sizePx}>
        <CustomIcon icon={displayIcon} size={size} />
        <IconButton
          aria-label={`Subtract 1 from ${name}`}
          icon={<MinusIcon />}
          size="sm"
          {...dec}
        />
        <Input {...input} width={sizePx} {...field} />
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
