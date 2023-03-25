export enum GearType {
  Grenade = "Grenade",
  UtilityItem = "Utility Item",
}

export interface Gear {
  type?: GearType;
  name: string;
  description: string;
}

export const initUtilityItem = (): Gear => ({
  type: GearType.UtilityItem,
  name: "",
  description: "",
});

export const initGear = (): Gear => ({
  name: "",
  description: "",
});
