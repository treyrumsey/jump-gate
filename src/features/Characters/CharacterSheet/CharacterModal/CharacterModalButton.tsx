import React from "react";

import { SettingsIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

type CharacterModalButtonProps = {
  onOpen: () => void;
};

const CharacterModalButton = ({ onOpen }: CharacterModalButtonProps) => {
  return (
    <IconButton
      aria-label={"Character details"}
      className="jg-CharacterModalButton is-positive"
      icon={<SettingsIcon />}
      title={"Character details"}
      onClick={onOpen}
      size="sm"
    />
  );
};

export default CharacterModalButton;
