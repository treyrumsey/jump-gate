import React, { useEffect, useState } from "react";

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
import { onValue, ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "~/App";
import { useGameContext } from "~/context/GameProvider";
import { Character } from "~/models/Character.model";

export const AddCharacterButton = () => {
  const [user, userLoading] = useAuthState(auth);

  const { gameId, game } = useGameContext();

  const toast = useToast();

  const [addableCharacters, setAddabaleCharacters] = useState<Character[]>([]);

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

  useEffect(() => {
    if (!user || userLoading) return;
    const unsubscribeCharacters = onValue(
      ref(db, `users/${user.uid}/characters`),
      (snapshot) => {
        if (!snapshot.exists()) return;
        const characters: { [id: string]: Character } = snapshot.val();

        setAddabaleCharacters(
          Object.values(characters).filter(
            (character) => !game.characters[character.id]
          ) ?? []
        );
      }
    );

    return () => unsubscribeCharacters();
  }, [user, userLoading, game.characters]);

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
            {addableCharacters.length === 0 && (
              <Text
                marginBottom="3"
                maxWidth="var(--chakra-sizes-md)"
                whiteSpace="pre-line"
                fontSize="14px"
              >
                No characters eligible to be added to this game.
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
