import { Box, Button } from "@chakra-ui/react";
import TokenField from "lib/components/forms/TokenField/TokenField";
import UniqueTokenField, {
  TokenType,
} from "lib/components/forms/TokenField/UniqueTokenField/UniqueTokenField";
import { Red } from "lib/components/typography/MarkdownColorOverrides/MarkdownColorOverrides";
import React from "react";
import { useFormContext } from "react-hook-form";
import { usePlayModeContext } from "webapp/modules/JumpGateCharacters/CharacterSheet/PlayModeProvider";
import { TOKEN_DATA } from "webapp/modules/JumpGateCharacters/CharacterSheet/Tokens/TokenData";

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
      {/* {isCombatMode && <Divider />} */}
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
          description={
            <>
              You cannot act at all while you have any <Red>stunned tokens</Red>
              . At the end of your turn, reduce your <Red>stunned tokens</Red>{" "}
              by 1. You can <strong>push yourself</strong> to take an action
              while you are stunned as normal. <Red>Stunned tokens</Red> do not
              have an opposite.
            </>
          }
        />
      </Box>
    </div>
  );
};
