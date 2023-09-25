import React from "react";
import { useFieldArray } from "react-hook-form";

import { Stack } from "@chakra-ui/react";

import WeaponFieldGroup from "~/components/forms/WeaponFieldGroup/WeaponFieldGroup";
import { LoadoutType } from "~/models/Loadout.model";

type WeaponsProps = {
  type: LoadoutType;
};

const Weapons = ({ type }: WeaponsProps) => {
  const { fields: weapons } = useFieldArray({
    name: `loadouts.${type}.weapons`,
  });

  return (
    <Stack width="100%" gap="0.875rem">
      {weapons.map((field, index) => (
        <WeaponFieldGroup key={field.id} index={index} loadoutType={type} />
      ))}
    </Stack>
  );
};

export default Weapons;
