import { LoadoutType } from "models/Loadout.model";

export enum WeaponLabel {
  Primary = "Primary Weapon",
  Secondary = "Secondary Weapon",
  Sidearm = "Sidearm",
}

type LoadoutWeaponLabelsType = {
  [key in LoadoutType]: readonly WeaponLabel[];
};

const LoadoutWeaponLabels: Readonly<LoadoutWeaponLabelsType> = {
  [LoadoutType.Casual]: [WeaponLabel.Sidearm],
  [LoadoutType.Combat]: [WeaponLabel.Primary, WeaponLabel.Secondary],
};

export const getWeaponLabel = (index: number, loadoutType: LoadoutType) => {
  return LoadoutWeaponLabels[loadoutType][index] ?? "Weapon";
};

export const hasModSlots = (index: number, type: LoadoutType) =>
  getWeaponLabel(index, type) === WeaponLabel.Primary;
