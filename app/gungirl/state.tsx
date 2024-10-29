import { useReducer, useContext, createContext } from "react";
import localForage from "localforage";
import _clone from "rfdc";
const clone = _clone();

export type AnyObj = {
  [key: string]: any;
  [key: number]: any;
  [key: symbol]: any;
};

export type State = {
  name?: string;
  pronouns?: string;
  chapter: number;
  [key: number]: AnyObj;
};

export type Handler = (state: State, payload: any) => State;
export type HandleState = (handler: Handler, payload?: any) => void;

export const initialState: State = { chapter: 0 };

export const log = (...args: any[]) => {
  if (true) {
    console.log(...args);
  }
};

export const GunGirlContext = createContext<{
  state: State;
  handleState: HandleState;
}>({
  state: initialState,
  handleState: () => {},
});
export const useGunGirlContext = () => useContext(GunGirlContext);

export const useFlipper = () => {
  const { state, handleState } = useGunGirlContext();
  const next = () => {
    handleState((state) => {
      state.chapter = state.chapter + 1;
      return state;
    });
  };
  const back = () => {
    handleState((state) => {
      state.chapter = state.chapter - 1;
      return state;
    });
  };
  return { next, back };
};

export const useChapter = (initialState: AnyObj) => {
  const { state, handleState } = useGunGirlContext();
  const chapterState = state[state.chapter] ?? initialState;
  const setChapterState = (key: any, value: any) =>
    handleState((state) => {
      state[state.chapter] = {
        ...chapterState,
        [key]: value,
      };
      return state;
    });
  return { chapterState, setChapterState };
};

export const useFancyReducer = (initialState: State): [State, HandleState] => {
  const [state, handleState] = useReducer(
    (state: State, [handler, payload]: [Handler, any]) =>
      handler(clone(state), payload),
    initialState
  );
  return [
    state,
    (handler: Handler, payload: any) => handleState([handler, payload]),
  ];
};

const stateKey = "save";

export const save = (state: State) => {
  localForage
    .setItem(stateKey, state)
    .then(() => log("saved:", state))
    .catch(log);
};

export const load = (loader: (state: unknown) => void) => {
  localForage
    .getItem(stateKey)
    .then((savedState) => loader(savedState))
    .catch(log);
};
