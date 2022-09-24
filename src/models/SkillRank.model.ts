export interface SkillRank {
  name: string;
  bonus: number;
}

const Trained: SkillRank = { name: "Trained", bonus: 10 };
const Expert: SkillRank = { name: "Expert", bonus: 15 };
const Master: SkillRank = { name: "Master", bonus: 20 };

const SkillRanks = {
  Trained: Trained,
  Expert: Expert,
  Master: Master,
} as const;

export default SkillRanks;
