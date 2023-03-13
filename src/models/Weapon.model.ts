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

export enum WeaponTrait {
  FullAuto = "Full Auto",
  Sidearm = "sidearm",
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
  type: WeaponModType | undefined;
  description: string;
}

export interface Weapon {
  name: string;
  type: WeaponType | undefined;
  range: WeaponRange | undefined;
  ammo: number | undefined;
  damage: Dice | undefined;
  trait: WeaponTrait | undefined;
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
