import { Facet, buildFacet, FacetType } from "models/Facet.model";
import { Attribute, initAttribute } from "models/Attribute.model";
import { buildExperience, Experience } from "models/Experience.model";
export interface Character {
  name: string;
  species: string;
  ship: string;
  physique: Attribute;
  reflex: Attribute;
  discipline: Attribute;
  wits: Attribute;
  experiences: Experience[];
  Aspects: Facet[];
  Tactics: Facet[];
  shields: { current: number; max: number };
}

export function buildCharacter(): Character {
  return {
    name: "",
    species: "",
    ship: "",
    physique: initAttribute("Physique"),
    reflex: initAttribute("Reflex"),
    discipline: initAttribute("Discipline"),
    wits: initAttribute("Wits"),
    experiences: [
      buildExperience(""),
      buildExperience(""),
      buildExperience(""),
    ],
    Aspects: [buildFacet(FacetType.Aspect), buildFacet(FacetType.Aspect)],
    Tactics: [buildFacet(FacetType.Tactic), buildFacet(FacetType.Tactic)],
    shields: { current: 8, max: 8 },
  };
}
