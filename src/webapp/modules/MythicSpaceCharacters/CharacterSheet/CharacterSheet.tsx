import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import { buildCharacter } from "models/Character.model";
import { PersonalDetails } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/PersonalDetails/PersonalDetails";
import { Facets } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Facets/Facets";
import { Attributes } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Attributes/Attributes";
import { Status } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Status/Status";
import { Tokens } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Tokens/Tokens";
import { FacetType } from "models/Facet.model";

export const CharacterSheet = () => {
  // const [character, setCharacter] = useState(buildCharacter());
  // const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCharacter({ ...character, name: event.target.value });
  // };

  const character = buildCharacter();

  const useFormMethods = useForm({
    defaultValues: character,
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useFormMethods;

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 300);
    });
  }

  return (
    <FormProvider {...useFormMethods}>
      <form className="msc-CharacterSheet" onSubmit={handleSubmit(onSubmit)}>
        <PersonalDetails />
        <Attributes />
        <Facets type={FacetType.Aspect} />
        <Status />
        <Tokens />
        <Button className="msc-CharacterSheet__save" type="submit">
          Save
        </Button>
      </form>
    </FormProvider>
  );
};
