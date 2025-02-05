import { useState, useEffect, useContext, createContext, useRef } from "react";

export const MusicContext = createContext<{
  audioCtx?: AudioContext;
  masterGain?: GainNode;
  analyser?: AnalyserNode;
}>({});
export const useMusicContext = () => useContext(MusicContext);

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
