import { getBestAttribute, getRandomAttribute } from "../util";

export const getAttributeBasedOnDifficulty = (
  difficulty,
  selectedAttributes
) => {
  switch (difficulty) {
    case "easy":
      return getRandomAttribute();
    case "medium":
      return getBestAttribute(selectedAttributes);
  }
};
