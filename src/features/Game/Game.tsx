import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, Stack } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "~/App";
import { Navbar } from "~/components/ui/Navbar/Navbar";
import { Sidebar } from "~/components/ui/Sidebar/Sidebar";
import CharactersProvider from "~/context/CharactersProvider";
import { useGameContext } from "~/context/GameProvider";
import PlayModeProvider from "~/context/PlayModeProvider";
import { AddCharacterButton } from "~/features/Game/AddCharacter/AddCharacterButton";
import CharacterSummary from "~/features/Game/CharacterSummary/CharacterSummary";

const Game = () => {
  const { game } = useGameContext();

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [isCombatMode, setCombatMode] = useState(false);

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <PlayModeProvider isCombatMode={isCombatMode} setCombatMode={setCombatMode}>
      <Grid templateRows="min-content auto" height="100dvh">
        <Navbar
          leftButton={
            <CharactersProvider>
              <AddCharacterButton />
            </CharactersProvider>
          }
          showModeToggle
        />
        <Sidebar />
        <Stack
          direction="row"
          gap="1.5rem"
          wrap="wrap"
          justifyContent="center"
          padding="1rem"
          alignSelf="center"
        >
          {Object.entries(game.characters)
            .map(([characterId, playerId]) => ({
              characterId,
              playerId,
              playerName:
                playerId === game.owner
                  ? game.ownerName
                  : game.players[playerId],
            }))
            .map((summaryProps) => (
              <CharacterSummary
                key={summaryProps.characterId}
                {...summaryProps}
              />
            ))}
        </Stack>
      </Grid>
    </PlayModeProvider>
  );
};

export default Game;
