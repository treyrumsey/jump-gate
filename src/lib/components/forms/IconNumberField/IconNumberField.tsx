import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, useNumberInput, Text } from "@chakra-ui/react";
import CustomIcon, {
  CustomIconColor,
  CustomIconType,
} from "lib/components/icons/CustomIcon";
import React from "react";
import { useController, useFormContext, useWatch } from "react-hook-form";

export enum IconNumberFieldSizes {
  Small = "is-small",
  Large = "is-large",
}
interface IconNumberFieldProps {
  fieldId: string;
  label: string;
  icon: CustomIconType;
  iconColor?: CustomIconColor;
  size: IconNumberFieldSizes;
  max: number;
  maxId: string;
  defaultValue?: number;
}

const IconNumberField = ({
  fieldId,
  maxId,
  label,
  icon,
  iconColor = CustomIconColor.Default,
  size,
  max,
  defaultValue = max,
}: IconNumberFieldProps) => {
  const { control } = useFormContext();
  const { field } = useController({
    name: fieldId,
    control,
    defaultValue: defaultValue,
  });

  const maxValue = useWatch({ name: maxId, defaultValue: max });
  const getMax = () => parseInt(maxValue);

  const { getIncrementButtonProps, getDecrementButtonProps, getInputProps } =
    useNumberInput({
      step: 1,
      min: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      max: max,
      precision: 0,
      defaultValue: defaultValue ?? 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange: (_, valueAsNumber) => field.onChange(valueAsNumber as any),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const sizeValue = size === IconNumberFieldSizes.Large ? 50 : 40;
  const sizePx = `${sizeValue}px`;

  return (
    <div className={`jg-IconNumberField ${size}`}>
      <Box className="jg-IconNumberField__group" height={sizePx}>
        <CustomIcon icon={icon} size={sizeValue} fill={iconColor} />
        <IconButton
          aria-label={`Subtract 1 from ${fieldId}`}
          icon={<MinusIcon />}
          size="xs"
          {...dec}
          tabIndex={parseInt(field.value) === 0 ? -1 : 0}
        />
        <Input
          {...input}
          width={sizePx}
          {...field}
          onKeyDown={(event) => event.preventDefault()}
          type="number"
          tabIndex={-1}
          onMouseDown={(event) => event.preventDefault()}
        />
        <IconButton
          aria-label={`Add 1 to ${fieldId}`}
          icon={<AddIcon />}
          size={size === IconNumberFieldSizes.Large ? "xs" : "xs"}
          {...inc}
          tabIndex={field.value === max ? -1 : 0}
        />
      </Box>
      <Text>{label}</Text>
    </div>
  );
};

export default IconNumberField;
