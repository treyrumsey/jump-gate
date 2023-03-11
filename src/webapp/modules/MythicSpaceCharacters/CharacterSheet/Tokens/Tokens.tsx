import { Box } from "@chakra-ui/react";
import TokenField from "lib/components/forms/TokenField/TokenField";
import React, { useContext } from "react";
import { CharacterSheetViewContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheetView";

export const Tokens = () => {
  const { isCombatView } = useContext(CharacterSheetViewContext);

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
