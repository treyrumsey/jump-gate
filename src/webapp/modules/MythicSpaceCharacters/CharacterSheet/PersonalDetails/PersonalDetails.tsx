import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import ViewToggle from "webapp/modules/MythicSpaceCharacters/CharacterSheet/ViewToggle/ViewToggle";

export const PersonalDetails = () => {
  const { register } = useFormContext();

  const size = "sm";
  // const fontSize = "1.2rem";
  return (
    <div className="msc-PersonalDetails">
      <FormControl variant="floating" className="msc-PersonalDetails__name">
        <Input id="name" placeholder="Name" {...register("name")} size={size} />
        <FormLabel htmlFor="name">Name</FormLabel>
      </FormControl>
      <FormControl variant="floating" className="msc-PersonalDetails__species">
        <Input
          id="species"
          placeholder="Species"
          {...register("species")}
          size={size}
        />
        <FormLabel htmlFor="species">Species</FormLabel>
      </FormControl>
      <FormControl variant="floating" className="msc-PersonalDetails__ship">
        <Input id="ship" placeholder="Ship" {...register("ship")} size={size} />
        <FormLabel htmlFor="ship">Ship</FormLabel>
      </FormControl>
      <ViewToggle />
      <Button
        className="msc-CharacterSheet__save"
        type="submit"
        form="character-sheet-form"
        size="xs"
      >
        Save
      </Button>
      {/* <IconButton
        aria-label="refresh page"
        icon={<SpinnerIcon />}
        onClick={() => window.location.reload()}
        size="xs"
      /> */}
    </div>
  );
};
