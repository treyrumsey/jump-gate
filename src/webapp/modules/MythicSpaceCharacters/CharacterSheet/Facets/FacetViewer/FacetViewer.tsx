import { Heading } from "@chakra-ui/react";
import { Red, Blue } from "lib/components/typography/MarkdownColorOverrides";
import Markdown from "markdown-to-jsx";
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
  );
};

export default FacetViewer;
