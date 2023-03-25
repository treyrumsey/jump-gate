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
  Heading,
} from "@chakra-ui/react";
import { FacetType } from "models/Facet.model";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Upgrades } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Facets/Upgrades/Upgrades";
import Markdown from "markdown-to-jsx";
import { Blue, Red } from "lib/components/typography/MarkdownColorOverrides";

interface FacetProps {
  buildId: (fieldName: string) => string;
  isEditing: boolean;
  type: FacetType;
}

const Facet = ({ buildId, isEditing, type }: FacetProps) => {
  const { register, getValues } = useFormContext();

  const facetNameId = buildId("name");
  const abilityId = buildId("ability");
  const descriptionId = buildId("description");

  const facetName = getValues(facetNameId);
  const ability = getValues(abilityId);
  const description = getValues(descriptionId);

  return (
    <>
      <Box
        className="msc-Facets__facet is-editing"
        display={isEditing ? "flex" : "none"}
      >
        <FormControl variant="floating">
          <Input
            id={facetNameId}
            placeholder={type}
            {...register(facetNameId)}
          />
          <FormLabel htmlFor={facetNameId}>{type}</FormLabel>
        </FormControl>
        <FormControl variant="floating">
          <Input
            id={abilityId}
            placeholder="Ability"
            {...register(abilityId)}
          />
          <FormLabel htmlFor={abilityId}>Ability</FormLabel>
        </FormControl>
        <Textarea
          id={descriptionId}
          placeholder="Ability description"
          {...register(descriptionId)}
        />
      </Box>
      {!isEditing && (
        <div className="msc-Facets__facet">
          <Heading className="msc-Facets__facet--name" size="md" mb={2}>
            {facetName}
          </Heading>
          <Heading size="sm" mb={1}>
            {ability}
          </Heading>

          <Markdown
            options={{
              wrapper: "section",
              forceWrapper: true,
              overrides: {
                Red: {
                  component: Red,
                },
                Blue: {
                  component: Blue,
                },
              },
            }}
          >
            {description}
          </Markdown>
        </div>
      )}
    </>
  );
};
interface FacetsProps {
  show: boolean;
  type: FacetType;
}

export const Facets = ({ show, type }: FacetsProps) => {
  const { control } = useFormContext();
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
          const buildId = (field: string) => getFieldPath(index, field);

          return (
            <Card className="msc-Facets__facet-group" key={field.id}>
              <Facet buildId={buildId} isEditing={isEditing} type={type} />
              <Upgrades facetIndex={index} type={type} isEditing={isEditing} />
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
