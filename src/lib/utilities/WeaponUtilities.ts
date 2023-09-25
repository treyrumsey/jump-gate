import { LoadoutType } from "~/models/Loadout.model";

export enum WeaponLabel {
  Primary = "Primary Weapon",
  Sidearm = "Sidearm",
}

type LoadoutWeaponLabelsType = {
  [key in LoadoutType]: readonly WeaponLabel[];
};

const LoadoutWeaponLabels: Readonly<LoadoutWeaponLabelsType> = {
  [LoadoutType.Casual]: [WeaponLabel.Sidearm],
  [LoadoutType.Combat]: [WeaponLabel.Primary, WeaponLabel.Sidearm],
};

export const getWeaponLabel = (index: number, loadoutType: LoadoutType) => {
  return LoadoutWeaponLabels[loadoutType][index] ?? "Weapon";
};

export const hasModSlots = (index: number, type: LoadoutType) =>
  getWeaponLabel(index, type) !== WeaponLabel.Sidearm;

export const canBeDeleted = (index: number, type: LoadoutType) => {
  return ![WeaponLabel.Primary, WeaponLabel.Sidearm].includes(
    getWeaponLabel(index, type)
  );
};
