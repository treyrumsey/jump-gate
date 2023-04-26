import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import CustomIcon, { CustomIcons } from "~/components/icons/CustomIcon";
import { useGamesContext } from "~/context/GamesProvider";

type GameTileProps = {
  id: string;
  name: string;
  isOwned?: boolean;
};

export const GameTile = ({ id, name, isOwned }: GameTileProps) => {
  const { deleteGame, leaveGame } = useGamesContext();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef(null);

  const toast = useToast();

  return (
    <>
      <LinkBox as="div" key={id}>
        <Card
          className="augmented"
          data-augmented-ui="tl-clip tr-round br-clip bl-round"
        >
          <CardBody>
            <LinkOverlay as={Link} to={id}>
              <Heading size="lg" width="100%" paddingBottom="3">
                {name}
              </Heading>
            </LinkOverlay>
            <Text
              fontSize="1rem"
              fontFamily="Oxanium"
              whiteSpace="pre"
              paddingBottom={isOwned ? 0 : "21px"}
            >
              <strong>Game ID:</strong>
              {`  ${id}`}
            </Text>
            {isOwned && (
              <Text fontStyle="italic" fontSize="sm">
                Owner
              </Text>
            )}
            <HStack justifyContent="space-between" paddingTop="2">
              <Button
                colorScheme="twitter"
                leftIcon={<CopyIcon />}
                size="sm"
                onClick={() => navigator.clipboard.writeText(id)}
              >
                Copy ID
              </Button>
              <Button
                aria-label={`Delete ${name}`}
                className="is-negative"
                leftIcon={
                  isOwned ? (
                    <DeleteIcon />
                  ) : (
                    <CustomIcon
                      fill="rgba(255, 255, 255, 0.92)"
                      icon={CustomIcons.LeaveGame}
                    />
                  )
                }
                marginStart="auto"
                size="sm"
                width="128px"
                onClick={onOpen}
              >
                {isOwned ? "Delete game" : "Leave game"}
              </Button>
            </HStack>
          </CardBody>
        </Card>
      </LinkBox>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="jg-Games__alert-dialog-content">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {`${isOwned ? "Delete" : "Leave"} ${name}`}
            </AlertDialogHeader>

            <AlertDialogBody>
              {isOwned ? (
                <p>
                  Are you sure you want delete this game?
                  <br />
                  You can't undo this action afterwards.
                </p>
              ) : (
                "Are you sure you want to leave this game?"
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <ButtonGroup>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="is-negative"
                  leftIcon={<DeleteIcon />}
                  onClick={() => {
                    isOwned ? deleteGame(id) : leaveGame(id);
                    onClose();
                    toast({
                      title: "Game deleted",
                      status: "warning",
                      isClosable: true,
                      duration: 5000,
                    });
                  }}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
