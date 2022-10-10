import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { NumberField } from "lib/components/forms/NumberField/NumberField";
import React from "react";
import { useFormContext } from "react-hook-form";

export const Status = () => {
  const { register, control } = useFormContext();

  return (
    <Box className="msc-Status">
      {/* <InputGroup className="msc-Status__shields"> */}
      <FormControl className="msc-Status__shields">
        {/* <span className="msc-Status__shields-label">Shields</span> */}
        <NumberField
          id="shields.current"
          name="shields.current"
          rules={{ min: 0, max: 8 }}
          defaultValue={8}
          control={control}
          size="lg"
        />
        <FormLabel htmlFor="shields.current">Shields</FormLabel>
      </FormControl>
      {/* </InputGroup> */}

      <FormControl variant="floating" className="msc-Status__armor">
        <NumberField
          id="armor.current"
          name="armor.current"
          rules={{ min: 0, max: 4 }}
          defaultValue={4}
          control={control}
          size="lg"
        />
        <FormLabel htmlFor="armor.current">Armor</FormLabel>
      </FormControl>
    </Box>
  );
};
