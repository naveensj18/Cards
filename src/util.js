import { players } from "./constants/ipl";
import { attributeTypes } from "./constants/attributeTypes";
import { BBI } from "./utils/BBI";
import { memo } from "react";
import { userWins } from "./utils/userWins";

let availableAttributes = Object.keys(players[0].Attributes);
export function shuffleDeck(players) {
  const n = players.length;
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [players[i], players[j]] = [players[j], players[i]];
  }
  return players;
}

export function getRandomAttribute() {
  const random = Math.floor(Math.random() * availableAttributes.length);
  return availableAttributes[random];
}

const percentile = (selectedAttribute, selectedAttributeValue, attribute) => {
  switch (attributeTypes[attribute]) {
    case "HIGH":
      return (
        (100 *
          selectedAttribute.reduce(
            (acc, attributeValue) =>
              acc +
              (attributeValue < selectedAttributeValue ? 1 : 0) +
              (attributeValue === selectedAttributeValue ? 0.5 : 0),
            0
          )) /
        players.length
      );
    case "LOW":
      return (
        (100 *
          selectedAttribute.reduce(
            (acc, attributeValue) =>
              acc +
              ((attributeValue === "-" ? 1000 : attributeValue) >
              (selectedAttributeValue === "-" ? 1000 : selectedAttributeValue)
                ? 1
                : 0) +
              (attributeValue === selectedAttributeValue ? 0.5 : 0),
            0
          )) /
        players.length
      );
    case "SPL":
      return (
        (100 *
          selectedAttribute.reduce(
            (acc, attributeValue) =>
              acc +
              (BBI(attributeValue) < BBI(selectedAttributeValue) ? 1 : 0) +
              (attributeValue === selectedAttributeValue ? 0.5 : 0),
            0
          )) /
        players.length
      );
  }
};

export function getBestAttribute(selectedAttributes) {
  const attributesAndValues = {};
  const percentiles = [];
  for (var i = 0; i < availableAttributes.length; i++) {
    attributesAndValues[availableAttributes[i]] = players.map(
      (player) => player.Attributes[availableAttributes[i]]
    );
    percentiles[availableAttributes[i]] = percentile(
      attributesAndValues[availableAttributes[i]],
      selectedAttributes[availableAttributes[i]],
      availableAttributes[i]
    );
  }

  let maxKey = null;
  let maxValue = 0;

  for (const [key, value] of Object.entries(percentiles)) {
    if (value > maxValue) {
      maxKey = key;
      maxValue = value;
    }
  }

  return maxKey;
}

export function getAttributeFromMemory(
  memory,
  currentRound,
  computerCardAttributes
) {
  let userCardAttributes = memory[currentRound + 1];
  let best;
  console.log("current round ->", currentRound, "memory ->", memory);
  console.log(userCardAttributes);
  console.log(computerCardAttributes);
  if (currentRound + 1 in memory) {
    for (var i = 0; i < availableAttributes.length; i++) {
      if (
        userCardAttributes[availableAttributes[i]] ===
        computerCardAttributes[availableAttributes[i]]
      ) {
        best = availableAttributes[i];
      } else if (
        !userWins(
          userCardAttributes,
          computerCardAttributes,
          availableAttributes[i]
        )
      ) {
        return availableAttributes[i];
      }
    }
  }
  return best ? best : null;
}
