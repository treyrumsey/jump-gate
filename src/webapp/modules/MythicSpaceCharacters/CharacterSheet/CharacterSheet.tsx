import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";
import { buildCharacter, Character } from "models/Character.model";
import { PersonalDetails } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/PersonalDetails/PersonalDetails";
import { Facets } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Facets/Facets";
import { Attributes } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Attributes/Attributes";
import { Status } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Status/Status";
import { Tokens } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Tokens/Tokens";
import { FacetType } from "models/Facet.model";
import { CharacterSheetViewContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheetViewContext";
import CasualLoadout from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadouts/CasualLoadout/CasualLoadout";
import ViewToggle from "webapp/modules/MythicSpaceCharacters/CharacterSheet/ViewToggle/ViewToggle";
import CombatLoadout from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadouts/CombatLoadout/CombatLoadout";
import Experiences from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Experiences/Experiences";

export const CharacterSheet = () => {
  const [isCombatView, setCombatView] = useState(false);

  const character = buildCharacter();

  const useFormMethods = useForm({
    defaultValues: character,
  });
  const { handleSubmit } = useFormMethods;

  function onSubmit(values: Character) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 300);
    });
  }

  return (
    <CharacterSheetViewContext.Provider value={{ isCombatView, setCombatView }}>
      <FormProvider {...useFormMethods}>
        <form
          className="msc-CharacterSheet"
          onSubmit={handleSubmit(onSubmit)}
          id="character-sheet-form"
        >
          <PersonalDetails />
          <Attributes />
          <Status />
          <Tokens />
          <Facets type={FacetType.Aspect} show={!isCombatView} />
          <Facets type={FacetType.Tactic} show={isCombatView} />
          {/* <Experiences /> */}
          {/* <CasualLoadout /> */}
          {/* <CombatLoadout /> */}
        </form>
      </FormProvider>
    </CharacterSheetViewContext.Provider>
  );
};
