import React, { createContext, useContext, useState } from "react";

import { generateUUID } from "~/lib/utilities/GenerateUUID";
import { Character, buildCharacter } from "~/models/Character.model";

type CharactersContextType = {
  characterIds: string[];
  currentCharacterId: string;
  addCharacter: (character?: Character) => void;
  deleteCharacter: (id: string) => void;
  getCharacterIdsAndNames: () => { id: string; name: string }[];
  getCharacters: () => Character[];
  getCurrentCharacter: () => Character;
  switchCharacter: (id: string) => void;
  updateLocalCharacter: (character: Character) => void;
  updateStateOnWindowFocus: () => void;
};

const CharactersContext = createContext<CharactersContextType>({
  characterIds: [],
  currentCharacterId: "",
  addCharacter: () => null,
  deleteCharacter: () => null,
  getCharacterIdsAndNames: () => [],
  getCharacters: () => [],
  getCurrentCharacter: () => buildCharacter(),
  switchCharacter: () => null,
  updateLocalCharacter: () => null,
  updateStateOnWindowFocus: () => null,
});

type CharactersProviderProps = {
  children: React.ReactNode;
};

const CharactersProvider = ({ children }: CharactersProviderProps) => {
  const initialId =
    localStorage.getItem("currentCharacterId") ?? generateUUID();

  if (localStorage.getItem("currentCharacterId") === null)
    localStorage.setItem("currentCharacterId", initialId);

  if (localStorage.getItem("characterIds") === null)
    localStorage.setItem("characterIds", JSON.stringify([initialId]));

  if (localStorage.getItem(initialId) === null)
    localStorage.setItem(initialId, JSON.stringify(buildCharacter(initialId)));

  const [characterIds, setCharacterIds] = useState<string[]>(
    JSON.parse(localStorage.getItem("characterIds") ?? "[]")
  );
  const [currentCharacterId, setCurrentCharacterId] = useState(initialId);

  const addCharacter = (character?: Character) => {
    const newCharacter = buildCharacter();
    if (character) {
      Object.keys(character)
        .filter((key) => key !== "id")
        .forEach((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          newCharacter[key] = character[key];
        });
    }
    const newCharacterIds = [newCharacter.id, ...characterIds];

    localStorage.setItem(newCharacter.id, JSON.stringify(newCharacter));
    localStorage.setItem("currentCharacterId", newCharacter.id);
    localStorage.setItem("characterIds", JSON.stringify(newCharacterIds));
    setCharacterIds(newCharacterIds);
    setCurrentCharacterId(newCharacter.id);
  };

  const updateLocalCharacter = (character: Character) => {
    if (!characterIds.includes(character.id)) {
      const newCharacterIds = [character.id, ...characterIds];
      localStorage.setItem("characterIds", JSON.stringify(newCharacterIds));
      setCharacterIds(newCharacterIds);
    }
    localStorage.setItem(character.id, JSON.stringify(character));
  };

  const switchCharacter = (id: string) => {
    localStorage.setItem("currentCharacterId", id);
    setCurrentCharacterId(id);
  };

  const getCharacterIdsAndNames = () => {
    return characterIds.map((id) => {
      const character = JSON.parse(localStorage.getItem(id) ?? "{}");
      return { id, name: character.name };
    });
  };

  const getCharacters = () => {
    return characterIds.map((id) => {
      return JSON.parse(localStorage.getItem(id) ?? "{}");
    });
  };

  const getCurrentCharacter = (): Character => {
    return JSON.parse(localStorage.getItem(currentCharacterId) ?? "{}");
  };

  const deleteCharacter = (id: string) => {
    const newIds = characterIds.filter((characterId) => characterId !== id);

    if (newIds.length === 0) {
      const newCharacter = buildCharacter();
      newIds.push(newCharacter.id);
      localStorage.setItem(newCharacter.id, JSON.stringify(newCharacter));
    }

    if (currentCharacterId === id) {
      switchCharacter(newIds[0]);
    }

    localStorage.removeItem(id);
    localStorage.setItem("characterIds", JSON.stringify(newIds));
    setCharacterIds(newIds);
  };

  const updateStateOnWindowFocus = () => {
    setCurrentCharacterId(localStorage.getItem("currentCharacterId") ?? "");
    setCharacterIds(JSON.parse(localStorage.getItem("characterIds") ?? "[]"));
  };

  return (
    <CharactersContext.Provider
      value={{
        characterIds,
        currentCharacterId,
        addCharacter,
        deleteCharacter,
        switchCharacter,
        getCharacterIdsAndNames,
        getCharacters,
        getCurrentCharacter,
        updateLocalCharacter,
        updateStateOnWindowFocus,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};

export const useCharactersContext = () => {
  const context = useContext(CharactersContext);

  if (!context) {
    throw new Error(
      `useCharactersContext must be used within a CharactersProvider`
    );
  }

  return context;
};

export default CharactersProvider;
