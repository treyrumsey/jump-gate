import React from "react";
import { CharacterSheet } from "webapp/modules/JumpGateCharacters/CharacterSheet/CharacterSheet";
import { useCharactersContext } from "webapp/modules/context/CharactersProvider";
import Sidebar from "webapp/modules/Sidebar/Sidebar";

const JumpGateCharacters = () => {
  const { currentCharacterId } = useCharactersContext();

  return (
    <div className="jg-JumpGateCharacters">
      <div className="container">
        <Sidebar />
        <CharacterSheet key={currentCharacterId} />
      </div>
    </div>
  );
};

export default JumpGateCharacters;
