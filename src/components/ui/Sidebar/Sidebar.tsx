import React from "react";

import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

import { useDisclosureContext } from "~/components/context/DisclosureProvider";
import { CustomIcons } from "~/components/icons/CustomIcon";
import { SidebarNavigateButton } from "~/components/ui/Sidebar/SidebarNavigateButton/SidebarNavigateButton";
import { SidebarCharactersSection } from "~/features/Characters/SidebarCharacters/SidebarCharactersSection";

type SidebarProps = {
  showCharacterList?: boolean;
};

export const Sidebar = ({ showCharacterList }: SidebarProps) => {
  const { isOpen, onClose } = useDisclosureContext();

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent className="jg-Sidebar">
          <DrawerCloseButton />
          <DrawerHeader>Jump Gate</DrawerHeader>
          <Divider mb="3" />
          <DrawerBody padding="0">
            <SidebarNavigateButton icon={CustomIcons.Home} to="/" text="Home" />
            <SidebarNavigateButton
              icon={CustomIcons.World}
              to="/games"
              text="Games"
            />
            {showCharacterList && isOpen ? (
              <SidebarCharactersSection />
            ) : (
              <SidebarNavigateButton
                icon={CustomIcons.Characters}
                to="/characters"
                text="Characters"
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
