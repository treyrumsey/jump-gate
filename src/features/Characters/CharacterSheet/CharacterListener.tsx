/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import isEqual from "react-fast-compare";
import { useFormContext, useWatch } from "react-hook-form";

import { Box, usePrevious, useToast } from "@chakra-ui/react";
import { get, ref, remove, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "~/App";
import { useCharactersContext } from "~/context/CharactersProvider";
import useDebounce from "~/hooks/useDebounce";

const CharacterListener = () => {
  const [user] = useAuthState(auth);

  const { updateStateOnWindowFocus, getCurrentCharacter } =
    useCharactersContext();

  const prevSynced = useRef(getCurrentCharacter().isSynced);

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

  const toast = useToast();

  const unsyncCharacter = async (characterId: string) => {
    if (!user) return;

    const playerGamesSnapshot = await get(
      ref(db, "users/" + user.uid + "/games")
    );
    if (playerGamesSnapshot.exists()) {
      const playerGames = playerGamesSnapshot.val();
      const gameIds = [
        ...Object.keys(playerGames.owned),
        ...Object.keys(playerGames.joined),
      ];
      for (const gameId of gameIds) {
        remove(ref(db, "games/" + gameId + "/characters/" + characterId));
      }
    }

    remove(ref(db, "users/" + user.uid + "/characters/" + characterId))
      .then(() => {
        toast({
          title: "Character removed from roster",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (debouncedFormWatch) {
      debouncedFormWatch.lastModified = Date.now();
      localStorage.setItem(
        debouncedFormWatch.id,
        JSON.stringify(debouncedFormWatch)
      );
    }
    if (user && debouncedFormWatch.isSynced) {
      const isNewlySynced = !prevSynced.current;
      set(
        ref(db, "users/" + user.uid + "/characters/" + debouncedFormWatch.id),
        debouncedFormWatch
      )
        .then(() => {
          if (isNewlySynced)
            toast({
              title: "Character added to roster",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
        })
        .catch((err) => console.error(err));
    }
    if (user && prevSynced.current && !debouncedFormWatch.isSynced) {
      unsyncCharacter(debouncedFormWatch.id);
    }
    if (user) prevSynced.current = debouncedFormWatch.isSynced;
  }, [user, debouncedFormWatch]);

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
