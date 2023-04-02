import { Heading } from "@chakra-ui/react";
import MarkdownView from "lib/components/typography/MarkdownView/MarkdownView";

import React from "react";
import { useFormContext } from "react-hook-form";

interface FacetViewerProps {
  buildId: (fieldName: string) => string;
}

const FacetViewer = ({ buildId }: FacetViewerProps) => {
  const { getValues } = useFormContext();

  const facetNameId = buildId("name");
  const abilityId = buildId("ability");
  const descriptionId = buildId("description");

  const facetName = getValues(facetNameId);
  const ability = getValues(abilityId);
  const description = getValues(descriptionId);

  return (
    <div className="jg-Facets__facet">
      <Heading className="jg-Facets__facet--name" size="md" mb={2}>
        {facetName}
      </Heading>
      <Heading size="sm" mb={1}>
        {ability}
      </Heading>

      <MarkdownView>{description}</MarkdownView>
    </div>
  );
};

export default FacetViewer;
