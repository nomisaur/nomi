import { useGunGirlContext } from "@/app/gungirl/state";
import { ReactNode } from "react";

export const Title: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state } = useGunGirlContext();
  return (
    <div className="pb-4 w-auto flex justify-center">
      <div className="text-center">
        <div className="text-4xl">{children}</div>
        <div className="text-sm italic">Chapter {state.chapter}</div>
      </div>
    </div>
  );
};
