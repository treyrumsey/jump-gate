import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import React from "react";

type SummaryTokenButtonProps = {
  className?: string;
  name: string;
  description: React.ReactNode;
};

const SummaryTokenButton = ({
  className,
  name,
  description,
}: SummaryTokenButtonProps) => {
  return (
    <Popover placement="top" trigger="hover" isLazy={true}>
      <PopoverTrigger>
        <Button
          className={className}
          title={`Gain ${name} token`}
          aria-label={`Gain ${name} token`}
          size="sm"
          width="100%"
        >
          {name}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          backdropFilter="blur(4px)"
          bg="rgba(30, 30, 30, 0.8)"
          boxShadow="dark-lg"
        >
          <PopoverArrow backdropFilter="blur(4px)" bg="rgba(30, 30, 30, 0.8)" />
          <PopoverBody>
            <p>{description}</p>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default SummaryTokenButton;
