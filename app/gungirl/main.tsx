"use client";
import { useGunGirlContext } from "./state";
export const Main = () => {
  const context = useGunGirlContext();
  console.log(context);
  return <div>hi</div>;
};
