export interface Experience {
  name: string;
  description: string;
}

export const buildExperience = (experience: string) => {
  return { name: "Experience", description: `Description of ${experience}` };
};
