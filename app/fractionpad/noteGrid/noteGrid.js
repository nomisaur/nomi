import React, { useState } from "react";

import { list, reduceFraction } from "../utils";
import { useMusicContext } from "../hooks";
import {
  rootFrequency,
  noteGridSize,
  initialToggleMode,
  initialLongRelease,
  initialLowerMode,
} from "../config";

import { GridNote } from "./gridNote";
import styles from "../styles.module.css";

export const NoteGrid = () => {
  const { audioCtx, masterGain } = useMusicContext();

  const [root, setRoot] = useState(rootFrequency);
  const [gridSize, setGridSize] = useState(noteGridSize);
  const [toggleMode, setToggleMode] = useState(initialToggleMode);
  const [longRelease, setLongRelease] = useState(initialLongRelease);
  const [lowerMode, setLowerMode] = useState(initialLowerMode);
  const [notesPlaying, setNotesPlaying] = useState({});

  const realGridSize = Math.min(gridSize || 1, 32);
  const ratios = list(realGridSize, (a) =>
    list(realGridSize, (b) => [b + 1, a + 1])
  );
  return (
    <div>
      <div className={styles.gridOptions}>
        <div>
          root frequency:
          <input
            type="number"
            value={root}
            min="1"
            max="2000"
            step="1"
            onChange={(e) => {
              const num = parseInt(e.target.value);
              setRoot(Number.isNaN(num) ? "" : num);
            }}
          />
          <input
            type="range"
            value={root}
            min="1"
            max="800"
            step="1"
            onChange={(e) => {
              const num = parseInt(e.target.value);
              setRoot(Number.isNaN(num) ? "" : num);
            }}
          />
        </div>
        <div>
          grid size:
          <input
            type="number"
            value={gridSize}
            min="1"
            max="32"
            onChange={(e) => {
              const num = parseInt(e.target.value);
              setGridSize(Number.isNaN(num) ? "" : num);
            }}
          />
        </div>
        <div>
          long release:
          <input
            type="checkbox"
            checked={longRelease}
            onChange={(e) => setLongRelease(e.target.checked)}
          />
        </div>
        <div>
          toggle mode:
          <input
            type="checkbox"
            checked={toggleMode}
            onChange={(e) => setToggleMode(e.target.checked)}
          />
        </div>
        <div>
          lower mode:
          <input
            type="checkbox"
            checked={lowerMode}
            onChange={(e) => setLowerMode(e.target.checked)}
          />
        </div>
      </div>
      {ratios.map((row, i1) => (
        <div key={i1} className={styles.row}>
          {row.map(([top, bottom], i2) => {
            const ratio = [lowerMode ? top : top + bottom - 1, bottom];
            const reducedRatio = reduceFraction(ratio);
            const noteId = `${ratio[0]},${ratio[1]}`;
            const ratioId = `${reducedRatio[0]},${reducedRatio[1]}`;
            return (
              <GridNote
                key={i2}
                ratio={ratio}
                reducedRatio={reducedRatio}
                noteId={noteId}
                ratioId={ratioId}
                audioCtx={audioCtx}
                masterGain={masterGain}
                root={root || 1}
                gridSize={realGridSize}
                toggleMode={toggleMode}
                longRelease={longRelease}
                lowerMode={lowerMode}
                notesPlaying={notesPlaying}
                setNotesPlaying={setNotesPlaying}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
