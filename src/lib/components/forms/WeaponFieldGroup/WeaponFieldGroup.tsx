import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import AmmoField from "lib/components/forms/AmmoField/AmmoField";
import TagList from "lib/components/forms/TagList/TagList";
import ToHit from "lib/components/forms/WeaponFieldGroup/ToHit/ToHit";
import { getWeaponLabel } from "lib/utilities/WeaponUtilities";
import { Dice } from "models/Dice.model";
import { LoadoutType } from "models/Loadout.model";
import { WeaponRange, WeaponType } from "models/Weapon.model";
import React from "react";
import { useFormContext } from "react-hook-form";

interface WeaponFieldGroupProps {
  index: number;
  loadoutType: LoadoutType;
  isEditingLoadout?: boolean;
}

const WeaponFieldGroup = ({
  index,
  loadoutType,
  isEditingLoadout,
}: WeaponFieldGroupProps) => {
  const { register, getValues } = useFormContext();
  const weaponId = `loadouts.${loadoutType}.weapons[${index}]`;

  const weaponLabel = getWeaponLabel(index, loadoutType);

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

  const hasMods = getValues(`${weaponId}.mods`).length > 0;
  const hasTraits = getValues(`${weaponId}.traits`).length > 0;

  return (
    <Box className="jg-WeaponFieldGroup">
      <div className="jg-WeaponFieldGroup__inputs">
        <FormControl variant="floating" className="jg-WeaponFieldGroup__name">
          <Input
            id={`${weaponId}.name`}
            placeholder={weaponLabel}
            size="sm"
            {...register(`${weaponId}.name`)}
          />
          <FormLabel htmlFor={`${weaponId}.name`} size="sm">
            {weaponLabel}
          </FormLabel>
        </FormControl>

        <FormControl variant="floating" className="jg-WeaponFieldGroup__type">
          <Select
            id={`${weaponId}.type`}
            placeholder=" "
            size="sm"
            {...register(`${weaponId}.type`)}
          >
            {typeOptions}
          </Select>
          <FormLabel htmlFor={`${weaponId}.type`} size="sm">
            Type
          </FormLabel>
        </FormControl>

        <FormControl variant="floating" className="jg-WeaponFieldGroup__range">
          <Select
            id={`${weaponId}.range`}
            placeholder=" "
            size="sm"
            {...register(`${weaponId}.range`)}
          >
            {rangeOptions}
          </Select>
          <FormLabel htmlFor={`${weaponId}.range`} size="sm">
            Range
          </FormLabel>
        </FormControl>
        <ToHit weaponId={weaponId} />
        <FormControl variant="floating" className="jg-WeaponFieldGroup__damage">
          <Select
            id={`${weaponId}.damage`}
            placeholder=" "
            size="sm"
            {...register(`${weaponId}.damage`)}
          >
            {damageOptions}
          </Select>
          <FormLabel htmlFor={`${weaponId}.damage`} size="sm">
            Damage
          </FormLabel>
        </FormControl>

        <AmmoField weaponId={weaponId} />
      </div>

      {(hasMods || hasTraits) && (
        <Stack spacing="2" direction="row" marginTop="1.5">
          {hasMods && (
            <TagList
              isEditing={isEditingLoadout}
              listId={`${weaponId}.mods`}
              listName="Mods"
            />
          )}

          {hasTraits && (
            <TagList
              colorScheme="facebook"
              isEditing={isEditingLoadout}
              listId={`${weaponId}.traits`}
              listName="Traits"
            />
          )}
        </Stack>
      )}
    </Box>
  );
};

export default WeaponFieldGroup;
