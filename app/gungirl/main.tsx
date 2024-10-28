import { useGunGirlContext } from "./state";
import { chapters } from "./chapters";

export const Main = () => {
  const { state } = useGunGirlContext();
  return (
    <div className="flex justify-center">
      <div className="max-w-prose">
        {chapters.map((Chapter, index) =>
          state.chapter === index ? <Chapter key={index} /> : null
        )}
      </div>
    </div>
  );
};
