import React from "react";
import { Link } from "react-router-dom";

import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  Divider,
  Grid,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Spinner,
} from "@chakra-ui/react";

import { Navbar } from "~/components/ui/Navbar/Navbar";
import { Sidebar } from "~/components/ui/Sidebar/Sidebar";
import { useGamesContext } from "~/context/GamesProvider";
import { GameTile } from "~/pages/Games/GameTile";

const Games = () => {
  const {
    ownedGames,
    loadingOwned,
    joinedGames,
    loadingJoined,
    createGame,
    joinGame,
  } = useGamesContext();

  return (
    <Box>
      <Navbar />
      <Sidebar />
      <Box padding="1rem 3rem">
        <Box>
          <Heading>My Games</Heading>
          <Divider marginY="1rem" />
          <Grid
            justifyContent="center"
            templateColumns="repeat(auto-fit,minmax(325px,400px))"
            gap="1rem"
          >
            {(loadingOwned || loadingJoined) && <Spinner />}
            {ownedGames &&
              joinedGames &&
              Object.entries({ ...ownedGames, ...joinedGames }).map(
                ([id, name]) => <GameTile key={id} id={id} name={name} />
              )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Games;
