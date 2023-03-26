import React from "react";

import { Box, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { FacetType } from "models/Facet.model";
import { useFormContext } from "react-hook-form";

interface FacetEditorProps {
  buildId: (fieldName: string) => string;
  isEditing: boolean;
  type: FacetType;
}

const FacetEditor = ({ buildId, isEditing, type }: FacetEditorProps) => {
  const { register } = useFormContext();

  const facetNameId = buildId("name");
  const abilityId = buildId("ability");
  const descriptionId = buildId("description");

  return (
    <Box
      className="msc-Facets__facet is-editing"
      display={isEditing ? "flex" : "none"}
    >
      <FormControl variant="floating">
        <Input id={facetNameId} placeholder={type} {...register(facetNameId)} />
        <FormLabel htmlFor={facetNameId}>{type}</FormLabel>
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
