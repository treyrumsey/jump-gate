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
import DisclosureProvider from "lib/components/context/DisclosureProvider";
import GeneralEditor from "webapp/modules/JumpGateCharacters/CharacterSheet/GeneralEditor/GeneralEditor";
import { Status } from "webapp/modules/JumpGateCharacters/CharacterSheet/Status/Status";
import { useDisclosure } from "@chakra-ui/react";

interface CharacterSheetProps {
  character: Character;
}

export const CharacterSheet = ({ character }: CharacterSheetProps) => {
  const [isCombatMode, setCombatMode] = useState(false);

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

  const {
    isOpen: isGeneralEditorOpen,
    onOpen: onGeneralEditorOpen,
    onClose: onGeneralEditorClose,
  } = useDisclosure();

  return (
    <DisclosureProvider>
      <PlayModeProvider
        isCombatMode={isCombatMode}
        setCombatMode={setCombatMode}
      >
        <FormProvider {...useFormMethods}>
          <form
            className="jg-CharacterSheet"
            onSubmit={handleSubmit(onSubmit)}
            id="character-sheet-form"
            autoComplete="off"
          >
            <CharacterListener />
            <PersonalDetails onGeneralEditorOpen={onGeneralEditorOpen} />
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
            <GeneralEditor
              isOpen={isGeneralEditorOpen}
              onClose={onGeneralEditorClose}
            />
          </form>
        </FormProvider>
      </PlayModeProvider>
    </DisclosureProvider>
  );
};
