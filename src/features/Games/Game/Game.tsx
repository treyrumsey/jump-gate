import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Grid, Stack } from "@chakra-ui/react";
import { ref, onValue } from "firebase/database";

import { db } from "~/App";
import { Navbar } from "~/components/ui/Navbar/Navbar";
import { Sidebar } from "~/components/ui/Sidebar/Sidebar";
import PlayModeProvider from "~/context/PlayModeProvider";
import CharacterSummary from "~/features/Games/Game/CharacterSummary/CharacterSummary";
import { GameModel } from "~/models/Game.model";

const Game = () => {
  const { id: gameId } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState<GameModel>({
    characters: {},
    name: "",
    owner: "",
    players: {},
  });

  useEffect(() => {
    const ownerRef = ref(db, `games/${gameId}/owner`);
    const unsubscribeOwner = onValue(ownerRef, (snapshot) => {
      if (!snapshot.exists()) {
        navigate("/error");
      }
    });

    return () => {
      unsubscribeOwner();
    };
  }, [gameId, navigate]);

  useEffect(() => {
    const unsubscribeGame = onValue(ref(db, `games/${gameId}`), (snapshot) => {
      const snapshotGame = snapshot.val();
      setGame(snapshotGame satisfies GameModel);
    });

    return () => {
      unsubscribeGame();
    };
  }, [gameId]);

  const [isCombatMode, setCombatMode] = useState(false);

  return (
    <PlayModeProvider isCombatMode={isCombatMode} setCombatMode={setCombatMode}>
      <Grid templateRows="min-content auto" height="100dvh">
        <Navbar showModeToggle />
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
              playerName: game.players[playerId],
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
