import { Dice } from "models/Dice.model";

export enum WeaponRange {
  Engaged = "Engaged",
  Close = "Close",
  Medium = "Medium",
  Long = "Long",
  Extreme = "Extreme",
}

export enum WeaponType {
  Amp = "Amp",
  Heavy = "Heavy Weapon",
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

export interface WeaponMod {
  name: string;
  type?: WeaponModType;
  description: string;
}

export interface WeaponTrait {
  name: string;
  description: string;
}
export interface Ammo {
  current: number;
  max: number;
}

export interface Weapon {
  name: string;
  type?: WeaponType;
  range?: WeaponRange;
  ammo?: number;
  damage?: Dice;
  trait?: WeaponTrait;
  mods: WeaponMod[];
}

export const initWeapon = (): Weapon => ({
  name: "",
  type: undefined,
  range: undefined,
  ammo: undefined,
  damage: undefined,
  trait: undefined,
  mods: [],
});
