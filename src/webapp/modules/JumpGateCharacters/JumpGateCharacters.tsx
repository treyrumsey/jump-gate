import React from "react";
import { CharacterSheet } from "webapp/modules/JumpGateCharacters/CharacterSheet/CharacterSheet";
import { useCharactersContext } from "webapp/modules/context/CharactersProvider";
import Sidebar from "webapp/modules/Sidebar/Sidebar";

const JumpGateCharacters = () => {
  const { currentCharacterId, getCharacter } = useCharactersContext();

  const character = getCharacter(currentCharacterId);

  return (
    <div className="jg-JumpGateCharacters">
      <div className="container">
        <Sidebar />
        {/* {!isOpen && ( */}
        <CharacterSheet key={character.id} character={character} />
        {/* )} */}
      </div>
    </div>
  );
};

export default JumpGateCharacters;
