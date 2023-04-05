import { Dice } from "models/Dice.model";
import { Tag } from "models/Tag";

export enum WeaponRange {
  Engaged = "Engaged",
  Close = "Close",
  Medium = "Medium",
  Long = "Long",
  Extreme = "Extreme",
}

export enum WeaponType {
  Amp = "Amp",
  Heavy = "Heavy",
  Longarm = "Longarm",
  Melee = "Melee",
  Pistol = "Pistol",
  Rifle = "Rifle",
  Shotgun = "Shotgun",
}

export enum WeaponModType {
  Ammo = "Ammo",
  Frame = "Frame",
  Grip = "Grip",
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
  type?: WeaponType;
  range?: WeaponRange;
  ammo: { current: number; max: number };
  damage?: Dice;
  trait: Tag[];
  mods: WeaponMod[];
}

export const initWeapon = (): Weapon => ({
  name: "",
  type: undefined,
  range: undefined,
  ammo: { current: 0, max: 0 },
  damage: undefined,
  trait: [],
  mods: [],
});
