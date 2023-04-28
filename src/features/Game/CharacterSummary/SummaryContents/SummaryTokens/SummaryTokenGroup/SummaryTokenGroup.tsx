import React from "react";

import { Box } from "@chakra-ui/react";

import SummaryTokenButton from "~/features/Game/CharacterSummary/SummaryContents/SummaryTokens/SummaryTokenGroup/SummaryTokenButton";
import { SummaryTokenChips } from "~/features/Game/CharacterSummary/SummaryContents/SummaryTokens/SummaryTokenGroup/SummaryTokenChips";

type SummaryTokenGroupProps = {
  isUncapped?: boolean;
  positiveName: string;
  positiveDescription: React.ReactNode;
  negativeName: string;
  negativeDescription: React.ReactNode;
  show?: boolean;
  value: number;
};

export const SummaryTokenGroup = ({
  isUncapped,
  positiveName,
  positiveDescription,
  negativeName,
  negativeDescription,
  show,
  value,
}: SummaryTokenGroupProps) => {
  return (
    <Box
      className="jg-TokenField"
      display={show ? "grid" : "none"}
      gridTemplateColumns="90px 48px 90px"
    >
      <SummaryTokenButton
        className="jg-TokenField__button is-positive"
        name={positiveName}
        description={positiveDescription}
      />
      <SummaryTokenChips
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
