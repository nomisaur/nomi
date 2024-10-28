import { useGunGirlContext } from "./state";
import { chapters } from "./chapters";

export const Main = () => {
  const { state } = useGunGirlContext();
  return (
    <div className="flex justify-center">
      <div className="max-w-prose">{chapters[state.chapter]()}</div>
    </div>
  );
};
