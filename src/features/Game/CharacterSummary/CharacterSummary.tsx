import React, { useEffect } from "react";

import { DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { onValue, ref, remove } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "~/App";
import CustomIcon, { CustomIcons } from "~/components/icons/CustomIcon";
import { useGameContext } from "~/context/GameProvider";
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
  const [user] = useAuthState(auth);
  const { gameId, game } = useGameContext();
  const toast = useToast();

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

  if (!user) return null;

  const canUserManageCharacter =
    user.uid === playerId || user.uid === game.owner;

  const handleRemoveCharacterFromGame = () => {
    if (!user) return;
    remove(ref(db, `games/${gameId}/characters/${characterId}`)).then(() => {
      toast({
        title: `${summary?.name} removed from ${game.name}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  };

  return (
    <Card
      className="jg-CharacterSummary augmented"
      data-augmented-ui="tl-clip tr-round br-clip bl-round border"
      position="relative"
    >
      {canUserManageCharacter && (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={
              <CustomIcon
                icon={CustomIcons.Kebab}
                fill="rgba(255, 255, 255, 0.92)"
              />
            }
            variant="ghost"
            position="absolute"
            top="1"
            right="1"
          />
          <Portal>
            <MenuList>
              <MenuItem
                icon={<DeleteIcon />}
                onClick={handleRemoveCharacterFromGame}
              >
                Remove
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      )}
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
