import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Box, Button, VStack } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "~/App";
import { useCharactersContext } from "~/context/CharactersProvider";
import DeleteCharacterButton from "~/features/Characters/CharacterSheet/CharacterModal/DataTabPanel/DeleteCharacterButton";

type DataTabPanelContentsProps = {
  onCharacterModalClose: () => void;
  isCharacterModalOpen?: boolean;
};

const DataTabPanelContents = ({
  isCharacterModalOpen,
  onCharacterModalClose,
}: DataTabPanelContentsProps) => {
  const { getCurrentCharacter } = useCharactersContext();
  const [user] = useAuthState(auth);
  const { setValue } = useFormContext();

  const handleExportCharacter = () => {
    const character = getCurrentCharacter();

    const fileData = JSON.stringify(getCurrentCharacter());
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${scrubFilename(character.name)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const syncedWatch = useWatch({
    name: "isSynced",
    defaultValue: getCurrentCharacter().isSynced,
  });

  return (
    <VStack>
      {isCharacterModalOpen && user && (
        <Box marginBottom="2rem">
          {!syncedWatch ? (
            <Button width="14rem" onClick={() => setValue("isSynced", true)}>
              Add to Game Roster
            </Button>
          ) : (
            <Button width="14rem" onClick={() => setValue("isSynced", false)}>
              Remove from Game Roster
            </Button>
          )}
        </Box>
      )}
      <Button width="14rem" onClick={handleExportCharacter}>
        Export Character
      </Button>
      <DeleteCharacterButton onCharacterModalClose={onCharacterModalClose} />
    </VStack>
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

export default DataTabPanelContents;
