import { Box } from "@chakra-ui/react";
import WeaponFields from "lib/components/forms/WeaponFields/WeaponFields";
import { LoadoutType } from "models/Loadout.model";
import React from "react";

interface CasualLoadoutProps {
  index: number;
}

const CasualLoadout = ({ index }: CasualLoadoutProps) => {
  return (
    <Box key={index} className="msc-CasualLoadout">
      <WeaponFields
        loadoutType={LoadoutType.Casual}
        loadoutIndex={index}
        weaponIndex={0}
      />
    </Box>
  );
};

export default CasualLoadout;
