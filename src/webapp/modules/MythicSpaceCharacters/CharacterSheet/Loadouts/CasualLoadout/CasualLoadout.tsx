import { Box, Card } from "@chakra-ui/react";
import GearFieldGroup from "lib/components/forms/GearFieldGroup/GearFieldGroup";
import WeaponFieldGroup from "lib/components/forms/WeaponFieldGroup/WeaponFieldGroup";
import { GearType } from "models/Gear.model";
import { LoadoutType } from "models/Loadout.model";
import React from "react";
import { useCharacterSheetViewContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheetViewContext";

const CasualLoadout = () => {
  const { isCombatView } = useCharacterSheetViewContext();

  return (
    <Box
      className="msc-CasualLoadout"
      display={isCombatView ? "none" : undefined}
    >
      <Card>
        <WeaponFieldGroup
          index={0}
          label={"Sidearm"}
          loadoutType={LoadoutType.Casual}
        />
        <GearFieldGroup
          loadoutType={LoadoutType.Casual}
          index={0}
          label={GearType.UtilityItem}
        />
      </Card>
    </Box>
  );
};

export default CasualLoadout;
