import { Box, Card } from "@chakra-ui/react";
import GearFieldGroup from "lib/components/forms/GearFieldGroup/GearFieldGroup";
import WeaponFieldGroup from "lib/components/forms/WeaponFieldGroup/WeaponFieldGroup";
import { LoadoutType } from "models/Loadout.model";
import React from "react";
import { useCharacterSheetViewContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheetViewContext";

const CombatLoadout = () => {
  const { isCombatView } = useCharacterSheetViewContext();

  return (
    <Box
      className={"msc-CombatLoadout"}
      display={isCombatView ? undefined : "none"}
    >
      <Card>
        <WeaponFieldGroup
          label="Primary Weapon"
          index={0}
          loadoutType={LoadoutType.Combat}
        />
        <WeaponFieldGroup
          label="Secondary Weapon"
          index={1}
          loadoutType={LoadoutType.Combat}
        />
        <GearFieldGroup
          index={0}
          label="Gear Slot 1"
          loadoutType={LoadoutType.Combat}
        />
        <GearFieldGroup
          index={1}
          label="Gear Slot 2"
          loadoutType={LoadoutType.Combat}
        />
      </Card>
    </Box>
  );
};

export default CombatLoadout;
