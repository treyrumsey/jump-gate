import { Facet } from "models/Facet.model";
import { Attribute, AttributeName } from "models/Attribute.model";
import { buildExperience, Experience } from "models/Experience.model";
import {
  initCasualLoadout,
  initCombatLoadout,
  Loadout,
  LoadoutType,
} from "models/Loadout.model";
import { GearType } from "models/Gear.model";
import { WeaponModType, WeaponRange, WeaponType } from "models/Weapon.model";
import { Dice } from "models/Dice.model";

interface CharacterLoadouts {
  Casual: Loadout;
  Combat: Loadout;
}

type Attributes = {
  [key in AttributeName]: Attribute;
};
export interface Character {
  name: string;
  species: string;
  ship: string;
  attributes: Attributes;
  experiences: Experience[];
  loadouts: CharacterLoadouts;
  Aspects: Facet[];
  Tactics: Facet[];
  shields: { current: number; max: number };
  armor: { current: number; max: number };
}

export function buildCharacter(): Character {
  return {
    name: "",
    species: "",
    ship: "",
    attributes: {
      [AttributeName.Physique]: { value: 0, xp: 0 },
      [AttributeName.Reflex]: { value: 0, xp: 0 },
      [AttributeName.Discipline]: { value: 0, xp: 0 },
      [AttributeName.Wits]: { value: 0, xp: 0 },
    },
    experiences: [
      buildExperience(""),
      buildExperience(""),
      buildExperience(""),
    ],
    loadouts: { Casual: initCasualLoadout(), Combat: initCombatLoadout() },
    Aspects: [],
    Tactics: [],
    shields: { current: 8, max: 8 },
    armor: { current: 4, max: 4 },
  };
}

