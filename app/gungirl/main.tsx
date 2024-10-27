import { useGunGirlContext } from "./state";
import { chapters } from "./chapters";

export const Main = () => {
  const { state } = useGunGirlContext();
  return chapters[state.chapter]();
};
