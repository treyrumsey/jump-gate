import React from "react";

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
} from "@chakra-ui/react";

import { useDisclosureContext } from "~/components/context/DisclosureProvider";
import CustomIcon, { CustomIcons } from "~/components/icons/CustomIcon";
import { useCharactersContext } from "~/context/CharactersProvider";
import ImportCharacterInput from "~/features/Characters/SidebarCharacters/ImportCharacterInput";

export const SidebarCharactersSection = () => {
  const { onClose } = useDisclosureContext();

  const { getCharacterIdsAndNames, addCharacter, switchCharacter } =
    useCharactersContext();

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
