import { Box } from "@chakra-ui/react";
import WeaponFields from "lib/components/forms/WeaponFields/WeaponFields";
import { LoadoutType } from "models/Loadout.model";
import React from "react";
import { useCharacterSheetViewContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheetViewContext";

const CasualLoadout = () => {
  const { isCombatView } = useCharacterSheetViewContext();

  return (
    <Box
      className="msc-CasualLoadout"
      display={isCombatView ? "none" : "initial"}
    >
      <WeaponFields
        loadoutType={LoadoutType.Casual}
        loadoutIndex={0}
        weaponIndex={0}
      />
    </Box>
  );
};

export default CasualLoadout;
