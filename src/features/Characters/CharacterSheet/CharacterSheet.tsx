/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useMediaQuery } from "@chakra-ui/react";

import { Navbar } from "~/components/ui/Navbar/Navbar";
import { useCharactersContext } from "~/context/CharactersProvider";
import PlayModeProvider from "~/context/PlayModeProvider";
import { Attributes } from "~/features/Characters/CharacterSheet/Attributes/Attributes";
import CharacterListener from "~/features/Characters/CharacterSheet/CharacterListener";
import Experiences from "~/features/Characters/CharacterSheet/Experiences/Experiences";
import Facets from "~/features/Characters/CharacterSheet/Facets/Facets";
import Loadout from "~/features/Characters/CharacterSheet/Loadout/Loadout";
import { PersonalDetails } from "~/features/Characters/CharacterSheet/PersonalDetails/PersonalDetails";
import { Status } from "~/features/Characters/CharacterSheet/Status/Status";
import { Tokens } from "~/features/Characters/CharacterSheet/Tokens/Tokens";
import { Character } from "~/models/Character.model";
import { FacetType } from "~/models/Facet.model";
import { LoadoutType } from "~/models/Loadout.model";

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
        {isNarrowerThanTablet && <Navbar />}
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
