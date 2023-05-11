/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";

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

import { isMobileAppleDevice } from "~/lib/utilities/MetaTagUtilites";

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
  /** Safari has an issue with its -webkit-backdrop-filters on lazily-loaded
   *  content. Adding it after the content is rendered fixes the issue.
   */
  const popoverContentRef = useRef<HTMLElement>(null);
  const lazilyApplyWebkitBackdropBlur = () => {
    popoverContentRef.current?.classList.add("webkit-backdrop-blur");
    popoverContentRef.current
      ?.getElementsByClassName("popover-backdrop-blur")[0]
      ?.classList.add("webkit-backdrop-blur");
  };
  const removeWebkitBackdropBlur = () => {
    popoverContentRef.current?.classList.remove("webkit-backdrop-blur");
    popoverContentRef.current
      ?.getElementsByClassName("popover-backdrop-blur")[0]
      ?.classList.remove("webkit-backdrop-blur");
  };

  const usingTouch = useRef(false);
  const timeoutComplete = useRef(false);

  const [delayHandler, setDelayHandler] = useState<any>(null);
  const handleMouseEnter = () => {
    if (!usingTouch.current) {
      setDelayHandler(
        setTimeout(() => {
          onOpen();
          setTimeout(() => lazilyApplyWebkitBackdropBlur(), 100);
        }, 500)
      );
    }
  };
  const handleMouseLeave = () => {
    clearTimeout(delayHandler);
    onClose();
    removeWebkitBackdropBlur();
  };

  const [longPressHandler, setLongPressHandler] = useState<any>(null);
  const handleTouchStart = () => {
    usingTouch.current = true;
    setLongPressHandler(
      setTimeout(() => {
        onOpen();
        setTimeout(() => lazilyApplyWebkitBackdropBlur(), 50);
        timeoutComplete.current = true;
      }, 500)
    );
  };
  const handleTouchEnd = () => {
    clearTimeout(longPressHandler);
    if (!timeoutComplete.current) gainToken();
    timeoutComplete.current = false;
  };

  return (
    <Popover
      placement="top"
      isOpen={isOpen}
      isLazy
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
              gainToken();
            }
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onBlur={() => {
            if (!isMobileAppleDevice()) {
              handleMouseLeave();
              usingTouch.current = false;
            }
            removeWebkitBackdropBlur();
          }}
        >
          {name}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          className="popover-backdrop-blur"
          bg="rgba(30, 30, 30, 0.8)"
          boxShadow="dark-lg"
          ref={popoverContentRef}
        >
          <PopoverArrow
            className="popover-backdrop-blur"
            bg="rgba(30, 30, 30, 0.8)"
          />

          <PopoverBody>
            <p>{description}</p>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default TokenFieldButton;
