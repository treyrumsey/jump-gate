import { Dice } from "~/models/Dice.model";
import { Tag } from "~/models/Tag.model";

export enum WeaponRange {
  Engaged = "Engaged",
  Close = "Close",
  Medium = "Medium",
  Long = "Long",
  Extreme = "Extreme",
}

export enum WeaponType {
  Amp = "Amp",
  Melee = "Melee",
  Pistol = "Pistol",
  Rifle = "Rifle",
  Terminal = "Terminal",
}

export enum WeaponModType {
  Ammo = "Ammo",
  Attachment = "Attachment",
  Material = "Material",
  Magazine = "Magazine",
  Scope = "Scope",
  Special = "Special",
}

export interface WeaponMod extends Tag {
  type: WeaponModType;
}
export interface Ammo {
  current: number;
  max: number;
}

export interface Weapon {
  name: string;
  type: WeaponType | "";
  range: WeaponRange | "";
  ammo: { current: number; max: number };
  damage: Dice | "";
  traits: Tag[];
  mods: WeaponMod[];
}

export const initWeapon = (): Weapon => ({
  name: "",
  type: "",
  range: "",
  ammo: { current: 0, max: 0 },
  damage: "",
  traits: [],
  mods: [],
});
