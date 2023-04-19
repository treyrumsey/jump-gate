export interface Experience {
  name: string;
  description: string;
}

export const buildExperience = (experience: string) => {
  return { name: "", description: "" };
};
