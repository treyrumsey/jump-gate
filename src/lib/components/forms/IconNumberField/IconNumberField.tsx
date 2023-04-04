import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, useNumberInput, Text } from "@chakra-ui/react";
import CustomIcon, {
  CustomIconColor,
  CustomIconType,
} from "lib/components/icons/CustomIcon";
import React, { useEffect } from "react";
import { useController, useFormContext, useWatch } from "react-hook-form";
interface IconNumberFieldProps {
  fieldId: string;
  label: string;
  icon: CustomIconType;
  iconColor?: CustomIconColor;
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
  max,
  defaultValue = max,
}: IconNumberFieldProps) => {
  const { control, getValues, setValue } = useFormContext();
  const { field } = useController({
    name: fieldId,
    control,
    defaultValue: defaultValue,
  });

  const maxWatch = useWatch({ name: maxId, defaultValue: max });
  const maxValue = parseInt(maxWatch);
  const currentWatch = useWatch({ name: fieldId, defaultValue: defaultValue });
  const currentValue = parseInt(currentWatch);

  useEffect(() => {
    if (currentValue > maxValue) setValue(fieldId, maxValue);
  }, [maxValue, currentValue]);

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

  const size = "50px";

  return (
    <div className="jg-IconNumberField">
      <Box className="jg-IconNumberField__group" height={size}>
        <CustomIcon icon={icon} size={size} fill={iconColor} />
        <IconButton
          aria-label={`Subtract 1 from ${fieldId}`}
          icon={<MinusIcon />}
          size="xs"
          {...dec}
          tabIndex={currentValue === 0 ? -1 : 0}
        />
        <Input
          {...input}
          width={size}
          {...field}
          onKeyDown={(event) => event.preventDefault()}
          type="number"
          tabIndex={-1}
          onMouseDown={(event) => event.preventDefault()}
        />
        <IconButton
          aria-label={`Add 1 to ${fieldId}`}
          icon={<AddIcon />}
          size="xs"
          {...inc}
          tabIndex={currentValue === maxValue ? -1 : 0}
          isDisabled={currentValue === maxValue}
        />
      </Box>
      <Text>{label}</Text>
    </div>
  );
};

export default IconNumberField;
