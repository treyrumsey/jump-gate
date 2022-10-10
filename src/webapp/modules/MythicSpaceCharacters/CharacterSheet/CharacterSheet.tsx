import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { buildCharacter } from "models/Character.model";
import { PersonalDetails } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/PersonalDetails/PersonalDetails";
import { Aspects } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Aspects/Aspects";
import { Attributes } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Attributes/Attributes";
import { Status } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Status/Status";

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
      }, 1000);
    });
  }

  return (
    <FormProvider {...useFormMethods}>
      <form className="msc-CharacterSheet" onSubmit={handleSubmit(onSubmit)}>
        <PersonalDetails />
        <Attributes />
        <Aspects key={0} aspect="" />
        <Status />
        <Button className="msc-CharacterSheet__save" type="submit">
          Save
        </Button>
      </form>
    </FormProvider>
  );
};
