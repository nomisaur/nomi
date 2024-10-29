import { useFlipper, useGunGirlContext } from "@/app/gungirl/state";
import * as chaptersObj from "../chapters";
const chapters = Object.entries(chaptersObj);

export const Flipper = () => {
  const { state } = useGunGirlContext();
  const { next, back } = useFlipper();

  return (
    <>
      <div className="h-10"></div>
      <div className="max-w-prose fixed bottom-0 w-full flex text-center bg-opacity-95 bg-black h-10">
        <div
          className="w-full bg-slate-900 ml-1 mr-1 mb-1 pt-2"
          onClick={() => state.chapter > 0 && back()}
        >
          {"<"}
        </div>
        <div className="ml-1 mr-1 mb-1 pt-2">{state.chapter}</div>
        <div
          className="w-full bg-slate-900 ml-1 mr-1 mb-1 pt-2"
          onClick={() => state.chapter < chapters.length - 1 && next()}
        >
          {">"}
        </div>
      </div>
    </>
  );
};
