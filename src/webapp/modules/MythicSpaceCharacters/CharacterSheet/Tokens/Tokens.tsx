import TokenField from "lib/components/forms/TokenField/TokenField";
import React from "react";
import { usePlayModeContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/PlayModeProvider";

export const Tokens = () => {
  const { isCombatMode } = usePlayModeContext();

  return (
    <div className="msc-Tokens">
      <TokenField positiveName="Accurate" negativeName="Misfire" />
      <TokenField
        positiveName="Dodge"
        negativeName="Off-Guard"
        show={isCombatMode}
      />
      <TokenField positiveName="Empowered" negativeName="Weakened" />
      <TokenField
        positiveName="Fleet"
        negativeName="Immobilized"
        show={isCombatMode}
      />
      <TokenField positiveName="Fortified" negativeName="Vulnerable" />
      <TokenField
        positiveName="Overwatch"
        negativeName="Jammed"
        show={isCombatMode}
      />
      <TokenField
        positiveName="Regen"
        negativeName="Burn"
        show={isCombatMode}
      />
    </div>
  );
};
