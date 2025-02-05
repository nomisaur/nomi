import { useState, useEffect, useContext, createContext, useRef } from "react";

export const MusicContext = createContext<{
  audioCtx: AudioContext;
  masterGain: GainNode;
  analyzer: AnalyserNode;
} | null>(null);
export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("no context dude");
  }
  return context;
};
