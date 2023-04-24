import React from "react";

import {
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
import { ref, set } from "firebase/database";

import { db } from "~/App";
import { useDisclosureContext } from "~/components/context/DisclosureProvider";
import { CustomIcons } from "~/components/icons/CustomIcon";
import { SidebarNavigateButton } from "~/components/ui/Sidebar/SidebarNavigateButton/SidebarNavigateButton";
import { SidebarCharactersSection } from "~/features/Characters/SidebarCharacters/SidebarCharactersSection";
import { generateUUID } from "~/lib/utilities/GenerateUUID";
import { buildCharacter } from "~/models/Character.model";
import { mockCharacterSummary } from "~/models/CharacterSummary.model";

type SidebarProps = {
  showCharacterList?: boolean;
};

export const Sidebar = ({ showCharacterList }: SidebarProps) => {
  const { isOpen, onClose } = useDisclosureContext();

  const uploadDummyCharacter = () => {
    const character = mockCharacterSummary(generateUUID(), "Faye");
    set(ref(db, "users/player4/characters/" + character.id), character);
    set(ref(db, `games/77711/characters/` + character.id), "player4");
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent className="jg-Sidebar">
          <DrawerCloseButton />
          <DrawerHeader>Jump Gate</DrawerHeader>
          <Divider mb="3" />
          <DrawerBody padding="0">
            {/* <Button width="100%" onClick={uploadDummyCharacter}>
              Upload Test Data
            </Button>

            <Divider /> */}
            <SidebarNavigateButton icon={CustomIcons.Home} to="/" text="Home" />
            <SidebarNavigateButton
              icon={CustomIcons.World}
              to="/games"
              text="Games"
            />
            {showCharacterList ? (
              <SidebarCharactersSection />
            ) : (
              <SidebarNavigateButton
                icon={CustomIcons.Characters}
                to="/characters"
                text="Characters"
              />
            )}
          </DrawerBody>
          <DrawerFooter>
            <HStack spacing="4"></HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
