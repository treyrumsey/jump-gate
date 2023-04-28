export type GameModel = {
  characters: { [key: string]: string };
  name: string;
  owner: string;
  ownerName: string;
  players: { [key: string]: string };
};

export const buildGame = (): GameModel => {
  return {
    characters: {},
    name: "",
    owner: "",
    ownerName: "",
    players: {},
  };
};
