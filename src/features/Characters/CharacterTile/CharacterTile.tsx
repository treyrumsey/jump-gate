import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";
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
import { ref, remove } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "~/App";
import { Character } from "~/models/Character.model";

type CharacterTileProps = {
  character: Character;
  handleStorage: () => void;
};

export const CharacterTile = ({
  character,
  handleStorage,
}: CharacterTileProps) => {
  const [user] = useAuthState(auth);
  const { id, name, species } = character;

  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef(null);

  const toast = useToast();

  const handleDelete = async () => {
    if (user) {
      await remove(ref(db, `users/${user.uid}/characters/${id}`));
    } else {
      localStorage.removeItem(id);
      const characterIds: string[] = JSON.parse(
        localStorage.getItem("characterIds") ?? "[]"
      );
      localStorage.setItem(
        "characterIds",
        JSON.stringify(characterIds.filter((characterId) => characterId !== id))
      );
      handleStorage();
    }
    onClose();
    toast({
      title: "Character deleted",
      status: "warning",
      isClosable: true,
      duration: 5000,
    });
  };

  const handleExportCharacter = () => {
    const fileData = JSON.stringify(character);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${scrubFilename(character.name)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <LinkBox as="div" key={id}>
        <Card
          className="augmented"
          data-augmented-ui="tl-clip tr-round br-clip bl-round"
        >
          <CardBody>
            <LinkOverlay as={Link} to={id}>
              <Heading size="lg" width="100%">
                {name.length > 0 ? name : "New Character"}
              </Heading>
            </LinkOverlay>
            <Text
              fontSize="1rem"
              fontFamily="Oxanium"
              paddingBottom="3"
              whiteSpace="pre"
            >
              {species.length > 0 ? species : "Species Unknown"}
            </Text>
            <HStack justifyContent="space-between" paddingTop="2">
              <Button
                colorScheme="twitter"
                leftIcon={<DownloadIcon />}
                size="sm"
                onClick={handleExportCharacter}
              >
                Export
              </Button>
              <Button
                aria-label={`Delete ${name}`}
                className="is-negative"
                leftIcon={<DeleteIcon />}
                marginStart="auto"
                size="sm"
                width="128px"
                onClick={onOpen}
              >
                Delete
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
              {`Delete ${name}`}
            </AlertDialogHeader>
            <AlertDialogBody>
              <p>
                Are you sure you want delete this character?
                <br />
                You can't undo this action afterwards.
              </p>
            </AlertDialogBody>
            <AlertDialogFooter>
              <ButtonGroup>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="is-negative"
                  leftIcon={<DeleteIcon />}
                  onClick={handleDelete}
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

const scrubFilename = (filename: string): string => {
  const illegalCharacters = /[\/\?<>\\:\*\|"]/g; // eslint-disable-line no-useless-escape
  const controlCharacters = /[\x00-\x1f\x7f]/g; // eslint-disable-line no-control-regex
  const reservedNames = /^(con|prn|aux|nul|com\d|lpt\d)$/i;

  const scrubbedFilename = filename
    .replace(illegalCharacters, "")
    .replace(controlCharacters, "")
    .trim();

  return reservedNames.test(scrubbedFilename)
    ? `_${scrubbedFilename}`
    : scrubbedFilename;
};
