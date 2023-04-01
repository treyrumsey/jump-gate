import { Checkbox } from "@chakra-ui/react";
import IconNumberField, {
  IconNumberFieldSizes,
} from "lib/components/forms/IconNumberField/IconNumberField";
import {
  CustomIconColor,
  CustomIconType,
} from "lib/components/icons/CustomIcon";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const Status = () => {
  const { register } = useFormContext();

  const maxShields = 8;
  const shields = useWatch({
    name: "status.shields.current",
    defaultValue: 8,
  });

  const maxArmor = 4;
  const armor = useWatch({
    name: "status.armor.current",
    defaultValue: maxArmor,
  });

  const stress = useWatch({
    name: "status.stress.current",
    defaultValue: 0,
  });
  const maxStress = 10;

  const maxMP = 4;
  const mp = useWatch({
    name: "status.mp.current",
    defaultValue: maxMP,
  });

  const maxSupplies = useWatch({ name: "status.supplies.max" });
  const supplies = useWatch({
    name: "status.supplies.current",
    defaultValue: maxSupplies,
  });

  return (
    <div className="msc-Status">
      <div className="msc-Status__shields">
        <IconNumberField
          name="status.shields.current"
          label="Shields"
          icon={CustomIconType.Shield}
          iconColor={
            shields === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          max={maxShields}
          size={IconNumberFieldSizes.Large}
        />
      </div>
      <div className="msc-Status__armor">
        <IconNumberField
          name="status.armor.current"
          label="Armor"
          icon={CustomIconType.Armor}
          iconColor={
            armor === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          max={maxArmor}
          size={IconNumberFieldSizes.Large}
        />
      </div>
      <div className="msc-Status__stress">
        <IconNumberField
          name="status.stress.current"
          label="Stress"
          icon={stress === 10 ? CustomIconType.Break : CustomIconType.Stress}
          iconColor={
            stress === 10 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          defaultValue={0}
          max={maxStress}
          size={IconNumberFieldSizes.Large}
        />
      </div>
      <div className="msc-Status__mp">
        <IconNumberField
          name="status.mp.current"
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
      </div>
      <div className="msc-Status__supplies">
        <IconNumberField
          name="status.supplies.current"
          label="Supplies"
          icon={CustomIconType.CardboardBox}
          iconColor={
            supplies === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          max={maxSupplies}
          size={IconNumberFieldSizes.Large}
        />
      </div>
      <div className="msc-Status__checkboxes">
        <Checkbox size="lg" {...register(`status.shaken`)}>
          Shaken
        </Checkbox>
        <Checkbox size="lg" {...register(`status.wounded`)}>
          Wounded
        </Checkbox>
      </div>
    </div>
  );
};
