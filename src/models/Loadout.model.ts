import { ArmorMod } from "models/ArmorMod.model";
import { Gear } from "models/Gear.model";
import { initWeapon, Weapon } from "models/Weapon.model";

export enum LoadoutType {
  Casual = "Casual",
  Combat = "Combat",
}

export interface Loadout {
  type: LoadoutType;
  weapons: Weapon[];
  gear: Gear[];
  armorMods: ArmorMod[];
}

export const initCasualLoadout = (): Loadout => ({
  type: LoadoutType.Casual,
  weapons: [initWeapon()],
  gear: [],
  armorMods: [],
});

export const initCombatLoadout = (): Loadout => ({
  type: LoadoutType.Combat,
  weapons: [initWeapon(), initWeapon()],
  gear: [],
  armorMods: [],
});
