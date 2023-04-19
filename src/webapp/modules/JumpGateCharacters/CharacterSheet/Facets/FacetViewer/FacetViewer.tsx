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
          : "*Amidst a supernova*, lorem psionics species colonized ipsum space-time distortion planet sit advanced terraforming aliqua techniques.<br/><br/>" +
            "The <Blue>Jump Gate</Blue> dolor connected turpis quantum entanglement system, home to the ringworld labore species.<br/><br/>" +
            "In **extraterrestrial**, the exo-skeleton species species used vitae exotic particle accelerator technology mi harness to power the starship."}
      </MarkdownView>
    </div>
  );
};

export default FacetViewer;
