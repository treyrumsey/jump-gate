import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React, { useRef } from "react";

const SafariUnsupportedAlert = () => {
  const shareRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog
      isOpen={true}
      leastDestructiveRef={shareRef}
      onClose={() => {
        return;
      }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            iOS browser not supported
          </AlertDialogHeader>
          <AlertDialogBody>
            Jump Gate is deployed as a Progressive Web App and is currently
            experiencing issues in the browser on iOS. To use Jump Gate on iOS,
            please open this page in Safari, press the share button, and select
            'Add to Home Screen'.
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default SafariUnsupportedAlert;
