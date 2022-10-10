import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { NumberField } from "lib/components/forms/NumberField/NumberField";
import React from "react";
import { useFormContext } from "react-hook-form";

interface AttributeFieldProps {
  name: string;
}

export const AttributeField = ({ name }: AttributeFieldProps) => {
  const { register, control } = useFormContext();

  const labelText = name.charAt(0).toUpperCase() + name.substring(1);
  return (
    <Box py={1} className={`msc-AttributeField msc-AttributeField-${name}`}>
      <FormControl className="msc-AttributeField__value">
        <FormLabel htmlFor={`${name}.value`}>{labelText}</FormLabel>
        <NumberField
          id={`${name}.value`}
          name={`${name}.value`}
          rules={{ min: -2, max: 6 }}
          defaultValue={0}
          control={control}
          size="lg"
        />
      </FormControl>
      <FormControl className="msc-AttributeField__xp">
        <FormLabel htmlFor={`${name}.xp`}>XP</FormLabel>
        <NumberField
          id={`${name}.xp`}
          name={`${name}.xp`}
          rules={{ min: 0, max: 10 }}
          defaultValue={0}
          control={control}
          size="xs"
        />
      </FormControl>
    </Box>
  );
};
