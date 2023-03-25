import { Upgrade } from "models/Upgrade.model";

export enum FacetType {
  Aspect = "Aspect",
  Tactic = "Tactic",
}

export interface Facet {
  name: string;
  ability: string;
  description: string;
  upgrades: Upgrade[];
}

export const buildFacet = (type: FacetType): Facet => {
  return {
    name: "",
    ability: "",
    description: "",
    upgrades: [],
  };
};
