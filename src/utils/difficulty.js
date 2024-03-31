import {
  getAttributeFromMemory,
  getBestAttribute,
  getRandomAttribute,
} from "../util";

export const getAttributeBasedOnDifficulty = (
  difficulty,
  selectedAttributes,
  memory,
  currentRound
) => {
  switch (difficulty) {
    case "easy":
      return getRandomAttribute();
    case "medium":
      return getBestAttribute(selectedAttributes);
    case "hard":
      console.log(
        "hard ...",
        getAttributeFromMemory(memory, currentRound, selectedAttributes)
      );
      return getAttributeFromMemory(
        memory,
        currentRound,
        selectedAttributes
      ) !== null
        ? getAttributeFromMemory(memory, currentRound, selectedAttributes)
        : getBestAttribute(selectedAttributes);
  }
};
