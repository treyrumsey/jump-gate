import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { GearType } from "models/Gear.model";
import { LoadoutType } from "models/Loadout.model";
import React from "react";
import { useFormContext } from "react-hook-form";
import { usePlayModeContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/PlayModeProvider";

interface GearFieldGroupProps {
  index: number;
  label: string;
  loadoutType: LoadoutType;
}

const GearFieldGroup = ({ index, label, loadoutType }: GearFieldGroupProps) => {
  const { register } = useFormContext();
  const { isCombatMode } = usePlayModeContext();

  const fieldName = `loadouts.${loadoutType}.gear[${index}]`;

  const typeOptions = Object.values(GearType).map((value) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));

  return (
    <div className="msc-GearFieldGroup">
      <FormControl variant="floating" className="msc-GearFieldGroup__name">
        <Input
          id={`${fieldName}.name`}
          placeholder={label}
          size="sm"
          {...register(`${fieldName}.name`)}
        />
        <FormLabel htmlFor={`${fieldName}.name`}>{label}</FormLabel>
      </FormControl>
      <FormControl
        variant="floating"
        className="msc-WeaponFieldGroup__type"
        display={isCombatMode ? undefined : "none"}
      >
        <Select
          id={`${fieldName}.type`}
          placeholder=" "
          size="sm"
          {...register(`${fieldName}.type`)}
        >
          {typeOptions}
        </Select>
        <FormLabel htmlFor={`${fieldName}.type`}>Gear Type</FormLabel>
      </FormControl>
    </div>
  );
};

export default GearFieldGroup;
