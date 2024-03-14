import { attributeTypes } from "../constants/attributeTypes";
import { BBI } from "./BBI";

export const userWins = (user, computer, attribute) => {
  switch (attributeTypes[attribute]) {
    case "HIGH":
      return user[attribute] > computer[attribute];
    case "LOW":
      return (
        (user[attribute] === "-" ? 1000 : user[attribute]) <
        (computer[attribute] === "-" ? 1000 : computer[attribute])
      );
    case "SPL":
      let userBBI = BBI(user[attribute]);
      let computerBBI = BBI(computer[attribute]);
      return userBBI > computerBBI;
  }
};
