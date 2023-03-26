import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Character, mockCharacter } from "models/Character.model";
import { PersonalDetails } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/PersonalDetails/PersonalDetails";
import Facets from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Facets/Facets";
import { Attributes } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Attributes/Attributes";
import { Status } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Status/Status";
import { Tokens } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Tokens/Tokens";
import { FacetType } from "models/Facet.model";
import { CharacterSheetViewContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheetViewContext";
import CasualLoadout from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadouts/CasualLoadout/CasualLoadout";
import CombatLoadout from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadouts/CombatLoadout/CombatLoadout";
import Experiences from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Experiences/Experiences";

export const CharacterSheet = () => {
  const [isCombatView, setCombatView] = useState(false);

  const character = mockCharacter();

  const useFormMethods = useForm({
    defaultValues: character,
  });
  const { handleSubmit } = useFormMethods;

  function onSubmit(values: Character) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // alert(JSON.stringify(values, null, 2));
        console.log({ ...values });
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
          autoComplete="off"
        >
          <PersonalDetails />
          <Attributes />
          <div className="msc-CharacterSheet__grombles">
            <Tokens />
            <Experiences />
          </div>
          <div className="msc-CharacterSheet__dingus">
            <Status />
            <CasualLoadout />
            <CombatLoadout />
            <Facets type={FacetType.Aspect} show={!isCombatView} />
            <Facets type={FacetType.Tactic} show={isCombatView} />
          </div>
        </form>
      </FormProvider>
    </CharacterSheetViewContext.Provider>
  );
};
