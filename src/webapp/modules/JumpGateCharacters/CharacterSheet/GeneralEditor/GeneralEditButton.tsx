import { EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useDisclosureContext } from "lib/components/context/DisclosureProvider";
import React from "react";

const GeneralEditButton = () => {
  const { onOpen } = useDisclosureContext();

  return (
    <IconButton
      aria-label={"Edit general character data"}
      className="jg-GeneralEditButton"
      icon={<EditIcon />}
      title={"Edit general character data"}
      onClick={onOpen}
      size="sm"
    />
  );
};

export default GeneralEditButton;
