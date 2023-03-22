import { Box, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import IconNumberField, {
  IconNumberFieldSizes,
} from "lib/components/forms/IconNumberField/IconNumberField";
import { NumberField } from "lib/components/forms/NumberField/NumberField";
import {
  CustomIconColor,
  CustomIconType,
} from "lib/components/icons/CustomIcon";
import React from "react";
import { useFormContext } from "react-hook-form";

export const Status = () => {
  const { getValues, watch, control } = useFormContext();

  const shields = watch("shields.current");
  const maxShields = 8;

  const armor = watch("armor.current");
  const maxArmor = 4;

  const stress = watch("stress.current");
  const maxStress = 10;

  const mp = watch("MP.current");
  const maxMP = 4;

  const supplies = watch("supplies.current");
  const maxSupplies = 10;

  return (
    <Box className="msc-Status">
      <Box className="msc-Status__shields">
        <IconNumberField
          name="shields.current"
          label="Shields"
          icon={CustomIconType.Shield}
          iconColor={
            shields === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          max={maxShields}
          size={IconNumberFieldSizes.Large}
        />
      </Box>
      <Box className="msc-Status__armor">
        <IconNumberField
          name="armor.current"
          label="Armor"
          icon={CustomIconType.Armor}
          iconColor={
            armor === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          max={maxArmor}
          size={IconNumberFieldSizes.Large}
        />
      </Box>
      {/* <Box className="msc-Status__stress">
        <IconNumberField
          name="stress.current"
          label="Stress"
          icon={stress === 10 ? CustomIconType.Break : CustomIconType.Stress}
          iconColor={
            stress === 10 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          defaultValue={0}
          max={maxStress}
          size={IconNumberFieldSizes.Large}
        />
      </Box> */}
      <Box className="msc-Status__MP">
        <IconNumberField
          name="MP.current"
          label="MP"
          icon={
            mp === 0 ? CustomIconType.BatteryEmpty : CustomIconType.BatteryFull
          }
          iconColor={
            mp === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          max={maxMP}
          size={IconNumberFieldSizes.Large}
        />
      </Box>
      <Box className="msc-Status__supplies">
        <IconNumberField
          name="supplies.current"
          label="Supplies"
          icon={CustomIconType.CardboardBox}
          iconColor={
            supplies === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          max={maxSupplies}
          size={IconNumberFieldSizes.Large}
        />
      </Box>

      {/* <FormControl variant="floating" className="msc-Status__stress">
        <NumberField
          id="stress"
          name="stress"
          rules={{ min: 0, max: 10 }}
          defaultValue={0}
          control={control}
          size="lg"
        />
        <FormLabel htmlFor="stress">Stress</FormLabel>
      </FormControl>
      <FormControl variant="floating" className="msc-Status__MP">
        <NumberField
          id="MP"
          name="MP"
          rules={{ min: 0, max: 4 }}
          defaultValue={4}
          control={control}
          size="lg"
        />
        <FormLabel htmlFor="MP">MP</FormLabel>
      </FormControl> */}

      {/* <Box className="msc-Status__shaken">
        <FormControl>
          <Switch id="shaken" {...register(`shaken`)} />
          <FormLabel htmlFor="shaken" mb="0">
            Shaken
          </FormLabel>
        </FormControl>
      </Box>

      <Box className="msc-Status__wounded">
        <FormControl>
          <Switch id="wounded" {...register(`wounded`)} />
          <FormLabel htmlFor="wounded" mb="0">
            Wounded
          </FormLabel>
        </FormControl>
      </Box> */}
    </Box>
  );
};
