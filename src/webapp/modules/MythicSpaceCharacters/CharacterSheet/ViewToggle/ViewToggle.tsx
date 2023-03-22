import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import React from "react";
import { useCharacterSheetViewContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheetViewContext";

const ViewToggle = () => {
  const { setCombatView } = useCharacterSheetViewContext();

  return (
    <FormControl className="msc-ViewToggle">
      <FormLabel htmlFor="ViewToggle" mb="2px">
        Narrative
      </FormLabel>
      <Switch id="ViewToggle" onChange={() => setCombatView((prev) => !prev)} />
      <FormLabel htmlFor="ViewToggle" ms="3" me="0" mb="2px">
        Combat
      </FormLabel>
    </FormControl>
  );
};

export default ViewToggle;
