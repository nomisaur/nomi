import { useEffect, useRef } from "react";
import { useMusicContext } from "../hooks";

type WaveType = "sine" | "square" | "sawtooth" | "triangle" | "custom";

export const PlayWave = ({
  playing,
  freq,
  volume = 1,
  envelope: {
    attack = 0.01,
    decay = 0.05,
    sustain = 0.5,
    release = 2,
    peak = 1,
  } = {},
  type = "sine",
}: {
  playing: boolean;
  freq: number;
  volume?: number;
  envelope?: {
    attack?: number;
    decay?: number;
    sustain?: number;
    release?: number;
    peak?: number;
  };
  type?: WaveType;
}) => {
  const { audioCtx, masterGain } = useMusicContext();

  const oscRef = useRef<OscillatorNode>();
  const envGainRef = useRef<GainNode>();
  const noteGainRef = useRef<GainNode>();

  const decayTime = attack + decay;
  const stopTime = decayTime + release;
  const sustainVolume = sustain || 0.00000001;
  const peakVolume = peak || 0.00000001;
  const noteVolume = volume || 0.00000001;

  useEffect(() => {
    const stop = () => {
      const osc = oscRef.current;
      const envGain = envGainRef.current;

      const currentTime = audioCtx?.currentTime ?? Date.now();

      envGain?.gain?.setValueAtTime(sustainVolume, currentTime + decayTime);
      envGain?.gain?.exponentialRampToValueAtTime(
        0.00000001,
        currentTime + stopTime
      );
      osc?.stop?.(currentTime + stopTime);
    };

    if (playing) {
      oscRef.current = audioCtx?.createOscillator();
      envGainRef.current = audioCtx?.createGain();
      noteGainRef.current = audioCtx?.createGain();

      const osc = oscRef.current;
      const envGain = envGainRef.current;
      const noteGain = noteGainRef.current;

      osc.type = type;

      if (envGain) osc?.connect(envGain);
      if (noteGain) envGain?.connect(noteGain);
      if (masterGain) noteGain?.connect(masterGain);

      const currentTime = audioCtx?.currentTime ?? Date.now();

      noteGain?.gain.setValueAtTime(noteVolume, currentTime);
      osc?.frequency.setValueAtTime(freq, currentTime);
      envGain?.gain.setValueAtTime(0, currentTime);
      envGain?.gain.linearRampToValueAtTime(peakVolume, currentTime + attack);
      envGain?.gain.exponentialRampToValueAtTime(
        sustainVolume,
        currentTime + decayTime
      );

      osc?.start(currentTime);
    } else {
      stop();
    }
    return () => {
      playing && stop();
    };
  }, [playing]);

  useEffect(() => {
    const osc = oscRef.current;
    const currentTime = audioCtx?.currentTime ?? Date.now();
    if (osc?.frequency) {
      osc.frequency.linearRampToValueAtTime(freq, currentTime + 0.05);
    }
  }, [freq]);

  useEffect(() => {
    const noteGain = noteGainRef.current;
    const currentTime = audioCtx?.currentTime ?? Date.now();
    if (noteGain?.gain) {
      noteGain.gain.linearRampToValueAtTime(noteVolume, currentTime + 0.05);
    }
  }, [volume]);

  return null;
};
