import { useState } from "react";
import { useChapter, useGunGirlContext } from "../state";

export const Clicker = ({
  children,
  onClick,
  className = "",
  id,
  ...rest
}: {
  id: string;
  children: any;
  onClick?: () => void;
  className?: string;
  [x: string]: any;
}) => {
  const { state, handleState } = useGunGirlContext();

  return (
    <button
      onClick={() => {
        handleState((state) => {
          state[state.chapter] = {
            ...state[state.chapter],
            clickedButtons: {
              ...(state[state.chapter]?.clickedButtons ?? {}),
              [id]: true,
            },
          };
          return state;
        });
        onClick?.();
      }}
      className={`${className} ${
        state[state.chapter]?.clickedButtons?.[id]
          ? "border-white"
          : "border-transparent"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};
