import React, { ChangeEvent, useEffect, useState } from "react";

import { Box, Button } from "@chakra-ui/react";

import { useCharactersContext } from "~/context/CharactersProviderOld";
import { generateUUID } from "~/lib/utilities/GenerateUUID";
import { Character } from "~/models/Character.model";

type ImportCharacterInputProps = {
  onSidebarClose: () => void;
};

const ImportCharacterInput = ({
  onSidebarClose,
}: ImportCharacterInputProps) => {
  const [data, setData] = useState<Character | null>(null);

  const { addCharacter } = useCharactersContext();

  function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const contents = reader.result?.toString();
        if (contents) {
          try {
            const parsedData = JSON.parse(contents);
            setData({ ...parsedData, id: generateUUID() });
          } catch (error) {
            console.error("Error parsing JSON file:", error);
          }
        }
      };
      reader.readAsText(file);
    }
  }

  useEffect(() => {
    if (data) {
      addCharacter(data);
      onSidebarClose();
      setData(null);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Button as="label" htmlFor="file-input">
        Import
      </Button>
      <input
        id="file-input"
        type="file"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default ImportCharacterInput;
