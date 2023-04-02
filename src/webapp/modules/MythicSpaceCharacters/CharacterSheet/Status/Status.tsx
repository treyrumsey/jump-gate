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
  });

  const maxArmor = 4;
  const armor = useWatch({
    name: "status.armor.current",
  });

  const stress = useWatch({
    name: "status.stress.current",
    defaultValue: 0,
  });
  const maxStress = 10;

  const maxMP = 4;
  const mp = useWatch({
    name: "status.mp.current",
  });

  const maxSupplies = useWatch({ name: "status.supplies.max" });
  const supplies = useWatch({
    name: "status.supplies.current",
  });

  return (
    <div className="msc-Status">
      <div className="msc-Status__shields">
        <IconNumberField
          defaultValue={shields}
          icon={CustomIconType.Shield}
          iconColor={
            shields === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          label="Shields"
          max={maxShields}
          name="status.shields.current"
          size={IconNumberFieldSizes.Large}
        />
      </div>
      <div className="msc-Status__armor">
        <IconNumberField
          defaultValue={armor}
          icon={CustomIconType.Armor}
          iconColor={
            armor === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          label="Armor"
          max={maxArmor}
          name="status.armor.current"
          size={IconNumberFieldSizes.Large}
        />
      </div>
      <div className="msc-Status__stress">
        <IconNumberField
          defaultValue={stress}
          icon={stress === 10 ? CustomIconType.Break : CustomIconType.Stress}
          iconColor={
            stress === 10 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          label="Stress"
          max={maxStress}
          name="status.stress.current"
          size={IconNumberFieldSizes.Large}
        />
      </div>
      <div className="msc-Status__mp">
        <IconNumberField
          defaultValue={mp}
          icon={
            mp === 0 ? CustomIconType.BatteryEmpty : CustomIconType.BatteryFull
          }
          iconColor={
            mp === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          label="MP"
          max={maxMP}
          name="status.mp.current"
          size={IconNumberFieldSizes.Large}
        />
      </div>
      <div className="msc-Status__supplies">
        <IconNumberField
          defaultValue={supplies}
          icon={CustomIconType.CardboardBox}
          iconColor={
            supplies === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          label="Supplies"
          max={maxSupplies}
          name="status.supplies.current"
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
