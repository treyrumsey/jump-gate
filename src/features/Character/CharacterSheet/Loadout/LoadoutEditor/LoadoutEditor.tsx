import React from "react";
import { useFieldArray } from "react-hook-form";

import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import TagEditor from "~/components/forms/TagEditor/TagEditor";
import WeaponEditor from "~/features/Character/CharacterSheet/Loadout/LoadoutEditor/WeaponEditor/WeaponEditor";
import WeaponEditorProvider from "~/features/Character/CharacterSheet/Loadout/LoadoutEditor/WeaponEditor/WeaponEditorProvider";
import { ArmorModType } from "~/models/ArmorMod.model";
import { GearType } from "~/models/Gear.model";
import { LoadoutType } from "~/models/Loadout.model";
import { initWeapon } from "~/models/Weapon.model";

interface LoadoutEditorProps {
  type: LoadoutType;
  isOpen: boolean;
  onClose: () => void;
}

const LoadoutEditor = ({ type, isOpen, onClose }: LoadoutEditorProps) => {
  const {
    fields: weaponFields,
    append: appendWeapon,
    remove: removeWeapon,
  } = useFieldArray({
    name: `loadouts.${type}.weapons`,
  });

  const gearFieldArrayId = `loadouts.${type}.gear`;
  const {
    fields: gearFields,
    append: appendGear,
    remove: removeGear,
  } = useFieldArray({
    name: gearFieldArrayId,
  });

  const armorModsFieldArrayId = `loadouts.${type}.armorMods`;
  const {
    fields: armorModsFields,
    append: appendArmorMod,
    remove: removeArmorMod,
  } = useFieldArray({
    name: armorModsFieldArrayId,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        className="jg-LoadoutEditor augmented"
        data-augmented-ui="tl-clip tr-round br-clip bl-round border"
      >
        <ModalHeader textAlign="center" position="relative" paddingBottom="0">
          Loadout
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="jg-LoadoutEditor__body">
          {weaponFields.map((weaponField, weaponIndex) => (
            <WeaponEditorProvider
              key={weaponField.id}
              index={weaponIndex}
              isEditing={isOpen}
              loadoutType={type}
              onDelete={() => removeWeapon(weaponIndex)}
            >
              <WeaponEditor />
            </WeaponEditorProvider>
          ))}
          <Box>
            <Button
              className="is-positive"
              leftIcon={<AddIcon />}
              size="sm"
              marginX="auto"
              onClick={() => appendWeapon(initWeapon())}
            >
              Add Weapon
            </Button>
          </Box>

          {type === LoadoutType.Combat && (
            <div className="jg-LoadoutEditor__armorMods">
              {armorModsFields.length > 0 && (
                <Heading size="sm" fontFamily="Oxanium">
                  Armor Mods
                </Heading>
              )}
              {armorModsFields.map((modField, modIndex) => (
                <TagEditor
                  key={modField.id}
                  tagId={`${armorModsFieldArrayId}[${modIndex}]`}
                  tagName="Armor Mod"
                  tagTypeOptions={Object.values(ArmorModType)}
                  onDelete={() => removeArmorMod(modIndex)}
                />
              ))}

              <Button
                className="is-positive"
                leftIcon={<AddIcon />}
                size="sm"
                marginX="auto"
                onClick={() =>
                  appendArmorMod({ name: "", type: undefined, description: "" })
                }
              >
                Add Armor Mod
              </Button>
            </div>
          )}

          <Box className="jg-LoadoutEditor__gear" paddingTop="4">
            {gearFields.length > 0 && (
              <Heading size="sm" fontFamily="Oxanium">
                Gear
              </Heading>
            )}
            {gearFields.map((gearField, gearIndex) => (
              <TagEditor
                key={gearField.id}
                tagId={`${gearFieldArrayId}[${gearIndex}]`}
                tagName="Gear"
                tagTypeOptions={Object.values(GearType)}
                onDelete={() => removeGear(gearIndex)}
              />
            ))}

            <Button
              className="is-positive"
              leftIcon={<AddIcon />}
              size="sm"
              onClick={() =>
                appendGear({ name: "", type: undefined, description: "" })
              }
            >
              Add Gear
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadoutEditor;
