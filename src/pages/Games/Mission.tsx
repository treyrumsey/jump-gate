import React, { useEffect, useState } from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, ButtonGroup, Grid, IconButton, Stack } from "@chakra-ui/react";
import { ref, onValue } from "firebase/database";

import { db } from "~/App";
import ViewToggle from "~/components/ui/ViewToggle/ViewToggle";
import { useAuthContext } from "~/context/AuthProvider";
import PlayModeProvider from "~/context/PlayModeProvider";
import CharacterSummary from "~/features/Mission/CharacterSummary/CharacterSummary";
import { GameModel } from "~/models/Game.model";

const Mission = () => {
  const { userRoomId } = useAuthContext();
  const [room, setRoom] = useState<GameModel>();

  useEffect(() => {
    const roomPath = `rooms/${userRoomId}`;
    const roomRef = ref(db, roomPath);

    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data: GameModel = snapshot.val();
      setRoom(data);
    });

    return () => {
      unsubscribe();
    };
  }, [userRoomId]);

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
          {room &&
            Object.values(room.players)
              .flatMap((player) =>
                Object.values(player.characters).map((summary, index) => ({
                  index,
                  playerName: player.displayName,
                  summary: summary,
                }))
              )
              .map((summaryProps) => (
                <CharacterSummary
                  key={summaryProps.summary.id}
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

export default Mission;
