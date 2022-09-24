export interface Skill {
  name: string;
  rank: number;
}

export function buildSkills(): Skill[] {
  const skills = [];
  skills.push(buildSkill("Administer", -1));

  return skills;
}

function buildSkill(name: string, rank: number): Skill {
  return {
    name: name,
    rank: rank,
  };
}
