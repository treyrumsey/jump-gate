import { Character, buildCharacter } from "models/Character.model";
import React, { createContext, useContext, useState } from "react";

type CharactersContextType = {
  characterIds: string[];
  currentCharacterId: string;
  addCharacter: () => void;
  deleteCharacter: (id: string) => void;
  getCharacterIdsAndNames: () => { id: string; name: string }[];
  getCurrentCharacter: () => Character;
  switchCharacter: (id: string) => void;
  updateStateOnWindowFocus: () => void;
};

export const CharactersContext = createContext<CharactersContextType>({
  characterIds: [],
  currentCharacterId: "",
  addCharacter: () => null,
  deleteCharacter: () => null,
  getCharacterIdsAndNames: () => [],
  getCurrentCharacter: () => buildCharacter(""),
  switchCharacter: () => null,
  updateStateOnWindowFocus: () => null,
});

type CharactersProviderProps = {
  children: React.ReactNode;
};

const CharactersProvider = ({ children }: CharactersProviderProps) => {
  const initialId =
    localStorage.getItem("currentCharacterId") ?? crypto.randomUUID();

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

  const addCharacter = () => {
    const newCharacter = buildCharacter(crypto.randomUUID());
    const newCharacterIds = [newCharacter.id, ...characterIds];

    localStorage.setItem(newCharacter.id, JSON.stringify(newCharacter));
    localStorage.setItem("currentCharacterId", newCharacter.id);
    localStorage.setItem("characterIds", JSON.stringify(newCharacterIds));
    setCharacterIds(newCharacterIds);
    setCurrentCharacterId(newCharacter.id);
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

  const getCurrentCharacter = (): Character => {
    return JSON.parse(localStorage.getItem(currentCharacterId) ?? "{}");
  };

  const deleteCharacter = (id: string) => {
    const newIds = characterIds.filter((characterId) => characterId !== id);

    if (newIds.length === 0) {
      const newCharacter = buildCharacter(crypto.randomUUID());
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
        getCurrentCharacter,
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
