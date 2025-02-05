"use client";
// window.AudioContext = window.AudioContext || window.webkitAudioContext;
import React, { useState, useEffect } from "react";
import { MusicContext } from "./hooks";

import { NoteGrid } from "./noteGrid";
import { VolumeSlider } from "./volumeSlider";
import { Visualizer } from "./visualizer";

export default function Page() {
  const [audioCtx, setAudioCtx] = useState<AudioContext | undefined>();
  const [masterGain, setMasterGain] = useState<GainNode | undefined>();
  const [analyser, setAnalyser] = useState<AnalyserNode | undefined>();

  useEffect(() => {
    const audioCtx = new AudioContext();
    const masterGain = audioCtx.createGain();
    const analyser = audioCtx.createAnalyser();
    setAudioCtx(audioCtx);
    setMasterGain(masterGain);
    setAnalyser(analyser);
    masterGain.connect(analyser);
    analyser.connect(audioCtx.destination);
  }, []);

  const loaded = Boolean(audioCtx && masterGain && analyser);

  return (
    loaded && (
      <MusicContext.Provider value={{ audioCtx, masterGain, analyser }}>
        <Visualizer />
        <VolumeSlider />
        <NoteGrid />
      </MusicContext.Provider>
    )
  );
}
