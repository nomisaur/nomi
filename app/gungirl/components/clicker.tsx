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
  const key = `${state.chapter}-${id}`;

  return (
    <button
      onClick={() => {
        handleState((state) => {
          state.clickedButtons = {
            ...state.clickedButtons,
            [key]: true,
          };
          return state;
        });
        onClick?.();
      }}
      className={`${className} ${
        state.clickedButtons[key] ? "border-white" : "border-transparent"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};
