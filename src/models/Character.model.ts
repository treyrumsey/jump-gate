import { Aspect, buildAspect } from "models/Aspect.model";
import { Attribute, initAttribute } from "models/Attribute.model";
export interface Character {
  name: string;
  species: string;
  ship: string;
  physique: Attribute;
  reflex: Attribute;
  discipline: Attribute;
  wits: Attribute;
  skills: string[];
  aspects: Aspect[];
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
    skills: [],
    aspects: [buildAspect(), buildAspect()],
    shields: { current: 8, max: 8 },
  };
}
