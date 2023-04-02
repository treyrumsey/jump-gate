import { Box, FormControl, Input } from "@chakra-ui/react";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { usePlayModeContext } from "webapp/modules/JumpGateCharacters/CharacterSheet/PlayModeProvider";

const getFieldPath = (index: number) => `experiences[${index}].experience`;

const Experiences = () => {
  const { isCombatMode } = usePlayModeContext();
  const { control, register } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <Box className="jg-Experiences" display={isCombatMode ? "none" : undefined}>
      {fields.map((field, index) => (
        <FormControl key={field.id}>
          <Input
            id={getFieldPath(index)}
            placeholder={`Experience ${index + 1}`}
            {...register(getFieldPath(index))}
          />
        </FormControl>
      ))}
    </Box>
  );
};

export default Experiences;
