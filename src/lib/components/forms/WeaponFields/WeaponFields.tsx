import { Box, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import AmmoField from "lib/components/forms/AmmoField/AmmoField";
import { Dice } from "models/Dice.model";
import { LoadoutType } from "models/Loadout.model";
import { WeaponRange, WeaponType } from "models/Weapon.model";
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

  const typeOptions = Object.keys(WeaponType).map((value) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));

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
      <FormControl variant="floating" className="msc-WeaponFields__name">
        <Input
          id={`${fieldName}.name`}
          placeholder={"Weapon"}
          {...register(`${fieldName}.name`)}
        />
        <FormLabel htmlFor={`${fieldName}.name`}>Weapon</FormLabel>
      </FormControl>
      <FormControl variant="floating" className="msc-WeaponFields__type">
        <Select
          id={`${fieldName}.type`}
          placeholder=" "
          {...register(`${fieldName}.type`)}
        >
          {typeOptions}
        </Select>
        <FormLabel htmlFor={`${fieldName}.type`}>Type</FormLabel>
      </FormControl>
      <FormControl variant="floating" className="msc-WeaponFields__range">
        <Select
          id={`${fieldName}.range`}
          placeholder=" "
          {...register(`${fieldName}.range`)}
        >
          {rangeOptions}
        </Select>
        <FormLabel htmlFor={`${fieldName}.range`}>Range</FormLabel>
      </FormControl>
      <FormControl variant="floating" className="msc-WeaponFields__damage">
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
