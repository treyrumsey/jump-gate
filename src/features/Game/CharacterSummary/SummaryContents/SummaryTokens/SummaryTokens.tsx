import React from "react";

import { Box } from "@chakra-ui/react";

import {
  STUNNED_TOKEN_DESCRIPTION,
  TOKEN_DATA,
} from "~/components/ui/TokenData/TokenData";
import { usePlayModeContext } from "~/context/PlayModeProvider";
import SummaryTokenButton from "~/features/Game/CharacterSummary/SummaryContents/SummaryTokens/SummaryTokenGroup/SummaryTokenButton";
import { SummaryTokenChips } from "~/features/Game/CharacterSummary/SummaryContents/SummaryTokens/SummaryTokenGroup/SummaryTokenChips";
import { SummaryTokenGroup } from "~/features/Game/CharacterSummary/SummaryContents/SummaryTokens/SummaryTokenGroup/SummaryTokenGroup";
import { TokensModel } from "~/models/Character.model";

type CharacterSummaryTokensProps = {
  tokens: TokensModel;
};

const CharacterSummaryTokens = ({ tokens }: CharacterSummaryTokensProps) => {
  const { isCombatMode } = usePlayModeContext();

  return (
    <Box className="jg-SummaryTokens jg-Tokens">
      {TOKEN_DATA.map((tokenPair) => ({
        ...tokenPair,
        value:
          tokens[
            (tokenPair.positiveName +
              tokenPair.negativeName) as keyof TokensModel
          ],
      }))
        .filter((data) => data.value !== 0)
        .map((data) => {
          const positiveDescription =
            data.positiveNarrativeDescription && !isCombatMode
              ? data.positiveNarrativeDescription
              : data.positiveDescription;
          const negativeDescription =
            data.negativeNarrativeDescription && !isCombatMode
              ? data.negativeNarrativeDescription
              : data.negativeDescription;
          const show = data.showInNarrativeMode || isCombatMode;

          const { positiveName, negativeName, isUncapped, value } = data;

          return (
            <SummaryTokenGroup
              key={positiveName + negativeName}
              isUncapped={isUncapped}
              positiveName={positiveName}
              negativeName={negativeName}
              positiveDescription={positiveDescription}
              negativeDescription={negativeDescription}
              show={show}
              value={value}
            />
          );
        })}
      {tokens.stunned !== 0 && (
        <Box
          className="jg-TokenField"
          display={isCombatMode ? "grid" : "none"}
          gridTemplateColumns="90px 48px 90px"
        >
          <SummaryTokenChips
            positiveName=""
            negativeName="Stunned"
            value={-1 * tokens.stunned}
          />
          <SummaryTokenButton
            className="jg-TokenField__button is-negative"
            name="Stunned"
            description={STUNNED_TOKEN_DESCRIPTION}
          />
        </Box>
      )}
    </Box>
  );
};

export default CharacterSummaryTokens;
