import { Facet, buildFacet, FacetType } from "models/Facet.model";
import { Attribute, initAttribute } from "models/Attribute.model";
import { buildExperience, Experience } from "models/Experience.model";
import {
  initCasualLoadout,
  initCombatLoadout,
  Loadout,
} from "models/Loadout.model";

interface CharacterLoadouts {
  Casual: Loadout;
  Combat: Loadout;
}
export interface Character {
  name: string;
  species: string;
  ship: string;
  physique: Attribute;
  reflex: Attribute;
  discipline: Attribute;
  wits: Attribute;
  experiences: Experience[];
  loadouts: CharacterLoadouts;
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
    loadouts: { Casual: initCasualLoadout(), Combat: initCombatLoadout() },
    Aspects: [buildFacet(FacetType.Aspect), buildFacet(FacetType.Aspect)],
    Tactics: [buildFacet(FacetType.Tactic), buildFacet(FacetType.Tactic)],
    shields: { current: 8, max: 8 },
  };
}
