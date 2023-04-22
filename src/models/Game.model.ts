export type GameModel = {
  characters: { [key: string]: string };
  name: string;
  owner: string;
  players: { [key: string]: string };
};
