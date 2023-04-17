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
import CustomIcon, { CustomIconType } from "lib/components/icons/CustomIcon";
import React from "react";
import { useNavigate } from "react-router-dom";
import ImportCharacterInput from "webapp/modules/JumpGateCharacters/CharactersSidebar/ImportCharacterInput";
import { useCharactersContext } from "webapp/modules/context/CharactersProvider";

const CharactersSidebar = () => {
  const { isOpen, onClose } = useDisclosureContext();

  const { getCharacterIdsAndNames, addCharacter, switchCharacter } =
    useCharactersContext();

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
                  icon={CustomIconType.Home}
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
