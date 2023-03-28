import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import React from "react";
import { usePlayModeContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/PlayModeProvider";

const ViewToggle = () => {
  const { setCombatMode: setCombatMode } = usePlayModeContext();

  return (
    <FormControl className="msc-ViewToggle">
      <FormLabel htmlFor="ViewToggle" mb="2px">
        Narrative
      </FormLabel>
      <Switch id="ViewToggle" onChange={() => setCombatMode((prev) => !prev)} />
      <FormLabel htmlFor="ViewToggle" ms="3" me="0" mb="2px">
        Combat
      </FormLabel>
    </FormControl>
  );
};

export default ViewToggle;
