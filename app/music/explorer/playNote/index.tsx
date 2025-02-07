import { PlayWave } from "../playWave";

type WaveType = "sine" | "square" | "sawtooth" | "triangle" | "custom";

export const PlayNote = ({
  playing,
  waves = [],
}: {
  playing: boolean;
  waves: {
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
  }[];
}) => {
  return waves.map((wave, index) => (
    <PlayWave key={index} playing={playing} {...wave} />
  ));
};
