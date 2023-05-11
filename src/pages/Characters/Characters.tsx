import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { onValue, ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "~/App";
import { LoadingSpinner } from "~/components/ui/LoadingSpinner/LoadingSpinner";
import { Navbar } from "~/components/ui/Navbar/Navbar";
import { Sidebar } from "~/components/ui/Sidebar/Sidebar";
import { CharacterTile } from "~/features/Characters/CharacterTile/CharacterTile";
import { generateUUID } from "~/lib/utilities/GenerateUUID";
import { Character, buildCharacter } from "~/models/Character.model";

type CharactersData = {
  [id: string]: Character;
};

const Characters = () => {
  const [user, userLoading] = useAuthState(auth);
  const [characters, setCharacters] = useState<CharactersData>();
  const [importedCharacterData, setImportedCharacterData] =
    useState<Character | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (userLoading || !user) return;

    const charactersRef = ref(db, "users/" + user.uid + "/characters");
    const unsubscribeCharacters = onValue(charactersRef, (snapshot) => {
      const charactersData = snapshot.val();
      setCharacters(charactersData);
    });

    return () => {
      unsubscribeCharacters();
    };
  }, [user, userLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStorage = () => {
    const characterIds: string[] = JSON.parse(
      localStorage.getItem("characterIds" ?? "") ?? "[]"
    );
    const charactersData: CharactersData = {};
    characterIds.forEach((characterId) => {
      const character = JSON.parse(
        localStorage.getItem(characterId ?? "") ??
          JSON.stringify(buildCharacter())
      );
      charactersData[characterId] = character;
    });
    setCharacters(charactersData);
  };

  useEffect(() => {
    if (userLoading || user) return;

    if (!characters) handleStorage();

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [user, userLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const addCharacter = async (newCharacter: Character) => {
    if (user) {
      await set(
        ref(db, `users/${user.uid}/characters/${newCharacter.id}`),
        newCharacter
      );
    } else {
      localStorage.setItem(newCharacter.id, JSON.stringify(newCharacter));
      const characterIds: string[] = JSON.parse(
        localStorage.getItem("characterIds" ?? "") ?? "[]"
      );
      characterIds.push(newCharacter.id);
      localStorage.setItem("characterIds", JSON.stringify(characterIds));
      handleStorage();
    }
    return newCharacter;
  };

  const handleNewCharacter = async () => {
    const newCharacter = await addCharacter(buildCharacter());
    navigate(newCharacter.id);
  };

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const contents = reader.result?.toString();
        if (contents) {
          try {
            const parsedData = JSON.parse(contents);
            setImportedCharacterData({ ...parsedData, id: generateUUID() });
          } catch (error) {
            console.error("Error parsing JSON file:", error);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    if (importedCharacterData) {
      addCharacter(importedCharacterData).then((newCharacter) =>
        navigate(newCharacter.id)
      );
    }
  }, [importedCharacterData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box className="jg-CharactersNew">
      <Navbar />
      <Sidebar />
      <Box padding="1rem 3rem">
        <Box>
          <HStack gap="1rem" flexWrap="wrap">
            <Heading marginEnd="auto">My Characters</Heading>
            <ButtonGroup margin="0 !important">
              <Button
                className="is-positive"
                leftIcon={<AddIcon />}
                onClick={handleNewCharacter}
              >
                New Character
              </Button>
              <Button as="label" htmlFor="import-character-file-input">
                Import
              </Button>
              <input
                id="import-character-file-input"
                type="file"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
            </ButtonGroup>
          </HStack>
          <Divider marginY="1rem" />
          <Grid
            justifyContent="center"
            templateColumns="repeat(auto-fit,minmax(325px,375px))"
            gap="1rem"
          >
            {userLoading && (
              <Box
                display="flex"
                width="100%"
                alignItems="center"
                justifyContent="center"
              >
                <LoadingSpinner />
              </Box>
            )}
            {characters &&
              Object.values(characters).map((character) => (
                <CharacterTile
                  key={character.id}
                  character={character}
                  handleStorage={handleStorage}
                />
              ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Characters;
