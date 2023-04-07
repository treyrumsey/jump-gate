import { Heading } from "@chakra-ui/react";
import MarkdownView from "lib/components/typography/MarkdownView/MarkdownView";
import { FacetType } from "models/Facet.model";

import React from "react";
import { useFormContext } from "react-hook-form";

interface FacetViewerProps {
  buildId: (fieldName: string) => string;
  facetType: FacetType;
}

const FacetViewer = ({ buildId, facetType }: FacetViewerProps) => {
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
        {facetName.length ? facetName : facetType}
      </Heading>
      <Heading size="sm" mb={1}>
        {ability.length ? ability : "Ability Name"}
      </Heading>

      <MarkdownView>
        {description.length
          ? description
          : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
      </MarkdownView>
    </div>
  );
};

export default FacetViewer;
