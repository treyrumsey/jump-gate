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
import FacetEditor from "webapp/modules/JumpGateCharacters/CharacterSheet/Facets/FacetEditor/FacetEditor";
import FacetViewer from "webapp/modules/JumpGateCharacters/CharacterSheet/Facets/FacetViewer/FacetViewer";
import { Upgrades } from "webapp/modules/JumpGateCharacters/CharacterSheet/Facets/Upgrades/Upgrades";

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
    <Box
      className="jg-Facets augmented"
      data-augmented-ui="tl-clip tr-round br-clip bl-round border"
      display={show ? undefined : "none"}
    >
      <ButtonGroup
        className="jg-Facets__edit-toggle-group"
        isAttached
        paddingInlineStart="64px"
      >
        <Text className="jg-Facets__title" fontSize="lg">{`${type}s`}</Text>
        <IconButton
          aria-label={`View ${type}s`}
          borderRadius="0"
          icon={<InfoIcon />}
          size="sm"
          onClick={onOpen}
        />
        <IconButton
          icon={<EditIcon />}
          className="jg-Facets__edit-toggle is-positive"
          onClick={openEditMode}
          aria-label={`Edit ${type}s`}
          size="sm"
        />
      </ButtonGroup>

      <div className="jg-Facets__facets">
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
              <Card
                className="jg-Facets__facet-group augmented"
                data-augmented-ui="tl-clip br-clip"
                key={field.id}
              >
                <FacetViewer buildId={buildId} facetType={type} />
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
        <ModalContent
          className="jg-FacetEditor augmented"
          data-augmented-ui="tl-clip tr-round br-clip bl-round border"
        >
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
                  className="jg-Facets__add-facet is-positive"
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
          <ModalBody className="jg-Facets">
            <div className="jg-Facets__facets">
              {fields.map((field, index) => {
                const buildId = (field: string) => buildFieldId(index, field);

                return (
                  <Card
                    className="jg-Facets__facet-group augmented"
                    data-augmented-ui="tl-clip tr-round br-clip bl-round border"
                    key={field.id}
                  >
                    <FacetEditor
                      buildId={buildId}
                      isEditing={isEditing}
                      type={type}
                    />
                    {!isEditing && (
                      <FacetViewer buildId={buildId} facetType={type} />
                    )}
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
