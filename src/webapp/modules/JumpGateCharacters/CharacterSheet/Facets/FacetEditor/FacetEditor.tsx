import React from "react";

import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react";
import { FacetType } from "models/Facet.model";
import { useFormContext } from "react-hook-form";
import { DeleteIcon } from "@chakra-ui/icons";

interface FacetEditorProps {
  buildId: (fieldName: string) => string;
  isEditing: boolean;
  type: FacetType;
  onDelete: () => void;
}

const FacetEditor = ({
  buildId,
  isEditing,
  onDelete,
  type,
}: FacetEditorProps) => {
  const { register } = useFormContext();

  const facetNameId = buildId("name");
  const abilityId = buildId("ability");
  const descriptionId = buildId("description");

  return (
    <Box
      className="jg-Facets__facet is-editing"
      display={isEditing ? "flex" : "none"}
    >
      <FormControl
        className="jg-FacetEditor__name-form-control"
        variant="floating"
      >
        <InputGroup>
          <Input
            id={facetNameId}
            placeholder={type}
            {...register(facetNameId)}
          />
          <FormLabel htmlFor={facetNameId}>{type}</FormLabel>
          {isEditing && (
            <InputRightElement>
              <IconButton
                className="jg-FacetEditor__delete-button"
                icon={<DeleteIcon />}
                title={`Delete ${type}`}
                aria-label={`Delete ${type}`}
                onClick={onDelete}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
      <FormControl variant="floating">
        <Input id={abilityId} placeholder="Ability" {...register(abilityId)} />
        <FormLabel htmlFor={abilityId}>Ability</FormLabel>
      </FormControl>
      <Textarea
        id={descriptionId}
        placeholder="Ability description"
        rows={6}
        {...register(descriptionId)}
      />
    </Box>
  );
};

export default FacetEditor;
