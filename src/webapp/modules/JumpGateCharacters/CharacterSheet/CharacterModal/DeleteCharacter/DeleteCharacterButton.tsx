import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useCharactersContext } from "webapp/modules/context/CharactersProvider";
import { useFormContext } from "react-hook-form";

type DeleteCharacterButtonProps = {
  onCharacterModalClose: () => void;
};

const DeleteCharacterButton = ({
  onCharacterModalClose,
}: DeleteCharacterButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { getValues } = useFormContext();
  const { deleteCharacter, currentCharacterId } = useCharactersContext();

  const confirmDelete = () => {
    onOpen();
  };

  const handleDelete = () => {
    onClose();
    onCharacterModalClose();
    deleteCharacter(currentCharacterId);
  };

  const name: string = getValues("name");

  return (
    <>
      <Button className="is-negative" onClick={confirmDelete}>
        Delete Character
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="jg-DeleteCharacterButton__confirm">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {`Delete ${name}`}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button className="is-negative" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteCharacterButton;
