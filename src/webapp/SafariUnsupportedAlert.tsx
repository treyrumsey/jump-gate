import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";

const SafariUnsupportedAlert = () => {
  const shareRef = useRef<HTMLButtonElement | null>(null);

  navigator.canShare();

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
            experiencing issues in browser mode on iOS. To use Jump Gate on iOS,
            please share it to the home screen and access the app from there.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={shareRef}
              onClick={() => {
                if (navigator.canShare()) navigator.share();
              }}
            >
              Share to Home Screen
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default SafariUnsupportedAlert;
