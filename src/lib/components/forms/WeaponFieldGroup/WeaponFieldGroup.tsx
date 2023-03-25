import { Box, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import AmmoField from "lib/components/forms/AmmoField/AmmoField";
import { Dice } from "models/Dice.model";
import { LoadoutType } from "models/Loadout.model";
import { WeaponRange, WeaponType } from "models/Weapon.model";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useCharacterSheetViewContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheetViewContext";

interface WeaponFieldGroupProps {
  index: number;
  label: string;
  loadoutType: LoadoutType;
}

const WeaponFieldGroup = ({
  index,
  label,
  loadoutType,
}: WeaponFieldGroupProps) => {
  const { register } = useFormContext();
  const { isCombatView } = useCharacterSheetViewContext();

  const fieldName = `loadouts.${loadoutType}.weapons[${index}]`;

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
    <Box className="msc-WeaponFieldGroup">
      <FormControl variant="floating" className="msc-WeaponFieldGroup__name">
        <Input
          id={`${fieldName}.name`}
          placeholder={label}
          size="sm"
          {...register(`${fieldName}.name`)}
        />
        <FormLabel htmlFor={`${fieldName}.name`} size="sm">
          {label}
        </FormLabel>
      </FormControl>
      <FormControl variant="floating" className="msc-WeaponFieldGroup__type">
        <Select
          id={`${fieldName}.type`}
          placeholder=" "
          size="sm"
          {...register(`${fieldName}.type`)}
        >
          {typeOptions}
        </Select>
        <FormLabel htmlFor={`${fieldName}.type`} size="sm">
          Type
        </FormLabel>
      </FormControl>
      <FormControl variant="floating" className="msc-WeaponFieldGroup__range">
        <Select
          id={`${fieldName}.range`}
          placeholder=" "
          size="sm"
          {...register(`${fieldName}.range`)}
        >
          {rangeOptions}
        </Select>
        <FormLabel htmlFor={`${fieldName}.range`} size="sm">
          Range
        </FormLabel>
      </FormControl>
      <FormControl variant="floating" className="msc-WeaponFieldGroup__damage">
        <Select
          id={`${fieldName}.damage`}
          placeholder=" "
          size="sm"
          {...register(`${fieldName}.damage`)}
        >
          {damageOptions}
        </Select>
        <FormLabel htmlFor={`${fieldName}.damage`} size="sm">
          Damage
        </FormLabel>
      </FormControl>
      <AmmoField fieldPath={`${fieldName}`} max={4} />
    </Box>
  );
};

export default WeaponFieldGroup;
