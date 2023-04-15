/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import { isMobileAppleDevice } from "lib/utilities/MetaTagUtilites";
import React, { useRef, useState } from "react";

type TokenFieldButtonProps = {
  className?: string;
  name: string;
  description: React.ReactNode;
  gainToken: () => void;
};

const TokenFieldButton = ({
  className,
  name,
  description,
  gainToken,
}: TokenFieldButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const usingTouch = useRef(false);
  const timeoutComplete = useRef(false);

  const [delayHandler, setDelayHandler] = useState<any>(null);
  const handleMouseEnter = () => {
    console.log("mouseenter");
    if (!usingTouch.current) {
      setDelayHandler(
        setTimeout(() => {
          console.log("mouseopen");
          onOpen();
        }, 500)
      );
    }
  };
  const handleMouseLeave = () => {
    console.log("mouseleave");
    clearTimeout(delayHandler);
    onClose();
  };

  const [longPressHandler, setLongPressHandler] = useState<any>(null);
  const handleTouchStart = () => {
    usingTouch.current = true;
    console.log("touchstart");
    setLongPressHandler(
      setTimeout(() => {
        console.log("touchopen");
        onOpen();
        timeoutComplete.current = true;
      }, 500)
    );
  };
  const handleTouchEnd = () => {
    console.log("touchend");
    clearTimeout(longPressHandler);
    if (!timeoutComplete.current) gainToken();
    timeoutComplete.current = false;
  };

  return (
    <Popover
      placement="top"
      isOpen={isOpen}
      onOpen={() => null}
      onClose={() => null}
      returnFocusOnClose={false}
      autoFocus={false}
    >
      <PopoverTrigger>
        <Button
          className={className}
          title={`Gain ${name} token`}
          aria-label={`Gain ${name} token`}
          size="sm"
          width="100%"
          onClick={() => {
            if (!usingTouch.current) {
              console.log("onClick - gainPositiveToken");
              gainToken();
            }
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onBlur={() => {
            if (!isMobileAppleDevice()) {
              console.log("blur");
              handleMouseLeave();
              usingTouch.current = false;
            }
          }}
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

export default TokenFieldButton;
