import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { AttributeName } from "models/Attribute.model";
import { WeaponType } from "models/Weapon.model";
import React from "react";
import { useWatch } from "react-hook-form";

type ToHitMapType = {
  [key in WeaponType]: AttributeName;
};

const ToHitMap: ToHitMapType = {
  [WeaponType.Amp]: AttributeName.Discipline,
  [WeaponType.Heavy]: AttributeName.Reflex,
  [WeaponType.Longarm]: AttributeName.Reflex,
  [WeaponType.Melee]: AttributeName.Physique,
  [WeaponType.Pistol]: AttributeName.Reflex,
  [WeaponType.Rifle]: AttributeName.Reflex,
  [WeaponType.Shotgun]: AttributeName.Reflex,
};

interface ToHitProps {
  weaponId: string;
}

const ToHit = ({ weaponId }: ToHitProps) => {
  const type: WeaponType = useWatch({ name: `${weaponId}.type` });
  const attributeName = ToHitMap[type];

  const attribute = useWatch({
    name: `attributes.${attributeName}.value`,
  });

  console.log(attributeName);

  let attributePrefix = "";
  if (attribute > 0) attributePrefix = "+";
  else if (attribute < 0) attributePrefix = "-";

  return (
    <Box className="msc-WeaponFieldGroup__to-hit">
      <FormLabel>To Hit</FormLabel>
      <span className="msc-WeaponFieldGroup__to-hit-value">
        {attributePrefix + attribute}
      </span>
    </Box>
  );
};

export default ToHit;
