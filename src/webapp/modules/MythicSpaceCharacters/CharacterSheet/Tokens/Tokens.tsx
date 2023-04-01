import { Divider } from "@chakra-ui/react";
import TokenField from "lib/components/forms/TokenField/TokenField";
import UniqueTokenField, {
  TokenType,
} from "lib/components/forms/TokenField/UniqueTokenField/UniqueTokenField";
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
      <Divider />
      <UniqueTokenField
        max={3}
        name={"Stunned"}
        show={isCombatMode}
        tokenId={"tokens.stunned"}
        type={TokenType.Negative}
      />
    </div>
  );
};
