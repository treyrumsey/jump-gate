import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
} from "@chakra-ui/react";
import { NumberField } from "lib/components/forms/NumberField/NumberField";
import MarkdownView from "lib/components/typography/MarkdownView/MarkdownView";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import DeleteCharacterButton from "webapp/modules/JumpGateCharacters/CharacterSheet/CharacterModal/DeleteCharacter/DeleteCharacterButton";

type CharacterModalProps = {
  isCharacterModalOpen: boolean;
  onCharacterModalClose: () => void;
};

const CharacterModal = ({
  isCharacterModalOpen,
  onCharacterModalClose,
}: CharacterModalProps) => {
  const { control, getValues, register } = useFormContext();
  const statuses = ["shields", "armor", "stress", "supplies", "mp"];

  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const [currentTabPanel, setCurrentTabPanel] = useState(0);
  const handleModalClose = () => {
    setIsEditingNotes(false);
    setCurrentTabPanel(0);
    onCharacterModalClose();
  };

  return (
    <Modal isOpen={isCharacterModalOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent className="jg-CharacterModal" maxWidth="4xl">
        <ModalHeader textAlign="center" position="relative" paddingBottom="0">
          Character Details
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="jg-CharacterModal__modal-body" maxWidth="4xl">
          <Tabs onChange={(index) => setCurrentTabPanel(index)}>
            <TabList>
              <Tab>Notes</Tab>
              <Tab>Options</Tab>
              <Tab>Data</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Textarea
                  id="notes"
                  minHeight="12rem"
                  size="sm"
                  display={isEditingNotes ? undefined : "none"}
                  {...register("notes")}
                />
                {!isEditingNotes && (
                  <MarkdownView>{getValues("notes") ?? ""}</MarkdownView>
                )}
              </TabPanel>
              <TabPanel>
                <Box
                  display="flex"
                  gap="1rem"
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  {statuses.map((status) => (
                    <FormControl
                      className="jg-CharacterModal__max-status"
                      key={status}
                      variant="floating"
                      width="9rem"
                    >
                      <NumberField
                        id={`status.${status}.max`}
                        name={`status.${status}.max`}
                        rules={{ min: 0 }}
                        defaultValue={getValues(`status.${status}.max`)}
                        control={control}
                        size="lg"
                      />
                      <FormLabel
                        htmlFor={`status.${status}.max`}
                        textTransform="capitalize"
                      >{`Max ${status}`}</FormLabel>
                    </FormControl>
                  ))}
                </Box>
              </TabPanel>
              <TabPanel>
                <DeleteCharacterButton
                  onCharacterModalClose={handleModalClose}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          {currentTabPanel === 0 && (
            <Button
              className={isEditingNotes ? undefined : "is-positive"}
              leftIcon={isEditingNotes ? <ViewIcon /> : <EditIcon />}
              marginRight="auto"
              onClick={() => setIsEditingNotes(!isEditingNotes)}
            >
              {isEditingNotes ? "View Notes" : "Edit Notes"}
            </Button>
          )}
          <Button onClick={handleModalClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CharacterModal;
