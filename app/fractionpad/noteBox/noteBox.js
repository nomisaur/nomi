import React, { useState } from "react";

import { Fraction } from "../frations";

import { displayNumber } from "../utils";

import { PlayNote } from "../playNote";
import styles from "../styles.module.css";

const toHexString = (n) => {
  const nString = n.toString(16);
  return nString.length < 2 ? "0" + nString : nString;
};

const toColorString = (r, g, b) => {
  return "#" + toHexString(r) + toHexString(g) + toHexString(b);
};

export const NoteBox = ({
  playing,
  root,
  ratio: [top, bottom] = [],
  color: [red, green, blue] = [],
  onMouseDown,
  onMouseUp,
  ...props
}) => {
  const frequency = (root * top) / bottom;

  const [volume, setVolume] = useState(1);

  const keyColor = toColorString(red, green, blue);
  const volumeColor = toColorString(
    Math.max(0, red - 32),
    green,
    Math.max(0, blue - 32)
  );

  return (
    <div className={styles.noteBoxContainer}>
      <div className={styles.volumeBox}>
        <input
          className={styles.volume}
          style={{ background: volumeColor }}
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
      <div
        className={styles.keybox}
        style={{ background: keyColor }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <div>&nbsp;</div>
        <div className={styles.noteFraction}>
          <Fraction top={top} bottom={bottom} />
        </div>
        <div className={styles.noteFreq}>{displayNumber(frequency)}</div>

        <PlayNote
          playing={playing}
          frequency={frequency}
          volume={volume}
          {...props}
        />
      </div>
    </div>
  );
};
