import { Upgrade } from "models/Upgrade.model";

export enum FacetType {
  Aspect = "Aspect",
  Tactic = "Tactic",
}

export interface Facet {
  ability: string;
  description: string;
  upgrades: Upgrade[];
}

export const buildFacet = (type: FacetType): Facet => {
  return {
    [type]: "",
    ability: "",
    description: "",
    upgrades: [],
  };
};
