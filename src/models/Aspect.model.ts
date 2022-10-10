import { Upgrade } from "models/Upgrade.model";

export interface Aspect {
  aspect: string;
  ability: string;
  description: string;
  upgrades: Upgrade[];
}

export const buildAspect = (): Aspect => {
  return {
    aspect: "",
    ability: "",
    description: "",
    upgrades: [],
  };
};
