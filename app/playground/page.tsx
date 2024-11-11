"use client";

import { useEffect } from "react";

const eq = (time, startState, func) =>
  time < 1
    ? startState
    : func((prev = (t) => t - 1) => eq(prev(time), startState, func));

const list = (n) => [...Array(n)].map((_, i) => i);

const graph = (startState, equation) =>
  list(10).map((t) => eq(t, startState, equation));

const functions = { eq, list, graph };

export default function Page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Object.entries(functions).forEach(([key, val]) => {
        window[key] = val;
      });

      window.clearSave = () => {
        window.indexedDB.deleteDatabase("localforage");
        window.location.reload();
      };
    }
  }, []);
  return <div></div>;
}
