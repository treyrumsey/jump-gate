import { Box, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import AmmoField from "lib/components/forms/AmmoField/AmmoField";
import { Dice } from "models/Dice.model";
import { LoadoutType } from "models/Loadout.model";
import { WeaponRange } from "models/Weapon.model";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useCharacterSheetViewContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheetViewContext";

interface WeaponFieldsProps {
  loadoutType: LoadoutType;
  loadoutIndex: number;
  weaponIndex: number;
}

const WeaponFields = ({
  loadoutType,
  loadoutIndex,
  weaponIndex,
}: WeaponFieldsProps) => {
  const { register } = useFormContext();
  const { isCombatView } = useCharacterSheetViewContext();

  const fieldName = `${loadoutType}[${loadoutIndex}].weapons[${weaponIndex}]`;

  const rangeOptions = Object.keys(WeaponRange).map((value) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));

  const damageOptions = Object.keys(Dice)
    .filter((value) => value !== Dice.d20)
    .map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ));

  return (
    <Box className="msc-WeaponFields">
      <FormControl variant="floating">
        <Input
          id={`${fieldName}.name`}
          placeholder={"Weapon"}
          {...register(`${fieldName}.name`)}
        />
        <FormLabel htmlFor={`${fieldName}.name`}>Weapon</FormLabel>
      </FormControl>
      <FormControl variant="floating">
        <Select
          id={`${fieldName}.range`}
          placeholder=" "
          {...register(`${fieldName}.range`)}
        >
          {rangeOptions}
        </Select>
        <FormLabel htmlFor={`${fieldName}.range`}>Range</FormLabel>
      </FormControl>
      <FormControl variant="floating">
        <Select
          id={`${fieldName}.damage`}
          placeholder=" "
          {...register(`${fieldName}.damage`)}
        >
          {damageOptions}
        </Select>
        <FormLabel htmlFor={`${fieldName}.damage`}>Damage</FormLabel>
      </FormControl>
      <AmmoField fieldPath={`${fieldName}`} max={4} />
    </Box>
  );
};

export default WeaponFields;
