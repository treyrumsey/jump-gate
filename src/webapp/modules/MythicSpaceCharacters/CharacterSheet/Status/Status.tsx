import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { NumberField } from "lib/components/forms/NumberField/NumberField";
import React from "react";
import { useFormContext } from "react-hook-form";

export const Status = () => {
  const { register, control } = useFormContext();

  return (
    <Box className="msc-Status">
      <Box className="msc-Status__shields"></Box>
      <span className="msc-Status__shields-label">Shields</span>
      <NumberField
        id="shields.current"
        name="shields.current"
        rules={{ min: 0, max: 8 }}
        defaultValue={8}
        control={control}
        size="lg"
      />
      <FormLabel htmlFor="shields.current">Current</FormLabel>
      <NumberField
        id="shields.max"
        name="shields.max"
        rules={{ min: 4, max: 12 }}
        defaultValue={8}
        control={control}
        size="lg"
      />
      <FormLabel htmlFor="shields.max">Max</FormLabel>
    </Box>
  );
};
