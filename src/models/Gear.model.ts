import { Tag } from "models/Tag";

export enum GearType {
  Grenade = "Grenade",
  UtilityItem = "Utility Item",
}

export interface Gear extends Tag {
  type?: GearType;
}

export const initUtilityItem = (): Gear => ({
  type: GearType.UtilityItem,
  name: "",
  description: "",
});

export const initGear = (): Gear => ({
  name: "",
  description: "",
});
