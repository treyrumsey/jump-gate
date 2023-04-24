import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@chakra-ui/react";

import { useDisclosureContext } from "~/components/context/DisclosureProvider";
import CustomIcon, { CustomIcons } from "~/components/icons/CustomIcon";

type SidebarNavigateButtonProps = {
  icon?: CustomIcons;
  to: string;
  text: string;
};

export const SidebarNavigateButton = ({
  icon,
  to,
  text,
}: SidebarNavigateButtonProps) => {
  const navigate = useNavigate();
  const { onClose } = useDisclosureContext();

  return (
    <Button
      paddingStart="6"
      width="100%"
      borderRadius="0"
      variant="ghost"
      justifyContent="start"
      leftIcon={
        icon ? <CustomIcon icon={icon} size="1rem" fill="#ffffff" /> : undefined
      }
      onClick={() => {
        onClose();
        navigate(to);
      }}
    >
      {text}
    </Button>
  );
};
