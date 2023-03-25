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
  const { control } = useFormContext();

  const maxShields = 8;
  const shields = useWatch({
    control,
    name: "shields.current",
    defaultValue: 8,
  });

  const maxArmor = 4;
  const armor = useWatch({
    control,
    name: "armor.current",
    defaultValue: maxArmor,
  });

  // const stress = useWatch({ control, name: "stress.current", defaultValue: 0 });
  // const maxStress = 10;

  const maxMP = 4;
  const mp = useWatch({ control, name: "mp.current", defaultValue: maxMP });

  const maxSupplies = 10;
  const supplies = useWatch({
    control,
    name: "supplies.current",
    defaultValue: maxSupplies,
  });

  return (
    <div className="msc-Status">
      <div className="msc-Status__shields">
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
      </div>
      <div className="msc-Status__armor">
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
      </div>
      {/* <div className="msc-Status__stress">
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
      </div> */}
      <div className="msc-Status__mp">
        <IconNumberField
          name="mp.current"
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
          name="supplies.current"
          label="Supplies"
          icon={CustomIconType.CardboardBox}
          iconColor={
            supplies === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          max={maxSupplies}
          size={IconNumberFieldSizes.Large}
        />
      </div>
    </div>
  );
};
