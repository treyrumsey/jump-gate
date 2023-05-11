import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";

import { NumberField } from "~/components/forms/NumberField/NumberField";
import TagEditor from "~/components/forms/TagEditor/TagEditor";
import { useWeaponEditorContext } from "~/features/Character/CharacterSheet/Loadout/LoadoutEditor/WeaponEditor/WeaponEditorProvider";
import { WeaponModType } from "~/models/Weapon.model";

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

  const traitsFieldArrayId = `${weaponId}.traits`;
  const {
    fields: traitFields,
    append: appendTrait,
    remove: removeTrait,
  } = useFieldArray({
    name: traitsFieldArrayId,
  });

  const weaponName = getValues(`${weaponId}.name`);

  return (
    <Card
      padding="4"
      className="augmented"
      data-augmented-ui="tl-clip tr-round br-clip bl-round border"
    >
      <CardHeader
        padding="0"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="md" fontFamily="Oxanium" marginRight="auto">
          {weaponName.length > 0 ? weaponName : "Weapon"}
        </Heading>
        <FormControl className="jg-WeaponEditor__max-ammo" variant="floating">
          <NumberField
            id={`${weaponId}.ammo.max`}
            name={`${weaponId}.ammo.max`}
            rules={{ min: 0, max: 100 }}
            defaultValue={0}
            control={control}
            size="sm"
          />
          <FormLabel htmlFor={`${weaponId}.ammo.max`}>Max Ammo</FormLabel>
        </FormControl>
      </CardHeader>
      {isModdable && (
        <div className="jg-WeaponEditor__mods">
          {modFields.length > 0 && (
            <Heading size="sm" fontFamily="Oxanium" marginRight="auto">
              Mods
            </Heading>
          )}

          {modFields.map((modField, modIndex) => (
            <TagEditor
              key={modField.id}
              tagId={`${modsFieldArrayId}[${modIndex}]`}
              tagName={"Mod"}
              tagTypeOptions={Object.values(WeaponModType)}
              onDelete={() => removeMod(modIndex)}
            />
          ))}

          <Button
            className="is-positive"
            leftIcon={<AddIcon />}
            size="sm"
            onClick={() =>
              appendMod({ name: "", type: undefined, description: "" })
            }
          >
            Add Mod
          </Button>
        </div>
      )}
      <div className="jg-WeaponEditor__trait">
        {traitFields.length > 0 && (
          <Heading size="sm" fontFamily="Oxanium" marginRight="auto">
            Traits
          </Heading>
        )}

        {traitFields.map((traitField, traitIndex) => (
          <TagEditor
            key={traitField.id}
            tagId={`${traitsFieldArrayId}[${traitIndex}]`}
            tagName={"Trait"}
            onDelete={() => removeTrait(traitIndex)}
          />
        ))}

        <Button
          className="is-positive"
          leftIcon={<AddIcon />}
          size="sm"
          onClick={() => appendTrait({ name: "", description: "" })}
        >
          Add Trait
        </Button>
      </div>
    </Card>
  );
};

export default WeaponEditor;
