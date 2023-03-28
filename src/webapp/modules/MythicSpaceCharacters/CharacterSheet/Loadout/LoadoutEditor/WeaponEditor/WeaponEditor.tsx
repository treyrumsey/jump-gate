import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { NumberField } from "lib/components/forms/NumberField/NumberField";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ModEditor from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadout/LoadoutEditor/WeaponEditor/ModEditor";
import TraitEditor from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadout/LoadoutEditor/WeaponEditor/TraitEditor";
import { useWeaponEditorContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadout/LoadoutEditor/WeaponEditor/WeaponEditorProvider";

const WeaponEditor = () => {
  const { isModdable, weaponId } = useWeaponEditorContext();
  const { control, getValues } = useFormContext();

  const modsFieldArrayId = `${weaponId}.mods`;
  const {
    fields: modFields,
    append: appendMod,
    remove: removeMod,
  } = useFieldArray({
    name: modsFieldArrayId,
  });

  const weaponName = getValues(`${weaponId}.name`);

  return (
    <Card padding="4">
      <CardHeader
        padding="0"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="md" fontFamily="Oxanium" marginRight="auto">
          {weaponName}
        </Heading>
        <FormControl className="msc-WeaponEditor__max-ammo" variant="floating">
          <NumberField
            id={`${weaponId}.ammo.max`}
            name={`${weaponId}.ammo.max`}
            rules={{ min: 1, max: 100 }}
            defaultValue={0}
            control={control}
            size="sm"
          />
          <FormLabel htmlFor={`${weaponId}.ammo.max`}>Max Ammo</FormLabel>
        </FormControl>
      </CardHeader>
      {isModdable && (
        <div className="msc-WeaponEditor__mods">
          <Heading size="sm" fontFamily="Oxanium" marginRight="auto">
            Mods
          </Heading>
          {modFields.map((modField, modIndex) => (
            <ModEditor
              key={modField.id}
              modId={`${modsFieldArrayId}[${modIndex}]`}
              onDelete={() => removeMod(modIndex)}
            />
          ))}

          <Button
            className="is-positive"
            leftIcon={<AddIcon />}
            size="xs"
            width="100%"
            onClick={() =>
              appendMod({ name: "", type: undefined, description: "" })
            }
          >
            Add Mod
          </Button>
        </div>
      )}
      <TraitEditor />
    </Card>
  );
};

export default WeaponEditor;
