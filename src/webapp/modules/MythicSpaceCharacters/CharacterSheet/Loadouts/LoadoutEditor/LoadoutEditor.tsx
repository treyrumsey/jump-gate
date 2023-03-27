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
import WeaponEditor from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadouts/LoadoutEditor/WeaponEditor/WeaponEditor";

interface LoadoutEditorProps {
  type: LoadoutType;
  isOpen: boolean;
  onClose: () => void;
}

const LoadoutEditor = ({ type, isOpen, onClose }: LoadoutEditorProps) => {
  const fieldRoot = `loadouts.${type}.weapons`;

  const { control } = useFormContext();
  const { fields } = useFieldArray({ control, name: fieldRoot });

  const buildWeaponId = (index: number) => `${fieldRoot}[${index}]`;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" position="relative" paddingBottom="0">
          Loadout
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="msc-LoadoutEditor">
          {fields.map((field, index) => (
            <WeaponEditor key={field.id} weaponId={buildWeaponId(index)} />
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadoutEditor;
