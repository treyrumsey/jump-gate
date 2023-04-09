/* eslint-disable react-hooks/exhaustive-deps */
import { Box, usePrevious } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useCharactersContext } from "webapp/modules/context/CharactersProvider";
import isEqual from "react-fast-compare";

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

  useEffect(() => {
    if (formWatch)
      localStorage.setItem(formWatch.id, JSON.stringify(formWatch));
  }, [formWatch]);

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
