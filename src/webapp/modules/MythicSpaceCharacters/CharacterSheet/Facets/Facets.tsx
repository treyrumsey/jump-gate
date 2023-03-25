import React from "react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { FacetType } from "models/Facet.model";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Upgrades } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Facets/Upgrades/Upgrades";

interface FacetsProps {
  type: FacetType;
  show: boolean;
}

export const Facets = ({ type, show }: FacetsProps) => {
  const { register, control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: `${type}s`,
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const getFieldPath = (index: number, field: string) =>
    `${type}s[${index}].${field}`;

  return (
    <Box className="msc-Facets" display={show ? undefined : "none"}>
      <ButtonGroup className="msc-Facets__edit-toggle-group" isAttached>
        <Text className="msc-Facets__title" fontSize="lg">{`${type}s`}</Text>
        <IconButton
          icon={<EditIcon />}
          className="msc-Facets__edit-toggle is-positive"
          onClick={toggleEditMode}
          aria-label={`Edit ${type}s`}
          size="sm"
        />
      </ButtonGroup>

      <div className="msc-Facets__facets">
        {fields.map((field, index) => {
          return (
            <Card className="msc-Facets__facet-group" key={field.id}>
              <div className="msc-Facets__facet">
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
              </div>
              <Upgrades nestIndex={index} type={type} isEditing={isEditing} />
            </Card>
          );
        })}
      </div>

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
    </Box>
  );
};
