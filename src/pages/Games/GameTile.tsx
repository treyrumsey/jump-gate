import React from "react";
import { Link } from "react-router-dom";

import { DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

import { useGamesContext } from "~/context/GamesProvider";

type GameTileProps = {
  id: string;
  name: string;
};

export const GameTile = ({ id, name }: GameTileProps) => {
  const { deleteGame } = useGamesContext();
  return (
    <LinkBox as="div" key={id}>
      <Card>
        <CardBody>
          <LinkOverlay as={Link} to={id}>
            <Heading size="lg" width="100%">
              {name}
            </Heading>
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
};
