import { Tag } from "~/models/Tag.model";

export enum ArmorModType {
  Belt = "Belt",
  Boots = "Boots",
  Helmet = "Helmet",
  Lining = "Lining",
  Plating = "Plating",
  Shields = "Shields",
}

export interface ArmorMod extends Tag {
  type: ArmorModType;
}
