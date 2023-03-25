import { Facet } from "models/Facet.model";
import { Attribute, initAttribute } from "models/Attribute.model";
import { buildExperience, Experience } from "models/Experience.model";
import {
  initCasualLoadout,
  initCombatLoadout,
  Loadout,
  LoadoutType,
} from "models/Loadout.model";
import { GearType } from "models/Gear.model";

interface CharacterLoadouts {
  Casual: Loadout;
  Combat: Loadout;
}
export interface Character {
  name: string;
  species: string;
  ship: string;
  physique: Attribute;
  reflex: Attribute;
  discipline: Attribute;
  wits: Attribute;
  experiences: Experience[];
  loadouts: CharacterLoadouts;
  Aspects: Facet[];
  Tactics: Facet[];
  shields: { current: number; max: number };
}

export function buildCharacter(): Character {
  return {
    name: "",
    species: "",
    ship: "",
    physique: initAttribute("Physique"),
    reflex: initAttribute("Reflex"),
    discipline: initAttribute("Discipline"),
    wits: initAttribute("Wits"),
    experiences: [
      buildExperience(""),
      buildExperience(""),
      buildExperience(""),
    ],
    loadouts: { Casual: initCasualLoadout(), Combat: initCombatLoadout() },
    Aspects: [],
    Tactics: [],
    shields: { current: 8, max: 8 },
  };
}

export function mockCharacter(): Character {
  return {
    name: "",
    species: "",
    ship: "",
    physique: {
      name: "Physique",
      value: 0,
      xp: 0,
    },
    reflex: {
      name: "Reflex",
      value: 0,
      xp: 0,
    },
    discipline: {
      name: "Discipline",
      value: 0,
      xp: 0,
    },
    wits: {
      name: "Wits",
      value: 0,
      xp: 0,
    },
    experiences: [
      {
        experience: "",
      },
      {
        experience: "",
      },
      {
        experience: "",
      },
    ],
    loadouts: {
      Casual: {
        type: LoadoutType.Casual,
        weapons: [
          {
            name: "",
            type: undefined,
            range: undefined,
            ammo: undefined,
            damage: undefined,
            mods: [],
            trait: undefined,
          },
        ],
        gear: [
          {
            type: GearType.UtilityItem,
            name: "",
            description: "",
          },
        ],
      },
      Combat: {
        type: LoadoutType.Combat,
        weapons: [
          {
            name: "",
            type: undefined,
            range: undefined,
            ammo: undefined,
            damage: undefined,
            mods: [],
            trait: undefined,
          },
          {
            name: "",
            type: undefined,
            range: undefined,
            ammo: undefined,
            damage: undefined,
            mods: [],
            trait: undefined,
          },
        ],
        gear: [
          {
            name: "",
            description: "",
            type: undefined,
          },
          {
            name: "",
            description: "",
            type: undefined,
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
    ],
    shields: {
      current: 8,
      max: 8,
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
