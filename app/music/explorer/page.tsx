"use client";
import React, { useState, useEffect } from "react";
import { MusicContext } from "./hooks";

export default function Page() {
  const [audioCtx, setAudioCtx] = useState<AudioContext | undefined>();
  const [masterGain, setMasterGain] = useState<GainNode | undefined>();
  const [analyzer, setAnalyzer] = useState<AnalyserNode | undefined>();

  useEffect(() => {
    const audioCtx = new AudioContext();
    const masterGain = audioCtx.createGain();
    const analyzer = audioCtx.createAnalyser();
    setAudioCtx(audioCtx);
    setMasterGain(masterGain);
    setAnalyzer(analyzer);
    masterGain.connect(analyzer);
    analyzer.connect(audioCtx.destination);
  }, []);

  if (!audioCtx || !masterGain || !analyzer) return null;

  return (
    <MusicContext.Provider value={{ audioCtx, masterGain, analyzer }}>
      {/* <Visualizer /> */}
      {/* <VolumeSlider /> */}
      <NoteGrid />
    </MusicContext.Provider>
  );
}
