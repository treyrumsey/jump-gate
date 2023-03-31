import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Character, mockCharacter } from "models/Character.model";
import { PersonalDetails } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/PersonalDetails/PersonalDetails";
import Facets from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Facets/Facets";
import { Attributes } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Attributes/Attributes";
import { Status } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Status/Status";
import { Tokens } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Tokens/Tokens";
import { FacetType } from "models/Facet.model";
import PlayModeProvider from "webapp/modules/MythicSpaceCharacters/CharacterSheet/PlayModeProvider";
import Loadout from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadout/Loadout";
import Experiences from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Experiences/Experiences";
import { LoadoutType } from "models/Loadout.model";
import { Flex } from "@chakra-ui/react";

export const CharacterSheet = () => {
  const [isCombatMode, setCombatMode] = useState(false);

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
    <PlayModeProvider isCombatMode={isCombatMode} setCombatMode={setCombatMode}>
      <FormProvider {...useFormMethods}>
        <form
          className="msc-CharacterSheet"
          onSubmit={handleSubmit(onSubmit)}
          id="character-sheet-form"
          autoComplete="off"
        >
          <PersonalDetails />
          {/* <Flex direction="row"> */}
          <div className="msc-CharacterSheet__area2">
            <Attributes />
            <Tokens />
            <Experiences />
          </div>
          <div className="msc-CharacterSheet__area3">
            <Status />
            <Loadout type={LoadoutType.Casual} show={!isCombatMode} />
            <Loadout type={LoadoutType.Combat} show={isCombatMode} />
            <Facets type={FacetType.Aspect} show={!isCombatMode} />
            <Facets type={FacetType.Tactic} show={isCombatMode} />
          </div>
          {/* </Flex> */}
        </form>
      </FormProvider>
    </PlayModeProvider>
  );
};
