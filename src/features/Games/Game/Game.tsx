import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, ButtonGroup, Grid, IconButton, Stack } from "@chakra-ui/react";
import { ref, onValue } from "firebase/database";

import { db } from "~/App";
import ViewToggle from "~/components/ui/ViewToggle/ViewToggle";
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
        <NavBar />
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

const NavBar = () => {
  return (
    <Box
      className="jg-NavBar"
      backdropFilter="blur(25px)"
      background="blackAlpha.600"
      display="flex"
      paddingLeft="48px"
      position="sticky"
      top="0"
      width="100%"
      zIndex="1000"
    >
      <Box
        display="flex"
        justifyContent="center"
        marginLeft="auto"
        marginRight="auto"
      >
        <ViewToggle />
      </Box>
      <ButtonGroup padding="1">
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          size="md"
          variant="ghost"
        />
      </ButtonGroup>
    </Box>
  );
};

export default Game;
