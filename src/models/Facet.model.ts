import { Upgrade } from "models/Upgrade.model";

export enum FacetType {
  Aspect = "Aspect",
  Tactic = "Tactic",
}

export interface Facet {
  facet: string;
  ability: string;
  description: string;
  upgrades: Upgrade[];
}

export const buildFacet = (): Facet => {
  return {
    facet: "",
    ability: "",
    description: "",
    upgrades: [],
  };
};
