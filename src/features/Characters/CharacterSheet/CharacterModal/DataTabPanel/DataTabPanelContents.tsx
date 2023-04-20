import React from "react";

import { Button, VStack } from "@chakra-ui/react";

import { useCharactersContext } from "~/context/CharactersProvider";
import DeleteCharacterButton from "~/features/Characters/CharacterSheet/CharacterModal/DataTabPanel/DeleteCharacterButton";

type DataTabPanelContentsProps = {
  onCharacterModalClose: () => void;
};

const DataTabPanelContents = ({
  onCharacterModalClose,
}: DataTabPanelContentsProps) => {
  const { getCurrentCharacter } = useCharactersContext();

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

  return (
    <VStack>
      <Button onClick={handleExportCharacter}>Export Character</Button>
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
