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

export const useCountEffect = (func, deps = []) => {
  const count = useRef(0);
  const cleanup = useRef(() => {});
  useEffect(() => {
    cleanup.current = func(count.current);
    count.current = count.current + 1;
    return cleanup.current;
  }, deps);
};

export const useDidMountEffect = (func, deps = []) => {
  useCountEffect((count) => {
    if (count > 0) {
      console.log("hello", count);
      return func();
    }
  }, deps);
};
