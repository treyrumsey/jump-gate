import { Character, buildCharacter } from "models/Character.model";
import React from "react";
import { CharacterSheet } from "webapp/modules/JumpGateCharacters/CharacterSheet/CharacterSheet";

const JumpGateCharacters = () => {
  const characterJSON = localStorage.getItem("character");
  const character = characterJSON
    ? (JSON.parse(characterJSON) as Character)
    : buildCharacter();

  return (
    <div className="jg-JumpGateCharacters">
      <div className="container">
        <CharacterSheet character={character} />
      </div>
    </div>
  );
};

export default JumpGateCharacters;
