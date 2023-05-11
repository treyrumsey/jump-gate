import React from "react";
import { useFormContext } from "react-hook-form";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import { useDisclosureContext } from "~/components/context/DisclosureProvider";
import ViewToggle from "~/components/ui/ViewToggle/ViewToggle";
import CharacterModal from "~/features/Character/CharacterSheet/CharacterModal/CharacterModal";
import CharacterModalButton from "~/features/Character/CharacterSheet/CharacterModal/CharacterModalButton";

export const PersonalDetails = () => {
  const { register } = useFormContext();

  const { onOpen } = useDisclosureContext();

  const {
    isOpen: isCharacterModalOpen,
    onOpen: onCharacterModalOpen,
    onClose: onCharacterModalClose,
  } = useDisclosure();

  const [isTabletOrWider] = useMediaQuery("(min-width: 768px)");

  const size = "sm";
  return (
    <div className="jg-PersonalDetails">
      <FormControl variant="floating" className="jg-PersonalDetails__name">
        <Input id="name" placeholder="Name" {...register("name")} size={size} />
        <FormLabel htmlFor="name">Name</FormLabel>
      </FormControl>
      <FormControl variant="floating" className="jg-PersonalDetails__species">
        <Input
          id="species"
          placeholder="Species"
          {...register("species")}
          size={size}
        />
        <FormLabel htmlFor="species">Species</FormLabel>
      </FormControl>
      <FormControl variant="floating" className="jg-PersonalDetails__ship">
        <Input id="ship" placeholder="Ship" {...register("ship")} size={size} />
        <FormLabel htmlFor="ship">Ship</FormLabel>
      </FormControl>
      <ViewToggle />

      <ButtonGroup isAttached>
        <CharacterModalButton onOpen={onCharacterModalOpen} />
        {isTabletOrWider && (
          <IconButton
            aria-label="Open Menu"
            background="blackAlpha.600"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            size="sm"
          />
        )}
      </ButtonGroup>
      <CharacterModal
        isCharacterModalOpen={isCharacterModalOpen}
        onCharacterModalClose={onCharacterModalClose}
      />
    </div>
  );
};
