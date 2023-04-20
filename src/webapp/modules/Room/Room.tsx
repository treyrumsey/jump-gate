import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, ButtonGroup, Grid, IconButton } from "@chakra-ui/react";
import { ref, onValue } from "firebase/database";
import { useDisclosureContext } from "lib/components/context/DisclosureProvider";
import { RoomModel } from "models/Room.model";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "webapp/App";
import PlayModeProvider from "webapp/modules/JumpGateCharacters/CharacterSheet/PlayModeProvider";
import ViewToggle from "webapp/modules/JumpGateCharacters/CharacterSheet/ViewToggle/ViewToggle";
import CharacterSummary from "webapp/modules/Room/CharacterSummary/CharacterSummary";
import { useAuthContext } from "webapp/modules/context/AuthProvider";

const Room = () => {
  const [user] = useAuthState(auth);
  const { userRoomId } = useAuthContext();
  const [room, setRoom] = useState<RoomModel>();

  useEffect(() => {
    const roomPath = `rooms/${userRoomId}`;
    const roomRef = ref(db, roomPath);

    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data: RoomModel = snapshot.val();
      setRoom(data);
    });

    return () => {
      unsubscribe();
    };
  }, [userRoomId]);

  const [isCombatMode, setCombatMode] = useState(false);

  return (
    <PlayModeProvider isCombatMode={isCombatMode} setCombatMode={setCombatMode}>
      <NavBar />
      <Grid
        autoFlow="column"
        gap="3rem"
        gridAutoColumns="min-content"
        justifyContent="center"
        padding="1rem"
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

export default Room;
