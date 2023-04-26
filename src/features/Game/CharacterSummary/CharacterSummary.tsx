import React, { useEffect } from "react";

import { Card, Skeleton } from "@chakra-ui/react";
import { onValue, ref } from "firebase/database";

import { db } from "~/App";
import { SummaryContents } from "~/features/Game/CharacterSummary/SummaryContents/SummaryContents";
import { CharacterSummaryModel } from "~/models/CharacterSummary.model";

type CharacterSummaryProps = {
  characterId: string;
  playerId: string;
  playerName: string;
  // summary: CharacterSummaryModel;
};

const CharacterSummary = ({
  characterId,
  playerId,
  playerName,
}: // summary,
CharacterSummaryProps) => {
  const [summary, setSummary] = React.useState<CharacterSummaryModel>();

  useEffect(() => {
    const characterRef = ref(db, `users/${playerId}/characters/${characterId}`);
    const unsubscribeCharacter = onValue(characterRef, (snapshot) => {
      const snapshotCharacter: CharacterSummaryModel = snapshot.val();
      setSummary(snapshotCharacter);
    });

    return () => {
      unsubscribeCharacter();
    };
  }, [characterId, playerId, playerName]);

  return (
    <Card
      className="jg-CharacterSummary augmented"
      data-augmented-ui="tl-clip tr-round br-clip bl-round border"
    >
      {summary ? (
        <SummaryContents
          characterId={characterId}
          playerName={playerName}
          summary={summary}
        />
      ) : (
        <Skeleton height="100%" />
      )}
    </Card>
  );
};

export default CharacterSummary;
