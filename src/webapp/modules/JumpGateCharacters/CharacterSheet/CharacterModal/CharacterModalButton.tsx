import { EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React from "react";

type CharacterModalButtonProps = {
  onOpen: () => void;
};

const CharacterModalButton = ({ onOpen }: CharacterModalButtonProps) => {
  return (
    <IconButton
      aria-label={"Character details"}
      className="jg-CharacterModalButton is-positive"
      icon={<EditIcon />}
      title={"Character details"}
      onClick={onOpen}
      size="sm"
    />
  );
};

export default CharacterModalButton;
