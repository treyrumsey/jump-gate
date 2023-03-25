import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import ViewToggle from "webapp/modules/MythicSpaceCharacters/CharacterSheet/ViewToggle/ViewToggle";

export const PersonalDetails = () => {
  const { register } = useFormContext();

  const size = "md";
  const fontSize = "1rem";
  // const fontSize = "1.2rem";
  return (
    <div className="msc-PersonalDetails">
      <FormControl variant="floating">
        <Input id="name" placeholder="Name" {...register("name")} size={size} />
        <FormLabel htmlFor="name" fontSize={fontSize}>
          Name
        </FormLabel>
      </FormControl>
      <FormControl variant="floating">
        <Input
          id="species"
          placeholder="Species"
          {...register("species")}
          size={size}
        />
        <FormLabel htmlFor="species" fontSize={fontSize}>
          Species
        </FormLabel>
      </FormControl>
      <FormControl variant="floating">
        <Input id="ship" placeholder="Ship" {...register("ship")} size={size} />
        <FormLabel htmlFor="ship" fontSize={fontSize}>
          Ship
        </FormLabel>
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
