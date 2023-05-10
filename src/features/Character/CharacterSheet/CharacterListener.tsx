import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";

import { Box } from "@chakra-ui/react";

import useCharacterListening from "~/features/Character/CharacterSheet/useCharacterListening";
import useDebounce from "~/hooks/useDebounce";

export const CharacterListener = () => {
  const { saveChanges, onWindowFocus } = useCharacterListening();
  const formWatch = useWatch();
  const debouncedFormWatch = useDebounce(formWatch, 500);

  useEffect(() => {
    if (debouncedFormWatch) {
      saveChanges(debouncedFormWatch);
    }
  }, [debouncedFormWatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener("focus", onWindowFocus);

    return () => {
      window.removeEventListener("focus", onWindowFocus);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Box display="none"></Box>;
};
