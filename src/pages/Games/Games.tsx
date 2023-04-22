import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Spinner,
} from "@chakra-ui/react";

import { useGamesContext } from "~/context/GamesProvider";

const Games = () => {
  const {
    ownedGames,
    loadingOwned,
    joinedGames,
    loadingJoined,
    createGame,
    joinGame,
    deleteGame,
  } = useGamesContext();

  const navigate = useNavigate();

  return (
    <Box>
      <Box>
        <Heading size="md">My Games</Heading>
        <Grid
          justifyContent="center"
          templateColumns="repeat(auto-fit,minmax(325px,400px))"
        >
          {loadingOwned && <Spinner />}
          {ownedGames &&
            Object.entries(ownedGames).map(([id, name]) => {
              return (
                <LinkBox as="div" key={id}>
                  <Card>
                    <CardBody>
                      <LinkOverlay as={Link} to={id}>
                        {name}
                      </LinkOverlay>
                      <IconButton
                        aria-label={`Delete ${name}`}
                        colorScheme="red"
                        icon={<DeleteIcon />}
                        onClick={() => deleteGame(id)}
                      />
                    </CardBody>
                  </Card>
                </LinkBox>
              );
            })}
        </Grid>
      </Box>
      <Box>
        <Heading size="md">Joined Games</Heading>
      </Box>
    </Box>
  );
};

export default Games;
