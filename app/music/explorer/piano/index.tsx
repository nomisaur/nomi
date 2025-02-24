import React, { useEffect, useState } from "react";
import { PlayNote } from "../playNote";

const TET_NOTES = [
  "c",
  "c#",
  "d",
  "d#",
  "e",
  "f",
  "f#",
  "g",
  "g#",
  "a",
  "a#",
  "b",
  "2c",
] as const;

const FRACTION_ROWS = 50;
const rowsToInclude = [
  // 7,9,10,11,
  8, 12, 16, 24,
];

type Fraction = [number, number];
const FRACTIONS = Array(FRACTION_ROWS)
  .fill(null)
  .map((_, i1) => {
    const bottom = i1 + 1;
    return Array(bottom + 1)
      .fill(null)
      .map((_, i2) => {
        const top = bottom + i2;
        return [top, bottom] as Fraction;
      });
  })
  .filter((_, index) => {
    const row = index + 1;
    return rowsToInclude.includes(row);
  });

type Note = string;

interface NoteData {
  note?: Note;
  freq?: number;
  color?: string;
}

const TET_CONSTANT = Math.pow(2, 1 / 12);
const MIDDLE_C = 440 * Math.pow(1 / TET_CONSTANT, 9);

const LAYOUT = {
  KeyZ: "c",
  KeyX: "d",
  KeyC: "e",
  KeyV: "f",
  KeyB: "g",
  KeyN: "a",
  KeyM: "b",
  Comma: "2c",
  KeyS: "c#",
  KeyD: "d#",
  KeyG: "f#",
  KeyH: "g#",
  KeyJ: "a#",
  KeyQ: "12/12",
  KeyW: "13/12",
  KeyE: "14/12",
  KeyR: "15/12",
  KeyT: "16/12",
  KeyY: "17/12",
  KeyU: "18/12",
  KeyI: "19/12",
  KeyO: "20/12",
  KeyP: "21/12",
  BracketLeft: "22/12",
  BracketRight: "23/12",
  Backslash: "24/12",
  Digit1: "8/8",
  Digit2: "8/8",
  Digit3: "9/8",
  Digit4: "10/8",
  Digit5: "10/8",
  Digit6: "11/8",
  Digit7: "12/8",
  Digit8: "12/8",
  Digit9: "13/8",
  Digit0: "14/8",
  Minus: "14/8",
  Equal: "15/8",
  Backspace: "16/8",
};

const getTetNotes = (root) =>
  TET_NOTES.reduce((acc: NoteData[], note: Note) => {
    const lastNote = acc.at(-1);
    return [
      ...acc,
      {
        note,
        color: (note.includes("#") ? "black" : "white") as "black" | "white",
        freq: lastNote?.freq ? lastNote.freq * TET_CONSTANT : root,
      },
    ];
  }, []);

const getFractionNotes = (root) =>
  FRACTIONS.map((row) =>
    row.reduce(
      (acc: NoteData[], [top, bottom]: Fraction) => [
        ...acc,
        { note: `${top}/${bottom}`, freq: (root * top) / bottom },
      ],
      []
    )
  );

const getTetOvertones = (root, volume, envelope) => {
  return [
    { freq: root, volume, envelope },
    { freq: root * Math.pow(TET_CONSTANT, 12), volume: volume / 2, envelope },
    { freq: root * Math.pow(TET_CONSTANT, 19), volume: volume / 3, envelope },
    { freq: root * Math.pow(TET_CONSTANT, 24), volume: volume / 4, envelope },
    { freq: root * Math.pow(TET_CONSTANT, 28), volume: volume / 5, envelope },
    { freq: root * Math.pow(TET_CONSTANT, 31), volume: volume / 6, envelope },
    { freq: root * Math.pow(TET_CONSTANT, 34), volume: volume / 7, envelope },
    { freq: root * Math.pow(TET_CONSTANT, 36), volume: volume / 8, envelope },
    // { freq: root * Math.pow(TET_CONSTANT, 38), volume: volume / 8, envelope },
  ];
};

const getOvertones = (root, volume, envelope) => {
  return [
    { freq: root, volume, envelope },
    { freq: root * 2, volume: volume / 2, envelope },
    { freq: root * 3, volume: volume / 3, envelope },
    { freq: root * 4, volume: volume / 4, envelope },
    { freq: root * 5, volume: volume / 5, envelope },
    { freq: root * 6, volume: volume / 6, envelope },
    { freq: root * 7, volume: volume / 7, envelope },
    { freq: root * 8, volume: volume / 8, envelope },
  ];
};

const displayNumber = (num) => {
  // return num;
  const string = num.toFixed(2);
  const [whole, decimal] = string.split(".");
  const dec = parseInt(decimal);
  return dec === 0 ? whole : `${whole}.${dec}`;
};

export const Piano = ({ active = true }) => {
  const [playingNotes, setPlayingNotes] = useState({});
  const setPlaying = (note, playing) => {
    setPlayingNotes({ ...playingNotes, [note]: playing });
  };
  const [root, setRoot] = useState(MIDDLE_C);
  const [tetNotes, setTetNotes] = useState(getTetNotes(root));
  const [fractionNotes, setFractionNotes] = useState(getFractionNotes(root));

  const [usingTetOvertones, setUsingTetOvertones] = useState(false);

  useEffect(() => {
    setTetNotes(getTetNotes(root));
    setFractionNotes(getFractionNotes(root));
  }, [root]);

  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (event) => {
      const note = LAYOUT[event.code];
      if (note && !playingNotes[note]) setPlaying(note, true);
    };
    const handleKeyUp = (event) => {
      const note = LAYOUT[event.code];
      if (note && playingNotes[note]) setPlaying(note, false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [active, playingNotes, setPlayingNotes, setPlaying]);

  const envelope = { release: 9 };

  const renderNote = ({ note, freq, color }: NoteData) => {
    if (!note || !freq) return null;
    const playing = Boolean(playingNotes[note]);
    return (
      <div
        key={note}
        className={`absolute p-1 size-16 border-2 border-solid ${
          playing ? "border-gray-100" : "border-gray-800"
        } ${
          color == "white"
            ? "bg-gray-400 h-32"
            : color == "black"
            ? "bg-gray-900"
            : playing
            ? "bg-teal-400"
            : "bg-blue-500"
        }`}
        style={{
          marginLeft: `calc(${((freq / root) * 100 - 100) * 0.9}% - 2rem)`,
        }}
        onMouseDown={() => setPlaying(note, !playing)}
        onMouseUp={() => setPlaying(note, false)}
      >
        <div>{note}</div>
        <div>{displayNumber(freq)}</div>
        <PlayNote
          playing={playing}
          waves={(usingTetOvertones ? getTetOvertones : getOvertones)(
            freq,
            1,
            envelope
          )}
        />
      </div>
    );
  };

  return (
    <div>
      <div>
        root:
        <input
          type="number"
          value={root}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!Number.isNaN(value)) setRoot(value);
          }}
        />
      </div>
      <div>
        TET overtones:
        <input
          type={"checkbox"}
          checked={usingTetOvertones}
          onChange={() => setUsingTetOvertones(!usingTetOvertones)}
        ></input>
      </div>
      <div className="px-16 w-96">
        {fractionNotes.map((row, index) => (
          <div key={index} className="size-16 my-1">
            {row.map(renderNote)}
          </div>
        ))}
        <div className="">{tetNotes.map(renderNote)}</div>
      </div>
    </div>
  );
};
