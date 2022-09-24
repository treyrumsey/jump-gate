export interface Attribute {
  name: string;
  value: number;
  xp: number;
}

export const initAttribute: (name: string) => Attribute = (name: string) => {
  return { name, value: 0, xp: 0 };
};
