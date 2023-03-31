import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { NumberField } from "lib/components/forms/NumberField/NumberField";
import { AttributeName } from "models/Attribute.model";
import React from "react";
import { useFormContext } from "react-hook-form";

interface AttributeFieldProps {
  name: AttributeName;
}

export const AttributeField = ({ name }: AttributeFieldProps) => {
  const { control } = useFormContext();

  const fieldId = `attributes.${name}`;

  return (
    <Box py={1} className={`msc-AttributeField msc-AttributeField-${name}`}>
      <FormControl className="msc-AttributeField__value">
        <FormLabel htmlFor={`${fieldId}.value`}>{name}</FormLabel>
        <NumberField
          id={`${fieldId}.value`}
          name={`${fieldId}.value`}
          rules={{ min: -2, max: 8 }}
          defaultValue={0}
          control={control}
          size="lg"
        />
      </FormControl>
      <FormControl className="msc-AttributeField__xp">
        <FormLabel htmlFor={`${fieldId}.xp`}>XP</FormLabel>
        <NumberField
          id={`${fieldId}.xp`}
          name={`${fieldId}.xp`}
          rules={{ min: 0, max: 10 }}
          defaultValue={0}
          control={control}
          size="xs"
        />
      </FormControl>
    </Box>
  );
};
