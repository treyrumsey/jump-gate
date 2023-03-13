import { Box, FormControl, FormLabel, Input, Switch } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useCharacterSheetViewContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheetViewContext";

export const PersonalDetails = () => {
  const { register } = useFormContext();
  const { setCombatView } = useCharacterSheetViewContext();

  return (
    <Box className="msc-PersonalDetails">
      <FormControl className="characterSheetViewToggle">
        <FormLabel htmlFor="characterSheetViewToggle" mb="2px">
          Narrative
        </FormLabel>
        <Switch
          id="characterSheetViewToggle"
          onChange={() => setCombatView((prev) => !prev)}
        />
        <FormLabel htmlFor="characterSheetViewToggle" ms="3" me="0" mb="2px">
          Combat
        </FormLabel>
      </FormControl>
      <FormControl variant="floating">
        <Input id="name" placeholder="Name" {...register("name")} />
        <FormLabel htmlFor="name">Name</FormLabel>
      </FormControl>
      <FormControl variant="floating">
        <Input id="species" placeholder="Species" {...register("species")} />
        <FormLabel htmlFor="species">Species</FormLabel>
      </FormControl>
      <FormControl variant="floating">
        <Input id="ship" placeholder="Ship" {...register("ship")} />
        <FormLabel htmlFor="ship">Ship</FormLabel>
      </FormControl>
    </Box>
  );
};
