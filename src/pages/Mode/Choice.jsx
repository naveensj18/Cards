import { useLocation } from "react-router-dom";
import Game from "../GamePage/Game";

export const Choice = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const difficulty = searchParams.get("difficulty");
  const numberOfCards = Number(searchParams.get("numberOfCards"));
  return <Game difficulty={difficulty} numberOfCards={numberOfCards} />;
};
