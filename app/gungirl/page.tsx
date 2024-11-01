"use client";
import { useState, useEffect } from "react";
import {
  useFancyReducer,
  initialState,
  load,
  save,
  log,
  State,
  GunGirlContext,
} from "./state";
import { Main } from "./main";

declare global {
  interface Window {
    clearSave: () => void;
  }
}

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [state, handleState] = useFancyReducer(initialState);

  useEffect(() => {
    load((savedState) => {
      if (savedState) {
        log("loaded:", savedState);
        handleState(() => savedState as State);
      } else {
        log("no save data");
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.clearSave = () => {
        window.indexedDB.deleteDatabase("localforage");
        window.location.reload();
      };
    }
  }, []);

  useEffect(() => {
    save(state);
  }, [state]);

  return loading ? (
    <div>gun girl</div>
  ) : (
    <GunGirlContext.Provider value={{ state, handleState }}>
      <Main />
    </GunGirlContext.Provider>
  );
}
