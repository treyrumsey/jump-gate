import React, { useRef } from "react";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Text,
} from "@chakra-ui/react";

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
        <AlertDialogContent width="min-content">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Add Jump Gate to the home screen for iOS
          </AlertDialogHeader>
          <AlertDialogBody maxWidth="400px">
            <Text mb="3" whiteSpace="pre-line">
              To use Jump Gate on iOS, open this page in Safari, tap the share
              button, and select
              <br /> <strong>Add to Home Screen</strong>.
            </Text>
            <Accordion allowToggle>
              <AccordionItem border="0">
                <h2>
                  <AccordionButton px="0">
                    <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                      Why do I need to do this?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb="0" px="0">
                  <Text fontSize="sm">
                    Jump Gate is deployed as a Progressive Web App, and saves
                    data to the browser's local storage for offline characters.
                    <br />
                    <br />
                    On iOS, when a website's local storage hasn't been accessed
                    for more than 7 days, it is purged, meaning your offline
                    saved character data will be lost.
                    <br />
                    <br />
                    Adding Jump Gate to your home screen will prevent this from
                    happening, as iOS treats home screen PWAs differently.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default SafariUnsupportedAlert;
