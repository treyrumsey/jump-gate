import { EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React from "react";

type GeneralEditButtonProps = {
  onOpen: () => void;
};

const GeneralEditButton = ({ onOpen }: GeneralEditButtonProps) => {
  return (
    <IconButton
      aria-label={"Edit general character data"}
      className="jg-GeneralEditButton is-positive"
      icon={<EditIcon />}
      title={"Edit general character data"}
      onClick={onOpen}
      size="sm"
    />
  );
};

export default GeneralEditButton;
