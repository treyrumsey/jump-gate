import { Character, buildCharacter } from "models/Character.model";
import React from "react";
import { CharacterSheet } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheet";

const MythicSpaceCharacters = () => {
  const characterJSON = localStorage.getItem("character");
  const character = characterJSON
    ? (JSON.parse(characterJSON) as Character)
    : buildCharacter();

  return (
    <div className="msc-MythicSpaceCharacters">
      <div className="container">
        <CharacterSheet character={character} />
      </div>
    </div>
  );
};

export default MythicSpaceCharacters;
