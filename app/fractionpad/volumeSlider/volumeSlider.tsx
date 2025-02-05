import React, { useState, useEffect } from "react";
import { useMusicContext } from "../hooks";
import { initialVolume } from "../config";
import styles from "../styles.module.css";

export const VolumeSlider = () => {
  const { audioCtx, masterGain } = useMusicContext();
  const [volume, setVolume] = useState(initialVolume);

  useEffect(() => {
    masterGain?.gain.linearRampToValueAtTime(
      volume,
      (audioCtx?.currentTime ?? Date.now()) + 0.05
    );
  }, [volume]);

  return (
    <div className={styles.Slider}>
      volume:
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />
    </div>
  );
};
