export enum AttributeName {
  Physique = "Physique",
  Reflex = "Reflex",
  Discipline = "Discipline",
  Wits = "Wits",
}

export interface Attribute {
  value: number;
  xp: number;
}
