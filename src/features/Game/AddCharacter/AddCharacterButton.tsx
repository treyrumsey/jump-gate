import React from "react";

import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "~/App";
import { useCharactersContext } from "~/context/CharactersProvider";
import { useGameContext } from "~/context/GameProvider";

export const AddCharacterButton = () => {
  const [user] = useAuthState(auth);

  const { gameId, game } = useGameContext();

  const { getCharacters } = useCharactersContext();
  const toast = useToast();

  const {
    isOpen: isOpenAddCharacter,
    onOpen: onOpenAddCharacter,
    onClose: onCloseAddCharacter,
  } = useDisclosure();

  const handleAddCharacterToGame = (
    characterId: string,
    characterName: string
  ) => {
    if (!user) return;
    set(ref(db, `games/${gameId}/characters/${characterId}`), user.uid).then(
      () => {
        onCloseAddCharacter();
        toast({
          title: `${characterName} added to ${game.name}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    );
  };

  const addableCharacters = getCharacters()
    .filter((character) => character.isSynced)
    .filter(
      (character) => !Object.keys(game.characters).includes(character.id)
    );

  return (
    <>
      <IconButton
        aria-label={"Add character to game"}
        variant="ghost"
        icon={<AddIcon />}
        onClick={onOpenAddCharacter}
      />
      <Modal isOpen={isOpenAddCharacter} onClose={onCloseAddCharacter}>
        <ModalOverlay />
        <ModalContent
          className="jg-CreateGame__modal-content augmented"
          data-augmented-ui="tl-clip tr-round br-clip bl-round border"
        >
          <ModalHeader>Add Character to Game</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {addableCharacters.map((character) => (
              <Button
                key={character.id}
                width="100%"
                onClick={() =>
                  handleAddCharacterToGame(character.id, character.name)
                }
                marginBottom="2"
              >
                {character.name}
              </Button>
            ))}
            <Text
              marginBottom="3"
              maxWidth="var(--chakra-sizes-md)"
              whiteSpace="pre-line"
              fontSize="14px"
            >
              {`${
                addableCharacters.length === 0
                  ? "No characters available in roster.\n\n"
                  : ""
              }`}{" "}
              To add a character to the roster, go to the Data tab in the
              character's Details menu on the and select{" "}
              <strong>Add to Game Roster</strong>.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
