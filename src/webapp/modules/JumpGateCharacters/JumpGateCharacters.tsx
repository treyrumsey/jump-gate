/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CharacterSheet } from "webapp/modules/JumpGateCharacters/CharacterSheet/CharacterSheet";
import { useCharactersContext } from "webapp/modules/context/CharactersProvider";
import CharactersSidebar from "webapp/modules/JumpGateCharacters/CharactersSidebar/CharactersSidebar";
import { updateCharacterSchema } from "lib/utilities/UpdateSchema";

const JumpGateCharacters = () => {
  const { currentCharacterId, characterIds } = useCharactersContext();

  const [charactersInitialized, setCharactersInitialized] = useState(false);

  useEffect(() => {
    characterIds.forEach((id) => updateCharacterSchema(id));
    setCharactersInitialized(true);
  }, []);

  return (
    <div className="jg-JumpGateCharacters">
      <div className="container">
        <CharactersSidebar />
        {charactersInitialized && <CharacterSheet key={currentCharacterId} />}
      </div>
    </div>
  );
};

export default JumpGateCharacters;
