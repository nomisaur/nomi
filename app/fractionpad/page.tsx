"use client";
import React, { useState, useEffect } from "react";
import { MusicContext } from "./hooks";

import { NoteGrid } from "./noteGrid";
import { VolumeSlider } from "./volumeSlider";
import { Visualizer } from "./visualizer";

export default function Page() {
  const [audioCtx] = useState(new AudioContext());
  const [masterGain] = useState(audioCtx.createGain());
  const [analyser] = useState(audioCtx.createAnalyser());

  useEffect(() => {
    masterGain.connect(analyser);
    analyser.connect(audioCtx.destination);
  }, []);

  return (
    <MusicContext.Provider value={{ audioCtx, masterGain, analyser }}>
      <Visualizer />
      <VolumeSlider />
      <NoteGrid />
    </MusicContext.Provider>
  );
}
