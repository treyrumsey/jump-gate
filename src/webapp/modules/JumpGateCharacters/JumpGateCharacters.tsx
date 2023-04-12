/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CharacterSheet } from "webapp/modules/JumpGateCharacters/CharacterSheet/CharacterSheet";
import { useCharactersContext } from "webapp/modules/context/CharactersProvider";
import Sidebar from "webapp/modules/Sidebar/Sidebar";
import { Character } from "models/Character.model";

const initializeCharacter = (id: string) => {
  if (!localStorage[id]) return;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const character: Character = JSON.parse(localStorage.getItem(id)!);

  if (!character.schemaVersion) {
    character.tiers = {
      armory: 1,
      arsenal: 1,
    };
    character.status.casual = {
      shields: { current: 4, max: 4 },
      armor: { current: 2, max: 2 },
      mp: { current: 0, max: 0 },
    };
    character.status.combat = {
      shields: { current: 8, max: 8 },
      armor: { current: 4, max: 4 },
      mp: { current: 0, max: 0 },
    };
    character.schemaVersion = 1;
  }

  localStorage.setItem(id, JSON.stringify(character));
};

const JumpGateCharacters = () => {
  const { currentCharacterId, characterIds } = useCharactersContext();

  const [charactersInitialized, setCharactersInitialized] = useState(false);

  useEffect(() => {
    characterIds.forEach((id) => initializeCharacter(id));
    setCharactersInitialized(true);
  }, []);

  return (
    <div className="jg-JumpGateCharacters">
      <div className="container">
        <Sidebar />
        {charactersInitialized && <CharacterSheet key={currentCharacterId} />}
      </div>
    </div>
  );
};

export default JumpGateCharacters;
