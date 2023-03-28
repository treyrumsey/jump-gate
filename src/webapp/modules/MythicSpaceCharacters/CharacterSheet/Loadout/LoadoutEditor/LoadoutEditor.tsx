import React from "react";

import { LoadoutType } from "models/Loadout.model";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import WeaponEditor from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadout/LoadoutEditor/WeaponEditor/WeaponEditor";
import WeaponEditorProvider from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadout/LoadoutEditor/WeaponEditor/WeaponEditorProvider";

interface LoadoutEditorProps {
  type: LoadoutType;
  isOpen: boolean;
  onClose: () => void;
}

const LoadoutEditor = ({ type, isOpen, onClose }: LoadoutEditorProps) => {
  const { fields } = useFieldArray({ name: `loadouts.${type}.weapons` });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="msc-LoadoutEditor">
        <ModalHeader textAlign="center" position="relative" paddingBottom="0">
          Loadout
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="msc-LoadoutEditor__body">
          {fields.map((field, index) => (
            <WeaponEditorProvider
              key={field.id}
              index={index}
              isEditing={isOpen}
              loadoutType={type}
            >
              <WeaponEditor />
            </WeaponEditorProvider>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadoutEditor;
