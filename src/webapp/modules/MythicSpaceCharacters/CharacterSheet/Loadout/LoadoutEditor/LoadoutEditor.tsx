import React from "react";

import { LoadoutType } from "models/Loadout.model";
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";
import WeaponEditor from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadout/LoadoutEditor/WeaponEditor/WeaponEditor";
import WeaponEditorProvider from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadout/LoadoutEditor/WeaponEditor/WeaponEditorProvider";
import { AddIcon } from "@chakra-ui/icons";
import TagEditor from "lib/components/forms/TagEditor/TagEditor";
import { GearType } from "models/Gear.model";
import { ArmorModType } from "models/ArmorMod.model";

interface LoadoutEditorProps {
  type: LoadoutType;
  isOpen: boolean;
  onClose: () => void;
}

const LoadoutEditor = ({ type, isOpen, onClose }: LoadoutEditorProps) => {
  const { fields: weaponFields } = useFieldArray({
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
      <ModalContent className="msc-LoadoutEditor">
        <ModalHeader textAlign="center" position="relative" paddingBottom="0">
          Loadout
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="msc-LoadoutEditor__body">
          {weaponFields.map((weaponField, weaponIndex) => (
            <WeaponEditorProvider
              key={weaponField.id}
              index={weaponIndex}
              isEditing={isOpen}
              loadoutType={type}
            >
              <WeaponEditor />
            </WeaponEditorProvider>
          ))}

          {type === LoadoutType.Combat && (
            <div className="msc-LoadoutEditor__armorMods">
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
                size="xs"
                width="100%"
                onClick={() =>
                  appendArmorMod({ name: "", type: undefined, description: "" })
                }
              >
                Add Armor Mod
              </Button>
            </div>
          )}

          <div className="msc-LoadoutEditor__gear">
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
              size="xs"
              width="100%"
              onClick={() =>
                appendGear({ name: "", type: undefined, description: "" })
              }
            >
              Add Gear
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadoutEditor;
