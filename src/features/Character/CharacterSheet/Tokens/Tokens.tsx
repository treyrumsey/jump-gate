import React from "react";
import { useFormContext } from "react-hook-form";

import { Box, Button } from "@chakra-ui/react";

import TokenField from "~/components/forms/TokenField/TokenField";
import UniqueTokenField, {
  TokenType,
} from "~/components/forms/TokenField/UniqueTokenField/UniqueTokenField";
import {
  STUNNED_TOKEN_DESCRIPTION,
  TOKEN_DATA,
} from "~/components/ui/TokenData/TokenData";
import { usePlayModeContext } from "~/context/PlayModeProvider";

export const Tokens = () => {
  const { isCombatMode } = usePlayModeContext();
  const { setValue } = useFormContext();

  return (
    <div className="jg-Tokens">
      {TOKEN_DATA.map((tokenPair) => {
        const positiveDescription =
          tokenPair.positiveNarrativeDescription && !isCombatMode
            ? tokenPair.positiveNarrativeDescription
            : tokenPair.positiveDescription;
        const negativeDescription =
          tokenPair.negativeNarrativeDescription && !isCombatMode
            ? tokenPair.negativeNarrativeDescription
            : tokenPair.negativeDescription;
        const show = tokenPair.showInNarrativeMode || isCombatMode;

        const { positiveName, negativeName, isUncapped } = tokenPair;

        return (
          <TokenField
            key={positiveName + negativeName}
            isUncapped={isUncapped}
            positiveName={positiveName}
            negativeName={negativeName}
            positiveDescription={positiveDescription}
            negativeDescription={negativeDescription}
            show={show}
          />
        );
      })}
      <Box
        display={isCombatMode ? "flex" : "none"}
        justifyContent="center"
        gap="2"
      >
        <Button
          size="sm"
          width={"90px"}
          onClick={() => {
            TOKEN_DATA.forEach((pair) =>
              setValue(`tokens.${pair.positiveName + pair.negativeName}`, 0)
            );
            setValue("tokens.stunned", 0);
          }}
        >
          Clear Tokens
        </Button>
        <UniqueTokenField
          max={3}
          name={"Stunned"}
          show={isCombatMode}
          tokenId={"tokens.stunned"}
          type={TokenType.Negative}
          description={STUNNED_TOKEN_DESCRIPTION}
        />
      </Box>
    </div>
  );
};
