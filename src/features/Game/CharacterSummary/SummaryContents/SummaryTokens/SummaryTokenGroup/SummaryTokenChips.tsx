import React from "react";

import { Avatar, AvatarGroup } from "@chakra-ui/react";

type RenderTokensProps = {
  isUncapped?: boolean;
  positiveName: string;
  negativeName: string;
  value: number;
};
export const SummaryTokenChips = ({
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
