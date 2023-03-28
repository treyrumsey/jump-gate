import { AddIcon, EditIcon, InfoIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FacetType } from "models/Facet.model";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import FacetEditor from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Facets/FacetEditor/FacetEditor";
import FacetViewer from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Facets/FacetViewer/FacetViewer";
import { Upgrades } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Facets/Upgrades/Upgrades";

interface FacetsProps {
  show: boolean;
  type: FacetType;
}

const Facets = ({ show, type }: FacetsProps) => {
  const { control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: `${type}s`,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isEditing, setIsEditing] = useState(false);
  const openEditMode = () => {
    setIsEditing(true);
    onOpen();
  };
  const closeEditMode = () => {
    setIsEditing(false);
    onClose();
  };

  const buildFieldId = (index: number, field: string) =>
    `${type}s[${index}].${field}`;

  return (
    <Box className="msc-Facets" display={show ? undefined : "none"}>
      <ButtonGroup
        className="msc-Facets__edit-toggle-group"
        isAttached
        paddingInlineStart="64px"
      >
        <Text className="msc-Facets__title" fontSize="lg">{`${type}s`}</Text>
        <IconButton
          aria-label={`View ${type}s`}
          icon={<InfoIcon />}
          size="sm"
          onClick={onOpen}
          borderRadius="0"
        />
        <IconButton
          icon={<EditIcon />}
          className="msc-Facets__edit-toggle is-positive"
          onClick={openEditMode}
          aria-label={`Edit ${type}s`}
          size="sm"
        />
      </ButtonGroup>

      <div className="msc-Facets__facets">
        {isOpen ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          fields.map((field, index) => {
            const buildId = (field: string) => buildFieldId(index, field);

            return (
              <Card className="msc-Facets__facet-group" key={field.id}>
                <FacetViewer buildId={buildId} />
                <Upgrades
                  facetIndex={index}
                  type={type}
                  isEditing={isEditing}
                />
              </Card>
            );
          })
        )}
      </div>

      <Modal isOpen={isOpen} onClose={closeEditMode}>
        <ModalOverlay />
        <ModalContent className="msc-FacetEditor">
          <ModalHeader textAlign="center" position="relative" paddingBottom="0">
            <ButtonGroup position="absolute" top=".82rem" left="1rem">
              <Button
                leftIcon={isEditing ? <ViewIcon /> : <EditIcon />}
                className={isEditing ? undefined : "is-positive"}
                onClick={() => setIsEditing((prev) => !prev)}
                size="sm"
              >
                {isEditing ? "View" : "Edit"}
              </Button>
              {isEditing && (
                <Button
                  className="msc-Facets__add-facet is-positive"
                  leftIcon={<AddIcon />}
                  size="sm"
                  onClick={() => {
                    append({
                      [type]: "",
                      ability: "",
                      description: "",
                      upgrades: [],
                    });
                  }}
                >
                  {`Add New ${type}`}
                </Button>
              )}
            </ButtonGroup>

            {`${type}s`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="msc-Facets">
            <div className="msc-Facets__facets">
              {fields.map((field, index) => {
                const buildId = (field: string) => buildFieldId(index, field);

                return (
                  <Card className="msc-Facets__facet-group" key={field.id}>
                    <FacetEditor
                      buildId={buildId}
                      isEditing={isEditing}
                      type={type}
                    />
                    {!isEditing && <FacetViewer buildId={buildId} />}
                    <Upgrades
                      facetIndex={index}
                      type={type}
                      isEditing={isEditing}
                    />
                  </Card>
                );
              })}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Facets;
