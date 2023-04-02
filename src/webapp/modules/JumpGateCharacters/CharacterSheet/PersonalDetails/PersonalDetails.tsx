import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import GeneralEditButton from "webapp/modules/JumpGateCharacters/CharacterSheet/GeneralEditor/GeneralEditButton";
import ViewToggle from "webapp/modules/JumpGateCharacters/CharacterSheet/ViewToggle/ViewToggle";

export const PersonalDetails = () => {
  const { register } = useFormContext();

  const size = "sm";
  return (
    <div className="jg-PersonalDetails">
      <FormControl variant="floating" className="jg-PersonalDetails__name">
        <Input id="name" placeholder="Name" {...register("name")} size={size} />
        <FormLabel htmlFor="name">Name</FormLabel>
      </FormControl>
      <FormControl variant="floating" className="jg-PersonalDetails__species">
        <Input
          id="species"
          placeholder="Species"
          {...register("species")}
          size={size}
        />
        <FormLabel htmlFor="species">Species</FormLabel>
      </FormControl>
      <FormControl variant="floating" className="jg-PersonalDetails__ship">
        <Input id="ship" placeholder="Ship" {...register("ship")} size={size} />
        <FormLabel htmlFor="ship">Ship</FormLabel>
      </FormControl>
      <ViewToggle />
      <GeneralEditButton />
      {/* <Button
        className="jg-CharacterSheet__save"
        type="submit"
        form="character-sheet-form"
        size="xs"
      >
        Save
      </Button> */}
      {/* <IconButton
        aria-label="refresh page"
        icon={<SpinnerIcon />}
        onClick={() => window.location.reload()}
        size="xs"
      /> */}
    </div>
  );
};
