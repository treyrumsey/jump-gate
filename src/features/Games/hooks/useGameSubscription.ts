import { useEffect, useState, useRef } from "react";

import { ref, onValue } from "firebase/database";

import { db } from "~/App";
import { CharacterSummaryModel } from "~/models/CharacterSummary.model";
// import { PlayerModel } from "~/models/Game.model";

type Player = {
  displayName: string;
  characters: Record<string, CharacterSummaryModel>;
};

const useGameSubscription = (gameId: string) => {
  const [characters, setCharacters] = useState<
    Record<string, CharacterSummaryModel>
  >({});
  const unsubscribeRefs = useRef<Record<string, () => void>>({});

  useEffect(() => {
    const playersRef = ref(db, `games/${gameId}/players`);
    const unsubscribePlayers = onValue(playersRef, (snapshot) => {
      const players: Record<string, any> = snapshot.val();

      // const characterIdPlayerMap: Map<
      //   string,
      //   { playerId: string; displayName: string }
      // > = Object.keys(players).reduce((map, playerId) => {
      //   const player = players[playerId];
      //   Object.keys(player.characters).forEach((character) => {
      //     if (!map.has(character)) {
      //       map.set(character, { playerId, displayName: player.displayName });
      //     }
      //   });
      //   return map;
      // }, new Map());

      const characterIdPlayerMap = Object.entries(players).flatMap(
        ([playerId, player]) => {
          return Object.keys(player.characters).map((characterId) => {
            return {
              characterId: characterId,
              player: { playerId, displayName: player.displayName },
            };
          });
        }
      );

      // Create a new map of character IDs that we want to subscribe to
      const newCharacterIds = characterIdPlayerMap.reduce((acc, curr) => {
        acc[curr.characterId] = true;
        return acc;
      }, {} as Record<string, boolean>);

      // Unsubscribe from any characters that are no longer in the map
      Object.keys(unsubscribeRefs.current).forEach((characterId) => {
        if (!newCharacterIds[characterId]) {
          unsubscribeRefs.current[characterId]();
          delete unsubscribeRefs.current[characterId];
          setCharacters((prev) => {
            const newChars = { ...prev };
            delete newChars[characterId];
            return newChars;
          });
        }
      });

      // Subscribe to any new characters that are not already subscribed to
      characterIdPlayerMap.forEach(({ characterId, player }) => {
        if (!unsubscribeRefs.current[characterId]) {
          const characterRef = ref(
            db,
            `users/${player}/characters/${characterId}`
          );
          const unsubscribeCharacter = onValue(characterRef, (snapshot) => {
            const character: CharacterSummaryModel = snapshot.val();
            setCharacters((prev) => ({ ...prev, [character.id]: character }));
          });
          unsubscribeRefs.current[characterId] = unsubscribeCharacter;
        }
      });
    });

    return () => {
      unsubscribePlayers();
      // Unsubscribe from all characters when the component is unmounted
      Object.values(unsubscribeRefs.current).forEach((unsubscribe) =>
        unsubscribe()
      );
    };
  }, [gameId]);

  return characters;
};

export default useGameSubscription;
