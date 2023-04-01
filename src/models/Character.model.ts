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
import { ArmorModType } from "models/ArmorMod.model";

interface CharacterLoadouts {
  Casual: Loadout;
  Combat: Loadout;
}

type Attributes = {
  [key in AttributeName]: Attribute;
};

enum TokenPair {
  Accurate_Misfire = "AccurateMisfire",
  Dodge_OffGuard = "DodgeOff-Guard",
  Empowered_Weakened = "EmpoweredWeakened",
  Fleet_Immobilized = "FleetImmobilized",
  Fortified_Vulnerable = "FortifiedVulnerable",
  Overwatch_Jammed = "OverwatchJammed",
  Regen_Burn = "RegenBurn",
}

type TokenPairs = {
  [value in TokenPair]: number;
};

type Tokens = TokenPairs & { stunned: number };
interface StatusValue {
  current: number;
  max: number;
}
interface Status {
  shields: StatusValue;
  armor: StatusValue;
  stress: StatusValue;
  mp: StatusValue;
  supplies: StatusValue;
  shaken: boolean;
  wounded: boolean;
}
export interface Character {
  name: string;
  species: string;
  ship: string;
  attributes: Attributes;
  experiences: Experience[];
  loadouts: CharacterLoadouts;
  Aspects: Facet[];
  Tactics: Facet[];
  status: Status;
  tokens: Tokens;
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
    experiences: [buildExperience(""), buildExperience("")],
    loadouts: { Casual: initCasualLoadout(), Combat: initCombatLoadout() },
    Aspects: [],
    Tactics: [],
    status: {
      shields: { current: 8, max: 8 },
      armor: { current: 4, max: 4 },
      stress: { current: 0, max: 10 },
      mp: { current: 4, max: 4 },
      supplies: { current: 10, max: 10 },
      shaken: false,
      wounded: false,
    },
    tokens: {
      [TokenPair.Accurate_Misfire]: 0,
      [TokenPair.Dodge_OffGuard]: 0,
      [TokenPair.Empowered_Weakened]: 0,
      [TokenPair.Fleet_Immobilized]: 0,
      [TokenPair.Fortified_Vulnerable]: 0,
      [TokenPair.Overwatch_Jammed]: 0,
      [TokenPair.Regen_Burn]: 0,
      stunned: 0,
    },
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
            trait: [],
          },
        ],
        gear: [
          {
            type: GearType.UtilityItem,
            name: "Lorem Ipsum",
            description:
              "Cras ac tempus augue. Pellentesque in gravida justo. Duis ut libero tincidunt, placerat dolor quis, cursus tortor.",
          },
        ],
        armorMods: [],
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
            trait: [
              {
                name: "High Crit",
                description:
                  "This weapon deals 2 additional damage dice on a crit instead of 1.",
              },
            ],
          },
          {
            name: "Handgun",
            type: WeaponType.Pistol,
            range: WeaponRange.Medium,
            ammo: 4,
            damage: Dice.d6,
            mods: [],
            trait: [],
          },
        ],
        gear: [
          {
            name: "Flora Gypsum",
            description: "dolor sit amet, consectetur adipiscing elit.",
            type: GearType.Grenade,
          },
          {
            name: "Cras purus enim",
            description:
              "vulputate sit amet enim eget, ultrices hendrerit leo.",
            type: GearType.UtilityItem,
          },
        ],
        armorMods: [
          {
            name: "Hardened Shields",
            type: ArmorModType.Shields,
            description:
              "As long as your shields are up, you cannot gain <Red>vulnerable tokens</Red>.",
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
    status: {
      shields: { current: 8, max: 8 },
      armor: { current: 4, max: 4 },
      stress: { current: 0, max: 10 },
      mp: { current: 4, max: 4 },
      supplies: { current: 10, max: 10 },
      shaken: false,
      wounded: false,
    },
    tokens: {
      [TokenPair.Accurate_Misfire]: 1,
      [TokenPair.Dodge_OffGuard]: -3,
      [TokenPair.Empowered_Weakened]: 2,
      [TokenPair.Fleet_Immobilized]: 0,
      [TokenPair.Fortified_Vulnerable]: -2,
      [TokenPair.Overwatch_Jammed]: 3,
      [TokenPair.Regen_Burn]: -1,
      stunned: 3,
    },
  };
}
