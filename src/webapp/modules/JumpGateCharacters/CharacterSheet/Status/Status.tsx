import { Checkbox } from "@chakra-ui/react";
import { CustomIconType } from "lib/components/icons/CustomIcon";
import React from "react";
import { useFormContext } from "react-hook-form";
import NumberIcon from "webapp/modules/JumpGateCharacters/CharacterSheet/Status/NumberIcon";
import StatusField, {
  StatusFieldColors,
} from "webapp/modules/JumpGateCharacters/CharacterSheet/Status/StatusField/StatusField";

export const Status = () => {
  const { register } = useFormContext();

  return (
    <div className="jg-Status">
      {/* <StatusField
        color={StatusFieldColors.BadNewsAtZero}
        getIcon={() => CustomIconType.Shield}
        name="Shields"
        statusId="status.shields"
      /> */}
      <NumberIcon
        icon={CustomIconType.Shield}
        label="Shields"
        id="status.shields"
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
        getIcon={(params) =>
          params?.current === 0
            ? CustomIconType.BatteryEmpty
            : CustomIconType.BatteryFull
        }
        color={StatusFieldColors.BadNewsAtZero}
        name="MP"
        statusId="status.mp"
      />
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
