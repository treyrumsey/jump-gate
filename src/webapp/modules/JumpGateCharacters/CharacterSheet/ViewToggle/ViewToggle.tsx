import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import React from "react";
import { usePlayModeContext } from "webapp/modules/JumpGateCharacters/CharacterSheet/PlayModeProvider";

const ViewToggle = () => {
  const { setCombatMode } = usePlayModeContext();

  return (
    <FormControl
      className="jg-ViewToggle"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <FormLabel htmlFor="ViewToggle" mb="2px" width="58px" textAlign="right">
        Casual
      </FormLabel>
      <Switch id="ViewToggle" onChange={() => setCombatMode((prev) => !prev)} />
      <FormLabel htmlFor="ViewToggle" ms="3" me="0" mb="2px" width="58px">
        Combat
      </FormLabel>
    </FormControl>
  );
};

export default ViewToggle;
