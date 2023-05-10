/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useMediaQuery } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "~/App";
import { Navbar } from "~/components/ui/Navbar/Navbar";
import { useCharacterContext } from "~/context/CharacterProvider";
import PlayModeProvider from "~/context/PlayModeProvider";
import { Attributes } from "~/features/Character/CharacterSheet/Attributes/Attributes";
import { CharacterListener } from "~/features/Character/CharacterSheet/CharacterListener";
import Experiences from "~/features/Character/CharacterSheet/Experiences/Experiences";
import Facets from "~/features/Character/CharacterSheet/Facets/Facets";
import Loadout from "~/features/Character/CharacterSheet/Loadout/Loadout";
import { PersonalDetails } from "~/features/Character/CharacterSheet/PersonalDetails/PersonalDetails";
import { Status } from "~/features/Character/CharacterSheet/Status/Status";
import { Tokens } from "~/features/Character/CharacterSheet/Tokens/Tokens";
import { Character } from "~/models/Character.model";
import { FacetType } from "~/models/Facet.model";
import { LoadoutType } from "~/models/Loadout.model";

type CharacterSheetProps = {
  defaultValues: Character;
};

export const CharacterSheet = () => {
  const [isCombatMode, setCombatMode] = useState(false);
  const { character } = useCharacterContext();

  const useFormMethods = useForm({
    defaultValues: character,
  });

  const [isNarrowerThanTablet] = useMediaQuery("(max-width: 767px)");

  return (
    <PlayModeProvider isCombatMode={isCombatMode} setCombatMode={setCombatMode}>
      <FormProvider {...useFormMethods}>
        {isNarrowerThanTablet && <Navbar />}
        <form
          className="jg-CharacterSheet"
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
