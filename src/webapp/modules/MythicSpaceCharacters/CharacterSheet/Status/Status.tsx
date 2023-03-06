import { Box, Flex, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { NumberField } from "lib/components/forms/NumberField/NumberField";
import React from "react";
import { useFormContext } from "react-hook-form";

export const Status = () => {
  const { register, control } = useFormContext();

  return (
    <Box className="msc-Status">
      <FormControl variant="floating" className="msc-Status__shields">
        <NumberField
          id="shields.current"
          name="shields.current"
          rules={{ min: 0, max: 8 }}
          defaultValue={8}
          control={control}
          size="lg"
        />
        <FormLabel htmlFor="shields.current">Shields</FormLabel>
      </FormControl>
      {/* <FormControl variant="floating" className="msc-Status__armor">
        <NumberField
          id="armor.current"
          name="armor.current"
          rules={{ min: 0, max: 4 }}
          defaultValue={4}
          control={control}
          size="lg"
        />
        <FormLabel htmlFor="armor.current">Armor</FormLabel>
      </FormControl> */}
      <FormControl variant="floating" className="msc-Status__stress">
        <NumberField
          id="stress.current"
          name="stress.current"
          rules={{ min: 0, max: 10 }}
          defaultValue={0}
          control={control}
          size="lg"
        />
        <FormLabel htmlFor="stress.current">Stress</FormLabel>
      </FormControl>
      <FormControl variant="floating" className="msc-Status__supplies">
        <NumberField
          id="supplies.current"
          name="supplies.current"
          rules={{ min: 0, max: 5 }}
          defaultValue={5}
          control={control}
          size="lg"
        />
        <FormLabel htmlFor="supplies.current">Supplies</FormLabel>
      </FormControl>
      <FormControl className="msc-Status__shaken">
        <FormLabel htmlFor="shaken" mb="0">
          Shaken
        </FormLabel>
        <Switch id="shaken" {...register(`shaken`)} />
      </FormControl>
      <FormControl className="msc-Status__wounded">
        <FormLabel htmlFor="wounded" mb="0">
          Wounded
        </FormLabel>
        <Switch id="wounded" {...register(`wounded`)} />
      </FormControl>
    </Box>
  );
};
