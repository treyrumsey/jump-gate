import { generateUUID } from "~/lib/utilities/GenerateUUID";
import { Character, mockCharacter } from "~/models/Character.model";

export type GameIds = {
  [key: string]: string;
};

export type UserGames = {
  owned: { [key: string]: string };
  joined: { [key: string]: string };
};

export type UserModel = {
  uid: string;
  characters?: {
    [key: string]: Character;
  };
  games: UserGames;
};

const mockUser: UserModel = {
  uid: generateUUID(),
  characters: {
    [generateUUID()]: mockCharacter(),
  },
  games: {
    owned: {
      [generateUUID()]: "Test Game",
    },
    joined: {
      [generateUUID()]: "Test Game",
    },
  },
};
