/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Character } from "models/Character.model";
import { PersonalDetails } from "webapp/modules/JumpGateCharacters/CharacterSheet/PersonalDetails/PersonalDetails";
import Facets from "webapp/modules/JumpGateCharacters/CharacterSheet/Facets/Facets";
import { Attributes } from "webapp/modules/JumpGateCharacters/CharacterSheet/Attributes/Attributes";
import { Tokens } from "webapp/modules/JumpGateCharacters/CharacterSheet/Tokens/Tokens";
import { FacetType } from "models/Facet.model";
import PlayModeProvider from "webapp/modules/JumpGateCharacters/CharacterSheet/PlayModeProvider";
import Loadout from "webapp/modules/JumpGateCharacters/CharacterSheet/Loadout/Loadout";
import Experiences from "webapp/modules/JumpGateCharacters/CharacterSheet/Experiences/Experiences";
import { LoadoutType } from "models/Loadout.model";
import CharacterListener from "webapp/modules/JumpGateCharacters/CharacterSheet/CharacterListener";
import { Status } from "webapp/modules/JumpGateCharacters/CharacterSheet/Status/Status";
import { Box, ButtonGroup, IconButton, useMediaQuery } from "@chakra-ui/react";
import { useDisclosureContext } from "lib/components/context/DisclosureProvider";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useCharactersContext } from "webapp/modules/context/CharactersProvider";

export const CharacterSheet = () => {
  const [isCombatMode, setCombatMode] = useState(false);
  const { getCurrentCharacter } = useCharactersContext();

  const useFormMethods = useForm({
    defaultValues: getCurrentCharacter(),
  });
  const { handleSubmit } = useFormMethods;

  function onSubmit(values: Character) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log({ ...values });
        resolve();
      }, 300);
    });
  }

  const [isNarrowerThanTablet] = useMediaQuery("(max-width: 767px)");

  return (
    <PlayModeProvider isCombatMode={isCombatMode} setCombatMode={setCombatMode}>
      <FormProvider {...useFormMethods}>
        {isNarrowerThanTablet && <NavBar />}
        <form
          className="jg-CharacterSheet"
          onSubmit={handleSubmit(onSubmit)}
          id="character-sheet-form"
          autoComplete="off"
        >
          <CharacterListener />

          <PersonalDetails />
          <div className="jg-CharacterSheet__area2">
            <Attributes />
            <Tokens />
            <Experiences />
          </div>
          <div className="jg-CharacterSheet__area3">
            <Status />
            <Loadout type={LoadoutType.Casual} show={!isCombatMode} />
            <Loadout type={LoadoutType.Combat} show={isCombatMode} />
            <Facets type={FacetType.Aspect} show={!isCombatMode} />
            <Facets type={FacetType.Tactic} show={isCombatMode} />
          </div>
        </form>
      </FormProvider>
    </PlayModeProvider>
  );
};

const NavBar = () => {
  const { onOpen } = useDisclosureContext();

  return (
    <Box
      className="jg-NavBar"
      width="100%"
      background="blackAlpha.600"
      backdropFilter="blur(25px)"
      position="fixed"
      top="0"
      zIndex="1000"
    >
      <ButtonGroup width="100%" padding="1">
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          size="sm"
          variant="ghost"
          marginLeft="auto"
        />
      </ButtonGroup>
    </Box>
  );
};
