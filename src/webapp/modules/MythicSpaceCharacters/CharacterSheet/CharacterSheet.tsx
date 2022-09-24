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
import { Attributes } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Attributes/Attributes";
import { Status } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Status/Status";

export const CharacterSheet = () => {
  // const [character, setCharacter] = useState(buildCharacter());
  // const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCharacter({ ...character, name: event.target.value });
  // };

  const useFormMethods = useForm();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useFormMethods;

  const character = buildCharacter();

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <FormProvider {...useFormMethods}>
      <form className="msc-CharacterSheet" onSubmit={handleSubmit(onSubmit)}>
        <PersonalDetails />
        <Attributes />
        <Status />
        <Button type="submit">Save</Button>
      </form>
    </FormProvider>
  );
};
