import { Avatar, AvatarGroup, Box } from "@chakra-ui/react";
import { TokensModel } from "models/Character.model";
import React from "react";
import { usePlayModeContext } from "webapp/modules/JumpGateCharacters/CharacterSheet/PlayModeProvider";
import {
  STUNNED_TOKEN_DESCRIPTION,
  TOKEN_DATA,
} from "webapp/modules/JumpGateCharacters/CharacterSheet/Tokens/TokenData";
import SummaryTokenButton from "webapp/modules/Room/CharacterSummary/SummaryTokens/SummaryTokenButton";

type RenderTokensProps = {
  isUncapped?: boolean;
  positiveName: string;
  negativeName: string;
  value: number;
};
const RenderTokens = ({
  value,
  positiveName,
  negativeName,
  isUncapped,
}: RenderTokensProps) => {
  const tokenList = [];
  for (let i = Math.abs(value); i > 0; i--) {
    const name = isUncapped
      ? Math.abs(value).toString()
      : value > 0
      ? positiveName
      : negativeName;
    const bg = value > 0 ? "#183E6F" : "#6F1818";
    tokenList.push(
      <Avatar
        key={`${positiveName + negativeName}.${i}`}
        bg={bg}
        getInitials={isUncapped ? (name) => name : undefined}
        name={name}
      />
    );
  }
  return (
    <AvatarGroup
      className={`jg-TokenField__group ${
        value > 0 ? "is-positive" : "is-negative"
      }}`}
      max={3}
      size="sm"
      spacing="-1.5rem"
    >
      {tokenList}
    </AvatarGroup>
  );
};

type TokenGroupProps = {
  isUncapped?: boolean;
  positiveName: string;
  positiveDescription: React.ReactNode;
  negativeName: string;
  negativeDescription: React.ReactNode;
  show?: boolean;
  value: number;
};

const TokenGroup = ({
  isUncapped,
  positiveName,
  positiveDescription,
  negativeName,
  negativeDescription,
  show,
  value,
}: TokenGroupProps) => {
  return (
    <Box className="jg-TokenField" display={show ? "grid" : "none"}>
      <SummaryTokenButton
        className="jg-TokenField__button is-positive"
        name={positiveName}
        description={positiveDescription}
      />
      <RenderTokens
        isUncapped={isUncapped}
        positiveName={positiveName}
        negativeName={negativeName}
        value={value}
      />
      <SummaryTokenButton
        className="jg-TokenField__button is-negative"
        name={negativeName}
        description={negativeDescription}
      />
    </Box>
  );
};

type CharacterSummaryTokensProps = {
  tokens: TokensModel;
};

const CharacterSummaryTokens = ({ tokens }: CharacterSummaryTokensProps) => {
  const { isCombatMode } = usePlayModeContext();

  return (
    <Box className="jg-Tokens">
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
          <TokenGroup
            key={positiveName + negativeName}
            isUncapped={isUncapped}
            positiveName={positiveName}
            negativeName={negativeName}
            positiveDescription={positiveDescription}
            negativeDescription={negativeDescription}
            show={show}
            value={
              tokens[
                (tokenPair.positiveName +
                  tokenPair.negativeName) as keyof TokensModel
              ]
            }
          />
        );
      })}
      <Box className="jg-TokenField" display={isCombatMode ? "grid" : "none"}>
        <RenderTokens
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
    </Box>
  );
};

export default CharacterSummaryTokens;
