import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Button,
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
import MarkdownView from "lib/components/typography/MarkdownView/MarkdownView";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import DataTabPanelContents from "webapp/modules/JumpGateCharacters/CharacterSheet/CharacterModal/DataTabPanel/DataTabPanelContents";
import OptionsTabPanelContents from "webapp/modules/JumpGateCharacters/CharacterSheet/CharacterModal/OptionsTabPanel/OptionsTabPanelContents";
import RoomTabPanelContents from "webapp/modules/JumpGateCharacters/CharacterSheet/CharacterModal/RoomTabPanel/RoomTabPanelContents";

type CharacterModalProps = {
  isCharacterModalOpen: boolean;
  onCharacterModalClose: () => void;
};

const CharacterModal = ({
  isCharacterModalOpen,
  onCharacterModalClose,
}: CharacterModalProps) => {
  const { getValues, register } = useFormContext();

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
      <ModalContent
        className="jg-CharacterModal augmented"
        data-augmented-ui="tl-clip tr-round br-clip bl-round border"
        maxWidth="4xl"
      >
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
              <Tab>Room</Tab>
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
                <OptionsTabPanelContents />
              </TabPanel>
              <TabPanel>
                <DataTabPanelContents
                  onCharacterModalClose={handleModalClose}
                />
              </TabPanel>
              <TabPanel>
                <RoomTabPanelContents />
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
