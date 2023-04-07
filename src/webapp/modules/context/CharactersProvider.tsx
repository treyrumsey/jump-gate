import { Character, buildCharacter } from "models/Character.model";
import React, { createContext, useContext, useState } from "react";

type CharactersContextType = {
  characterIds: string[];
  currentCharacterId: string;
  addCharacter: () => void;
  deleteCharacter: (id: string) => void;
  getCharacterIdsAndNames: () => { id: string; name: string }[];
  getCharacter: (id: string) => Character;
  switchCharacter: (id: string) => void;
};

export const CharactersContext = createContext<CharactersContextType>({
  characterIds: [],
  currentCharacterId: "",
  addCharacter: () => null,
  deleteCharacter: () => null,
  getCharacterIdsAndNames: () => [],
  getCharacter: () => buildCharacter(""),
  switchCharacter: () => null,
});

type CharactersProviderProps = {
  children: React.ReactNode;
};

const CharactersProvider = ({ children }: CharactersProviderProps) => {
  const id = localStorage.getItem("currentCharacterId") ?? crypto.randomUUID();

  if (!localStorage.getItem("currentCharacterId"))
    localStorage.setItem("currentCharacterId", id);

  if (!localStorage.getItem("characterIds"))
    localStorage.setItem("characterIds", JSON.stringify([id]));

  if (!localStorage.getItem(id))
    localStorage.setItem(id, JSON.stringify(buildCharacter(id)));

  const [characterIds, setCharacterIds] = useState<string[]>(
    JSON.parse(localStorage.getItem("characterIds") ?? "[]")
  );
  const [currentCharacterId, setCurrentCharacterId] = useState(id);

  const addCharacter = () => {
    const newCharacter = buildCharacter(crypto.randomUUID());
    const newCharacterIds = [newCharacter.id, ...characterIds];

    localStorage.setItem(newCharacter.id, JSON.stringify(newCharacter));
    localStorage.setItem("currentCharacterId", newCharacter.id);
    localStorage.setItem("characterIds", JSON.stringify(newCharacterIds));
    console.log("addCharacter", newCharacterIds);
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

  const getCharacter = (id: string): Character => {
    return JSON.parse(localStorage.getItem(id) ?? "{}");
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

  return (
    <CharactersContext.Provider
      value={{
        characterIds,
        currentCharacterId,
        addCharacter,
        deleteCharacter,
        switchCharacter,
        getCharacterIdsAndNames,
        getCharacter,
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
