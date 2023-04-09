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
} from "@chakra-ui/react";
import { useDisclosureContext } from "lib/components/context/DisclosureProvider";
import React from "react";
import { useCharactersContext } from "webapp/modules/context/CharactersProvider";

const Sidebar = () => {
  const { isOpen, onClose } = useDisclosureContext();

  const { getCharacterIdsAndNames, addCharacter, switchCharacter } =
    useCharactersContext();

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
                  <Box textAlign="start" marginX="6" data->
                    {character.name ? character.name : "Unnamed Character"}
                  </Box>
                </Button>
              )
            )}
          </DrawerBody>

          <DrawerFooter>
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
            {/* 
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
