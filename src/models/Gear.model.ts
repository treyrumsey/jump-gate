import { Tag } from "~/models/Tag.model";

export enum GearType {
  Grenade = "Grenade",
  UtilityItem = "Utility Item",
}

export interface Gear extends Tag {
  type?: GearType;
}
