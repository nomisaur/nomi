"use client";
import { useGunGirlContext } from "./state";
import { chapters } from "./chapters";

export const Main = () => {
  const { state, handleState } = useGunGirlContext();
  return chapters[state.chapter]();
};
