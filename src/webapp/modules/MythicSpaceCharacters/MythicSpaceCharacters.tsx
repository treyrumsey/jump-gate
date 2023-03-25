import React from "react";
import { CharacterSheet } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheet";

const MythicSpaceCharacters = () => {
  return (
    <div className="msc-MythicSpaceCharacters">
      <div className="container">
        <CharacterSheet />
      </div>
    </div>
  );
};

export default MythicSpaceCharacters;
