export enum GearType {
  Grenade = "Grenade",
  UtilityItem = "Utility Item",
}

export interface Gear {
  type: GearType | undefined;
  name: string;
  description: string;
}

export const initUtilityItem = (): Gear => ({
  type: GearType.UtilityItem,
  name: "",
  description: "",
});

export const initGear = (): Gear => ({
  type: undefined,
  name: "",
  description: "",
});
