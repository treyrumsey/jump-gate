import { Box } from "@chakra-ui/react";
import WeaponFields from "lib/components/forms/WeaponFields/WeaponFields";
import { LoadoutType } from "models/Loadout.model";
import React from "react";
import { useCharacterSheetViewContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheetViewContext";

const CombatLoadout = () => {
  const { isCombatView } = useCharacterSheetViewContext();

  return (
    <Box
      className="msc-CombatLoadout"
      display={isCombatView ? "initial" : "none"}
    >
      <WeaponFields
        loadoutType={LoadoutType.Combat}
        loadoutIndex={1}
        weaponIndex={0}
      />
      <WeaponFields
        loadoutType={LoadoutType.Combat}
        loadoutIndex={1}
        weaponIndex={1}
      />
    </Box>
  );
};

export default CombatLoadout;
