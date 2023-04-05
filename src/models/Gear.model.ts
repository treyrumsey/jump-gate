import { Tag } from "models/Tag";

export enum GearType {
  Grenade = "Grenade",
  UtilityItem = "Utility Item",
}

export interface Gear extends Tag {
  type?: GearType;
}
