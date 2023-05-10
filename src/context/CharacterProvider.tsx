import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Spinner } from "@chakra-ui/react";
import { get, ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "~/App";
import { Character, buildCharacter } from "~/models/Character.model";

type CharacterContextType = {
  characterId: string;
  character: Character;
};

const CharacterContext = createContext<CharacterContextType>({
  characterId: "",
  character: buildCharacter(),
});

type CharacterProviderProps = {
  children: React.ReactNode;
};

export const CharacterProvider = ({ children }: CharacterProviderProps) => {
  const [user, userLoading] = useAuthState(auth);
  const [defaultCharacterValues, setDefaultCharacterValues] =
    useState<Character>();

  const { id: characterId } = useParams();

  useEffect(() => {
    if (userLoading) return;

    if (user) {
      get(ref(db, "users/" + user.uid + "/characters/" + characterId)).then(
        (snapshot) => {
          const characterData = snapshot.val() as Character;
          setDefaultCharacterValues(characterData);
        }
      );
    } else {
      setDefaultCharacterValues(
        JSON.parse(
          localStorage.getItem(characterId ?? "") ??
            JSON.stringify(buildCharacter())
        )
      );
    }
  }, [user, userLoading, characterId]);

  if (userLoading || !defaultCharacterValues) return <Spinner />;

  return (
    <CharacterContext.Provider
      value={{
        characterId: characterId ?? "",
        character: defaultCharacterValues,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);

  if (!context) {
    throw new Error(
      `useCharacterContext must be used within a CharacterProvider`
    );
  }

  return context;
};
