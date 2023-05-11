import React from "react";
import { useFormContext } from "react-hook-form";

import { Checkbox } from "@chakra-ui/react";

import { CustomIcons } from "~/components/icons/CustomIcon";
import { usePlayModeContext } from "~/context/PlayModeProvider";
import StatusField, {
  StatusFieldColors,
} from "~/features/Character/CharacterSheet/Status/StatusField/StatusField";

export const Status = () => {
  const { register } = useFormContext();

  const { isCombatMode } = usePlayModeContext();

  return (
    <div className="jg-Status">
      <StatusField
        color={StatusFieldColors.BadNewsAtZero}
        getIcon={() => CustomIcons.Shield}
        name="Shields"
        statusId="status.casual.shields"
        display={isCombatMode ? "none" : undefined}
      />
      <StatusField
        color={StatusFieldColors.BadNewsAtZero}
        getIcon={() => CustomIcons.Shield}
        name="Shields"
        statusId="status.combat.shields"
        display={isCombatMode ? undefined : "none"}
      />
      <StatusField
        color={StatusFieldColors.BadNewsAtZero}
        getIcon={() => CustomIcons.Armor}
        name="Armor"
        statusId="status.casual.armor"
        display={isCombatMode ? "none" : undefined}
      />
      <StatusField
        color={StatusFieldColors.BadNewsAtZero}
        getIcon={() => CustomIcons.Armor}
        name="Armor"
        statusId="status.combat.armor"
        display={isCombatMode ? undefined : "none"}
      />
      <StatusField
        color={StatusFieldColors.BadNewsAtMax}
        getIcon={(params) =>
          params?.current === params?.max
            ? CustomIcons.Break
            : CustomIcons.Stress
        }
        name="Stress"
        statusId="status.stress"
      />
      <StatusField
        getIcon={() => CustomIcons.CardboardBox}
        color={StatusFieldColors.BadNewsAtZero}
        name="Supplies"
        statusId="status.supplies"
      />
      <StatusField
        getIcon={() => CustomIcons.ConcentricCrescents}
        color={StatusFieldColors.BadNewsAtZero}
        name="MP"
        statusId="status.casual.mp"
        display={isCombatMode ? "none" : undefined}
      />
      <StatusField
        getIcon={() => CustomIcons.ConcentricCrescents}
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
