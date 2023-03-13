import { Box } from "@chakra-ui/react";
import TokenField from "lib/components/forms/TokenField/TokenField";
import React from "react";
import { useCharacterSheetViewContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheetViewContext";

export const Tokens = () => {
  const { isCombatView } = useCharacterSheetViewContext();

  return (
    <Box className="msc-Tokens">
      <TokenField positiveName="Accurate" negativeName="Misfire" />
      <TokenField
        positiveName="Dodge"
        negativeName="Off-Guard"
        show={isCombatView}
      />
      <TokenField positiveName="Empowered" negativeName="Weakened" />
      <TokenField
        positiveName="Fleet"
        negativeName="Immobilized"
        show={isCombatView}
      />
      <TokenField positiveName="Fortified" negativeName="Vulnerable" />
      <TokenField
        positiveName="Overwatch"
        negativeName="Jammed"
        show={isCombatView}
      />
      <TokenField
        positiveName="Regen"
        negativeName="Burn"
        show={isCombatView}
      />
    </Box>
  );
};
