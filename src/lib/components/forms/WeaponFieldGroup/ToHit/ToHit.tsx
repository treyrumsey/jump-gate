import { Box, FormLabel } from "@chakra-ui/react";
import useToHitModifier from "lib/components/forms/WeaponFieldGroup/ToHit/useToHitModifier";
import React from "react";

interface ToHitProps {
  weaponId: string;
}

const ToHit = ({ weaponId }: ToHitProps) => {
  const modifier = useToHitModifier(weaponId);

  let modifierSign = "";
  if (modifier > 0) modifierSign = "+";

  return (
    <Box className="jg-WeaponFieldGroup__to-hit">
      <FormLabel>To Hit</FormLabel>
      <span className="jg-WeaponFieldGroup__to-hit-value">
        {modifierSign + modifier}
      </span>
    </Box>
  );
};

export default ToHit;
