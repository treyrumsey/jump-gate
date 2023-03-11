import { Box, Flex, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import IconNumberField from "lib/components/forms/IconNumberField/IconNumberField";
import { NumberField } from "lib/components/forms/NumberField/NumberField";
import { IconType } from "lib/components/icons/CustomIcon";
import React from "react";
import { useFormContext } from "react-hook-form";

export const Status = () => {
  const { register, control } = useFormContext();

  return (
    <Box className="msc-Status">
      <IconNumberField
        icon={IconType.Shield}
        name="shields"
        max={8}
        size={70}
      />
      <IconNumberField icon={IconType.Armor} name="armor" max={4} size={70} />
      <IconNumberField
        icon={IconType.Stress}
        name="stress"
        defaultValue={0}
        max={10}
        size={70}
        altIcon={IconType.Break}
        altIconDisplayValue={10}
      />
      <IconNumberField
        icon={IconType.BatteryFull}
        name="MP"
        max={4}
        size={70}
        altIcon={IconType.BatteryEmpty}
        altIconDisplayValue={0}
      />
      {/* <FormControl variant="floating" className="msc-Status__stress">
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
      </FormControl> */}
      <FormControl className="msc-Status__shaken">
        <Switch id="shaken" {...register(`shaken`)} />
        <FormLabel htmlFor="shaken" mb="0">
          Shaken
        </FormLabel>
      </FormControl>
      <FormControl className="msc-Status__wounded">
        <Switch id="wounded" {...register(`wounded`)} />
        <FormLabel htmlFor="wounded" mb="0">
          Wounded
        </FormLabel>
      </FormControl>
    </Box>
  );
};
