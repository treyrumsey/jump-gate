import { Avatar, AvatarGroup, Box, FormControl } from "@chakra-ui/react";
import TokenField from "lib/components/forms/TokenField/TokenField";
import React from "react";
import { useFormContext } from "react-hook-form";

export const Tokens = () => {
  const { register, control } = useFormContext();

  return (
    <Box className="msc-Tokens">
      <TokenField positiveName="Accurate" negativeName="Misfire" />
      <TokenField positiveName="Dodge" negativeName="Off-Guard" />
      <TokenField positiveName="Empowered" negativeName="Weakened" />
      <TokenField positiveName="Fleet" negativeName="Immobilized" />
      <TokenField positiveName="Fortified" negativeName="Vulnerable" />
      <TokenField positiveName="Overwatch" negativeName="Jammed" />
      <TokenField positiveName="Regen" negativeName="Burn" />
    </Box>
  );
};
