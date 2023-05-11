import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  ButtonGroup,
  Divider,
  Grid,
  HStack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "~/App";
import { LoadingSpinner } from "~/components/ui/LoadingSpinner/LoadingSpinner";
import { Navbar } from "~/components/ui/Navbar/Navbar";
import { Sidebar } from "~/components/ui/Sidebar/Sidebar";
import { useGamesContext } from "~/context/GamesProvider";
import { CreateGame } from "~/features/Games/CreateGame/CreateGame";
import { GameTile } from "~/features/Games/GameTile";
import { JoinGame } from "~/features/Games/JoinGameModal/JoinGame";

const Games = () => {
  const {
    ownedGames,
    loadingOwned,
    joinedGames, //eslint-disable-line @typescript-eslint/no-unused-vars
    loadingJoined,
    getMergedAndSortedGames,
  } = useGamesContext();

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <Box className="jg-Games">
      <Navbar />
      <Sidebar />
      <Box padding="1rem 3rem">
        <Box>
          <HStack gap="1rem" flexWrap="wrap">
            <Heading marginEnd="auto">My Games</Heading>
            <ButtonGroup margin="0 !important">
              <JoinGame />
              <CreateGame />
            </ButtonGroup>
          </HStack>
          <Divider marginY="1rem" />
          <Grid
            justifyContent="center"
            templateColumns="repeat(auto-fit,minmax(325px,375px))"
            gap="1rem"
          >
            {(loadingOwned || loadingJoined) && (
              <Flex width="100%" justifyContent="center">
                <LoadingSpinner />
              </Flex>
            )}
            {getMergedAndSortedGames().map(([id, name]) => (
              <GameTile
                key={id}
                id={id}
                name={name}
                isOwned={ownedGames?.[id] !== undefined}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Games;
