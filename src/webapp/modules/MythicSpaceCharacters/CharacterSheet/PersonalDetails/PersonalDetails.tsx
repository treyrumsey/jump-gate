import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface PersonalDetailsProps {
  characterName: string;
  species: string;
  ship: string;
}

export const PersonalDetails = () => {
  const { register } = useFormContext();

  return (
    <Box className="msc-PersonalDetails">
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
