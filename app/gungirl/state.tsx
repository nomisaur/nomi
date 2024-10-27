import {
  useState,
  useEffect,
  useRef,
  useReducer,
  useContext,
  createContext,
} from "react";
import localForage from "localforage";
import _clone from "rfdc";
const clone = _clone();

export type State = {
  name?: string;
};

export const initialState: State = {};

export const log = (...args: any[]) => {
  if (true) {
    console.log(...args);
  }
};

export const GunGirlContext = createContext({});
export const useGunGirlContext = () => useContext(GunGirlContext);

type Handler = (state: State, payload: any) => State;

export const useFancyReducer = (
  initialState: State
): [State, (handler: Handler, payload?: any) => void] => {
  const [state, handleState] = useReducer(
    (state: State, [handler, payload]: [Handler, any]) => {
      const clonedState = clone(state);
      const newState = handler(clonedState, payload);
      const handlerName = handler.name || "anonymous handler";
      log(`state change (${handlerName})`, newState);
      save(newState, `saved on ${handlerName}`);
      return newState;
    },
    initialState
  );
  return [
    state,
    (handler: Handler, payload: any) => handleState([handler, payload]),
  ];
};

const stateKey = "savedState";

const save = (state: State, message = "saved") => {
  localForage
    .setItem(stateKey, state)
    .then(() => log(message))
    .catch(log);
};

export const load = (loader: (state: unknown) => void) => {
  localForage
    .getItem(stateKey)
    .then((savedState) => loader(savedState))
    .catch(log);
};
