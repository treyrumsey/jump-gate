/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { useFormContext, useWatch } from "react-hook-form";

import { Box, usePrevious } from "@chakra-ui/react";

import { useCharactersContext } from "~/context/CharactersProvider";
import useDebounce from "~/hooks/useDebounce";

const CharacterListener = () => {
  const { updateStateOnWindowFocus, getCurrentCharacter } =
    useCharactersContext();

  const [isWindowFocused, setIsWindowFocused] = useState(true);

  const onWindowFocus = useCallback(() => {
    updateStateOnWindowFocus();
    setIsWindowFocused(true);
  }, [updateStateOnWindowFocus]);

  const onWindowBlur = useCallback(() => {
    setIsWindowFocused(false);
  }, []);

  const formWatch = useWatch();
  const debouncedFormWatch = useDebounce(formWatch, 500);

  useEffect(() => {
    if (debouncedFormWatch) {
      localStorage.setItem(formWatch.id, JSON.stringify(debouncedFormWatch));
    }
  }, [debouncedFormWatch]);

  useEffect(() => {
    window.addEventListener("focus", onWindowFocus);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      window.removeEventListener("focus", onWindowFocus);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, []);

  const character = getCurrentCharacter();
  const previousCharacter = usePrevious(character);
  const { setValue } = useFormContext();

  useEffect(() => {
    if (
      isWindowFocused &&
      previousCharacter &&
      !isEqual(character, previousCharacter)
    ) {
      Object.keys(character).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue(key as any, (character as any)[key]);
      });
    }
  }, [isWindowFocused]);

  return <Box display="none"></Box>;
};

export default CharacterListener;
