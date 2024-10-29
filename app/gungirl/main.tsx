import { useGunGirlContext, save } from "./state";
import * as chaptersObj from "./chapters";

const chapters = Object.entries(chaptersObj)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([_, chapter]) => chapter);

export const Main = () => {
  const { state } = useGunGirlContext();
  return (
    <div className="flex justify-left">
      <div className="max-w-prose">
        {chapters.map((Chapter, index) =>
          state.chapter === index ? <Chapter key={index} /> : null
        )}
      </div>
    </div>
  );
};
