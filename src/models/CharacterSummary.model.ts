import { generateUUID } from "~/lib/utilities/GenerateUUID";
import { AttributeName } from "~/models/Attribute.model";
import {
  Attributes,
  Status,
  TokenPair,
  TokensModel,
} from "~/models/Character.model";

export type CharacterSummaryModel = {
  id: string;
  name: string;
  species: string;
  attributes: Attributes;
  status: Status;
  tokens: TokensModel;
  schemaVersion: number;
};

export function mockCharacterSummary(): CharacterSummaryModel {
  return {
    id: generateUUID(),
    name: "Drodger Cardbourde",
    species: "Human",
    attributes: {
      [AttributeName.Physique]: { value: 2, xp: 4 },
      [AttributeName.Reflex]: { value: 4, xp: 1 },
      [AttributeName.Discipline]: { value: 3, xp: 0 },
      [AttributeName.Wits]: { value: 0, xp: 8 },
    },
    status: {
      casual: {
        shields: { current: 4, max: 4 },
        armor: { current: 2, max: 2 },
        mp: { current: 2, max: 2 },
      },
      combat: {
        shields: { current: 8, max: 8 },
        armor: { current: 4, max: 4 },
        mp: { current: 0, max: 0 },
      },
      stress: { current: 0, max: 10 },
      supplies: { current: 5, max: 5 },
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
    schemaVersion: 1,
  };
}
