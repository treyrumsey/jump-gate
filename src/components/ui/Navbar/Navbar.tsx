import React from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, ButtonGroup, IconButton } from "@chakra-ui/react";

import { useDisclosureContext } from "~/components/context/DisclosureProvider";
import ViewToggle from "~/components/ui/ViewToggle/ViewToggle";

type NavbarProps = {
  leftButton?: React.ReactElement;
  showModeToggle?: boolean;
};

export const Navbar = ({ leftButton, showModeToggle }: NavbarProps) => {
  const { onOpen } = useDisclosureContext();

  return (
    <Box
      className="jg-Navbar"
      backdropFilter="blur(25px)"
      background="blackAlpha.600"
      display="flex"
      height="48px"
      paddingLeft={leftButton ? undefined : "48px"}
      position="sticky"
      top="0"
      width="100%"
      zIndex="1000"
    >
      {leftButton !== undefined && (
        <ButtonGroup padding="1" position="absolute" left="0">
          {leftButton}
        </ButtonGroup>
      )}
      <Box
        display="flex"
        justifyContent="center"
        marginLeft="auto"
        marginRight="auto"
      >
        {showModeToggle && <ViewToggle />}
      </Box>
      <ButtonGroup padding="1" position="absolute" right="0">
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          size="md"
          variant="ghost"
          onClick={() => onOpen()}
        />
      </ButtonGroup>
    </Box>
  );
};
