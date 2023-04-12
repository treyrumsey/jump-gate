import { Checkbox } from "@chakra-ui/react";
import { CustomIconType } from "lib/components/icons/CustomIcon";
import React from "react";
import { useFormContext } from "react-hook-form";
import { usePlayModeContext } from "webapp/modules/JumpGateCharacters/CharacterSheet/PlayModeProvider";
import StatusField, {
  StatusFieldColors,
} from "webapp/modules/JumpGateCharacters/CharacterSheet/Status/StatusField/StatusField";

export const Status = () => {
  const { register } = useFormContext();

  const { isCombatMode } = usePlayModeContext();

  return (
    <div className="jg-Status">
      <StatusField
        color={StatusFieldColors.BadNewsAtZero}
        getIcon={() => CustomIconType.Shield}
        name="Shields"
        statusId="status.casual.shields"
        display={isCombatMode ? "none" : undefined}
      />
      <StatusField
        color={StatusFieldColors.BadNewsAtZero}
        getIcon={() => CustomIconType.Shield}
        name="Shields"
        statusId="status.combat.shields"
        display={isCombatMode ? undefined : "none"}
      />
      <StatusField
        color={StatusFieldColors.BadNewsAtZero}
        getIcon={() => CustomIconType.Armor}
        name="Armor"
        statusId="status.casual.armor"
        display={isCombatMode ? "none" : undefined}
      />
      <StatusField
        color={StatusFieldColors.BadNewsAtZero}
        getIcon={() => CustomIconType.Armor}
        name="Armor"
        statusId="status.combat.armor"
        display={isCombatMode ? undefined : "none"}
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
        statusId="status.casual.mp"
        display={isCombatMode ? "none" : undefined}
      />
      <StatusField
        getIcon={(params) =>
          params?.current === 0
            ? CustomIconType.BatteryEmpty
            : CustomIconType.BatteryFull
        }
        color={StatusFieldColors.BadNewsAtZero}
        name="MP"
        statusId="status.combat.mp"
        display={isCombatMode ? undefined : "none"}
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