export function mockCharacter(): Character {
  return {
    name: "Drodger Cardbourde",
    species: "Human",
    ship: "Scrap on the Rocks",
    attributes: {
      [AttributeName.Physique]: { value: 2, xp: 4 },
      [AttributeName.Reflex]: { value: 4, xp: 1 },
      [AttributeName.Discipline]: { value: 3, xp: 0 },
      [AttributeName.Wits]: { value: 0, xp: 8 },
    },
    experiences: [
      {
        experience: "vulputate sit amet enim eget, ultrices hendrerit leo.",
      },
      {
        experience: "Cras ac tempus augue",
      },
      {
        experience: "Donec felis nun",
      },
    ],
    loadouts: {
      Casual: {
        type: LoadoutType.Casual,
        weapons: [
          {
            name: "Wand",
            type: WeaponType.Amp,
            range: WeaponRange.Medium,
            ammo: 4,
            damage: Dice.d6,
            mods: [],
            trait: undefined,
          },
        ],
        gear: [
          {
            type: GearType.UtilityItem,
            name: "Dingus Dangus Dongus",
            description:
              "Cras ac tempus augue. Pellentesque in gravida justo. Duis ut libero tincidunt, placerat dolor quis, cursus tortor.",
          },
        ],
      },
      Combat: {
        type: LoadoutType.Combat,
        weapons: [
          {
            name: "Assault Rifle",
            type: WeaponType.Rifle,
            range: WeaponRange.Long,
            ammo: 10,
            damage: Dice.d10,
            mods: [
              {
                name: "Holo-Targeter",
                type: WeaponModType.Scope,
                description:
                  "When you attack with this weapon, the target gains off-guard tokens equal to your Arsenal tier after the attack.",
              },
              {
                name: "Ricochet Rounds",
                type: WeaponModType.Ammo,
                description:
                  "When you miss an attack with this weapon, you may have the attack hit another enemy in the same zone. If you do, the attack deals half damage.",
              },
            ],
            trait: {
              name: "High Crit",
              description:
                "This weapon deals 2 additional damage dice on a crit instead of 1.",
            },
          },
          {
            name: "Handgun",
            type: WeaponType.Pistol,
            range: WeaponRange.Medium,
            ammo: 4,
            damage: Dice.d6,
            mods: [],
            trait: undefined,
          },
        ],
        gear: [
          {
            name: "Lorem ipsum",
            description: "dolor sit amet, consectetur adipiscing elit.",
            type: GearType.Grenade,
          },
          {
            name: " Cras purus enim",
            description:
              "vulputate sit amet enim eget, ultrices hendrerit leo.",
            type: GearType.UtilityItem,
          },
        ],
      },
    },
    Aspects: [
      {
        name: "Mechanic",
        ability: "Duct Tape",
        description:
          "You can attempt to repair a damaged machine or vehicle. Spend 1 supply and roll WITS.\n  \n  \n**Full Success:** The machine is no longer damaged.\n  \n  \n**Partial Success:** The machine may act as if it were not damaged until the end of the mission, but someone still needs to use the Recover downtime action to repair it fully.\n  \n  \n**Failure:** There isn’t anything that can be done for this damage.",
        upgrades: [
          {
            upgrade: "Grounded",
            description:
              "Whenever you fix something or interface with potentially dangerous technology, you gain a <Blue>protection token</Blue>.",
          },
        ],
      },
      {
        name: "Mechanic",
        ability: "Duct Tape",
        description:
          "You can attempt to repair a damaged machine or vehicle. Spend 1 supply and roll WITS.\n  \n  \n**Full Success:** The machine is no longer damaged.\n  \n  \n**Partial Success:** The machine may act as if it were not damaged until the end of the mission, but someone still needs to use the Recover downtime action to repair it fully.\n  \n  \n**Failure:** There isn’t anything that can be done for this damage.",
        upgrades: [
          {
            upgrade: "Grounded",
            description:
              "Whenever you fix something or interface with potentially dangerous technology, you gain a <Blue>protection token</Blue>.",
          },
        ],
      },
    ],
    Tactics: [
      {
        name: "Mechanic",
        ability: "Duct Tape",
        description:
          "You can attempt to repair a damaged machine or vehicle. Spend 1 supply and roll WITS.\n  \n  \n**Full Success:** The machine is no longer damaged.\n  \n  \n**Partial Success:** The machine may act as if it were not damaged until the end of the mission, but someone still needs to use the Recover downtime action to repair it fully.\n  \n  \n**Failure:** There isn’t anything that can be done for this damage.",
        upgrades: [
          {
            upgrade: "Grounded",
            description:
              "Whenever you fix something or interface with potentially dangerous technology, you gain a <Blue>protection token</Blue>.",
          },
        ],
      },
      {
        name: "Mechanic",
        ability: "Duct Tape",
        description:
          "You can attempt to repair a damaged machine or vehicle. Spend 1 supply and roll WITS.\n  \n  \n**Full Success:** The machine is no longer damaged.\n  \n  \n**Partial Success:** The machine may act as if it were not damaged until the end of the mission, but someone still needs to use the Recover downtime action to repair it fully.\n  \n  \n**Failure:** There isn’t anything that can be done for this damage.",
        upgrades: [
          {
            upgrade: "Grounded",
            description:
              "Whenever you fix something or interface with potentially dangerous technology, you gain a <Blue>protection token</Blue>.",
          },
        ],
      },
    ],
    shields: {
      current: 8,
      max: 8,
    },
    armor: {
      current: 4,
      max: 4,
    },
    // tokens: {
    //   AccurateMisfire: "",
    //   "DodgeOff-Guard": "",
    //   EmpoweredWeakened: "",
    //   FleetImmobilized: "",
    //   FortifiedVulnerable: "",
    //   OverwatchJammed: "",
    //   RegenBurn: "",
    // },
    // armor: {
    //   current: 4,
    // },
    // mp: {
    //   current: 4,
    // },
    // supplies: {
    //   current: 10,
    // },
  };
}
