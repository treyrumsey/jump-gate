import { CharacterSummaryModel } from "~/models/CharacterSummary.model";

interface CharacterSummaries {
  [key: string]: CharacterSummaryModel;
}

export type PlayerModel = {
  uid: string;
  displayName: string;
  characters: CharacterSummaries;
};

interface Players {
  [key: string]: PlayerModel;
}

export type RoomModel = {
  id: string;
  ownerId: string;
  players: Players;
};
