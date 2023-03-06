import React from "react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Collapse,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FacetType } from "models/Facet.model";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Upgrades } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Facets/Upgrades/Upgrades";

interface FacetsProps {
  type: FacetType;
}

export const Facets = ({ type }: FacetsProps) => {
  const { register, control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: `${type}s`,
  });
  const { isOpen, onToggle } = useDisclosure();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toggleEditMode = () => {
    if (!isEditing && !isOpen) {
      onToggle();
    }

    setIsEditing((prev) => !prev);
  };

  const getFieldPath = (index: number, field: string) =>
    `${type}s[${index}].${field}`;

  return (
    <Box py={1} className="msc-Facets">
      <ButtonGroup className="msc-Facets__toggle-group" isAttached>
        <Button className="msc-Facets__toggle" onClick={onToggle}>
          {`${type}s`}
        </Button>
        <IconButton
          icon={<EditIcon />}
          className="msc-Facets__edit-toggle is-positive"
          onClick={toggleEditMode}
          aria-label={`Add or Remove ${type}s`}
        />
      </ButtonGroup>
      <Collapse className="msc-Facets__collapse" in={isOpen} animateOpacity>
        {isEditing && (
          <Box mt="3">
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
          </Box>
        )}
        <div className="msc-Facets__facets">
          {fields.map((field, index) => {
            return (
              <Card className="msc-Facets__facet-group" key={field.id}>
                <Box>
                  <FormControl variant="floating">
                    <Input
                      id={getFieldPath(index, type)}
                      placeholder={type}
                      {...register(getFieldPath(index, type))}
                    />
                    <FormLabel htmlFor={getFieldPath(index, type)}>
                      {type}
                    </FormLabel>
                  </FormControl>
                  <FormControl variant="floating">
                    <Input
                      id={getFieldPath(index, "ability")}
                      placeholder="Ability"
                      {...register(getFieldPath(index, "ability"))}
                    />
                    <FormLabel htmlFor={getFieldPath(index, "ability")}>
                      Ability
                    </FormLabel>
                  </FormControl>
                  <Textarea
                    id={getFieldPath(index, "description")}
                    placeholder="Ability description"
                    {...register(getFieldPath(index, "description"))}
                  />
                </Box>
                <Upgrades nestIndex={index} type={type} isEditing={isEditing} />
              </Card>
            );
          })}
        </div>
      </Collapse>
    </Box>
  );
};
