import { useGunGirlContext } from "../state";
export const Chapter1 = () => {
  const { state, handleState } = useGunGirlContext();
  return <div>chapter 1</div>;
};
