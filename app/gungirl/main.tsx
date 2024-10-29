import { useGunGirlContext, save } from "./state";
import * as chaptersObj from "./chapters";
import { Flipper } from "./components/flipper";

const chapters = Object.entries(chaptersObj)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([_, chapter]) => chapter);

export const Main = () => {
  const { state } = useGunGirlContext();
  return (
    <>
      <div className="flex justify-left p-4">
        <div className="max-w-prose">
          {chapters.map((Chapter, index) =>
            state.chapter === index ? <Chapter key={index} /> : null
          )}
        </div>
      </div>
      <Flipper />
    </>
  );
};
