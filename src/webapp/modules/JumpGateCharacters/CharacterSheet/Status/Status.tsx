import { Checkbox } from "@chakra-ui/react";
import IconNumberField, {
  IconNumberFieldSizes,
} from "lib/components/forms/IconNumberField/IconNumberField";
import {
  CustomIconColor,
  CustomIconType,
} from "lib/components/icons/CustomIcon";
import React from "react";
import { useFormContext } from "react-hook-form";
import StatusField, {
  StatusFieldColors,
} from "webapp/modules/JumpGateCharacters/CharacterSheet/Status/StatusField/StatusField";

export const Status = () => {
  const { register } = useFormContext();

  return (
    <div className="jg-Status">
      {/* <div className="jg-Status__shields">
        <IconNumberField
          defaultValue={shields}
          icon={CustomIconType.Shield}
          iconColor={
            shields === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          label="Shields"
          max={maxShields}
          fieldId="status.shields.current"
          size={IconNumberFieldSizes.Large}
        />
      </div> */}
      <StatusField
        color={StatusFieldColors.BadNewsAtZero}
        getIcon={() => CustomIconType.Shield}
        name="Shields"
        statusId="status.shields"
      />
      <StatusField
        color={StatusFieldColors.BadNewsAtZero}
        getIcon={() => CustomIconType.Armor}
        name="Armor"
        statusId="status.armor"
      />
      <StatusField
        color={StatusFieldColors.BadNewsAtMax}
        getIcon={(params) =>
          params?.current === params?.max
            ? CustomIconType.Break
            : CustomIconType.Stress
        }
        name="Stress"
        statusId="status.stress"
      />
      <StatusField
        getIcon={() => CustomIconType.CardboardBox}
        color={StatusFieldColors.BadNewsAtZero}
        name="Supplies"
        statusId="status.supplies"
      />
      <StatusField
        getIcon={() => CustomIconType.BatteryFull}
        color={StatusFieldColors.BadNewsAtZero}
        name="Armor"
        statusId="status.armor"
      />
      {/* <div className="jg-Status__armor">
        <IconNumberField
          defaultValue={armor}
          icon={CustomIconType.Armor}
          iconColor={
            armor === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          label="Armor"
          max={maxArmor}
          maxId={"status.armor.max"}
          fieldId="status.armor.current"
          size={IconNumberFieldSizes.Large}
        />
      </div>
      <div className="jg-Status__stress">
        <IconNumberField
          defaultValue={stress}
          icon={stress === 10 ? CustomIconType.Break : CustomIconType.Stress}
          iconColor={
            stress === 10 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          label="Stress"
          max={}
          maxId={"status.stress.max"}
          fieldId="status.stress.current"
          size={IconNumberFieldSizes.Large}
        />
      </div>
      <div className="jg-Status__mp">
        <IconNumberField
          defaultValue={mp}
          fieldId="status.mp.current"
          icon={
            mp === 0 ? CustomIconType.BatteryEmpty : CustomIconType.BatteryFull
          }
          iconColor={
            mp === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          label="MP"
          max={maxMP}
          maxId={"status.mp.max"}
          size={IconNumberFieldSizes.Large}
        />
      </div>
      <div className="jg-Status__supplies">
        <IconNumberField
          defaultValue={supplies}
          icon={CustomIconType.CardboardBox}
          iconColor={
            supplies === 0 ? CustomIconColor.BadNews : CustomIconColor.Default
          }
          label="Supplies"
          max={maxSupplies}
          maxId={"status.supplies.max"}
          fieldId="status.supplies.current"
          size={IconNumberFieldSizes.Large}
        />
      </div> */}
      <div className="jg-Status__checkboxes">
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
