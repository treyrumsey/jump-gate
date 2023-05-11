import React, { useEffect, useState } from "react";

import { AddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  HStack,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { DatabaseReference, ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObject } from "react-firebase-hooks/database";

import { auth, db } from "~/App";
import { useDisclosureContext } from "~/components/context/DisclosureProvider";
import CustomIcon, { CustomIcons } from "~/components/icons/CustomIcon";
import { useCharactersContext } from "~/context/CharactersProviderOld";
import ImportCharacterInput from "~/features/Characters/SidebarCharacters/ImportCharacterInput";
import { Character } from "~/models/Character.model";

export const SidebarCharactersSection = () => {
  const { onClose } = useDisclosureContext();

  const {
    getCharacterIdsAndNames,
    addCharacter,
    switchCharacter,
    currentCharacterId,
    updateLocalCharacter,
  } = useCharactersContext();

  const [user, userLoading] = useAuthState(auth);
  const [cloudCharactersRef, setCloudCharactersRef] =
    useState<DatabaseReference>();
  useEffect(() => {
    if (user) {
      setCloudCharactersRef(ref(db, "users/" + user.uid + "/characters"));
    }
  }, [user]);
  const [cloudCharactersSnapshot, cloudCharactersLoading] =
    useObject(cloudCharactersRef);

  useEffect(() => {
    if (
      !userLoading &&
      !cloudCharactersLoading &&
      cloudCharactersSnapshot?.exists()
    ) {
      const cloudCharacters: { [key: string]: Character } =
        cloudCharactersSnapshot.val();
      Object.values(cloudCharacters)
        .filter((character) => character.id !== currentCharacterId)
        .forEach((character) => {
          updateLocalCharacter(character);
        });
    }
  }, [cloudCharactersLoading, userLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem border="0">
        <h2>
          <AccordionButton paddingStart="6">
            <Box as="span" flex="1" textAlign="left" fontWeight="semibold">
              <span className="jg-Sidebar__accordion-button-icon">
                <CustomIcon
                  icon={CustomIcons.Characters}
                  size="1rem"
                  fill="#ffffff"
                />
              </span>
              Characters
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {cloudCharactersLoading || userLoading ? (
            <Skeleton />
          ) : (
            getCharacterIdsAndNames().map(
              (character: { id: string; name: string }) => (
                <Button
                  display="block"
                  width="100%"
                  padding="0"
                  borderRadius="0"
                  variant="ghost"
                  alignItems="start"
                  key={character.id}
                  onClick={() => {
                    switchCharacter(character.id);
                    onClose();
                  }}
                >
                  <Box textAlign="start" marginX="6">
                    {character.name?.trim().length > 0
                      ? character.name
                      : "Unnamed Character"}
                  </Box>
                </Button>
              )
            )
          )}
          <HStack paddingTop="1rem" paddingInlineStart="6">
            <Button
              className="is-positive"
              leftIcon={<AddIcon />}
              onClick={() => {
                addCharacter();
                onClose();
              }}
            >
              Add
            </Button>
            <ImportCharacterInput onSidebarClose={onClose} />
          </HStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
