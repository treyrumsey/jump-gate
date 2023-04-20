import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
} from "@chakra-ui/react";
import { useDisclosureContext } from "lib/components/context/DisclosureProvider";
import CustomIcon, { CustomIcons } from "lib/components/icons/CustomIcon";
import React from "react";
import { useNavigate } from "react-router-dom";
import ImportCharacterInput from "webapp/modules/JumpGateCharacters/CharactersSidebar/ImportCharacterInput";
import { useCharactersContext } from "webapp/modules/context/CharactersProvider";
import { ref, set } from "firebase/database";
import { auth, db } from "webapp/App";
import { useAuthState } from "react-firebase-hooks/auth";
import { mockCharacterSummary } from "models/CharacterSummary.model";
import { generateUUID } from "lib/utilities/GenerateUUID";

const CharactersSidebar = () => {
  const { isOpen, onClose } = useDisclosureContext();

  const { getCharacterIdsAndNames, addCharacter, switchCharacter } =
    useCharactersContext();

  const [user] = useAuthState(auth);

  const handleAddCharacterToRoom = async () => {
    if (user) {
      const characterSummary = mockCharacterSummary();
      const path =
        "rooms/" +
        "U0W7S4/" +
        "players/" +
        generateUUID() +
        "/characters/" +
        characterSummary.id;
      // const reducedCharacters: Record<string, Character> =
      //   getCharacters().reduce(
      //     (acc: Record<string, Character>, character: Character) => {
      //       acc[character.id] = character;
      //       return acc;
      //     },
      //     {}
      //   );

      await set(ref(db, path), characterSummary);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent className="jg-Sidebar">
          <DrawerCloseButton />
          <DrawerHeader>Characters</DrawerHeader>
          <Divider />
          <DrawerBody padding="0">
            {/* {user && (
              <Button width="100%" onClick={handleAddCharacterToRoom}>
                Save to Cloud
              </Button>
            )}
            <Divider /> */}
            {getCharacterIdsAndNames().map(
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
            )}
          </DrawerBody>
          <DrawerFooter>
            <HStack spacing="4">
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
          </DrawerFooter>
          <Divider />
          <DrawerFooter>
            <Button
              leftIcon={
                <CustomIcon
                  icon={CustomIcons.Home}
                  size="1rem"
                  fill="#ffffff"
                />
              }
              width="100%"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CharactersSidebar;
