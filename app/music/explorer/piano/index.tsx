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

const FRACTION_ROWS = 5;

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

export const Piano = ({ active = true }) => {
  const [playingNotes, setPlayingNotes] = useState({});
  const setPlaying = (note, playing) => {
    setPlayingNotes({ ...playingNotes, [note]: playing });
  };
  const [root, setRoot] = useState(MIDDLE_C);
  const [tetNotes, setTetNotes] = useState(getTetNotes(root));
  const [fractionNotes, setFractionNotes] = useState(getFractionNotes(root));

  useEffect(() => {
    setTetNotes(getTetNotes(root));
    setFractionNotes(getFractionNotes(root));
  }, [root]);

  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (event) => {
      const note = LAYOUT[event.code];
      setPlaying(note, true);
    };
    const handleKeyUp = (event) => {
      const note = LAYOUT[event.code];
      setPlaying(note, false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [active, playingNotes, setPlayingNotes]);

  const whiteKeys = tetNotes.filter(({ color }) => color == "white");
  const blackKeys = [...tetNotes.filter(({ color }) => color == "black")]
    .toSpliced(2, 0, {})
    .toSpliced(6, 0, {});

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
      <div className="px-16 w-96">
        {fractionNotes.map((row, index) => (
          <div key={index} className="size-16 my-1">
            {row.map(({ note, freq }) => {
              if (!note || !freq) return null;
              const playing = Boolean(playingNotes[note]);
              return (
                <div
                  key={note}
                  className={`absolute p-1 bg-blue-500 size-16 border-2 border-solid ${
                    playing ? "border-gray-100" : "border-gray-800"
                  }`}
                  style={{
                    marginLeft: `calc(${
                      ((freq / root) * 100 - 100) * 0.9
                    }% - 2rem)`,
                  }}
                  onMouseDown={() => setPlaying(note, !playing)}
                  onMouseUp={() => setPlaying(note, false)}
                >
                  <div>{note}</div>
                  <div>{freq.toFixed(2)}</div>
                  <PlayNote
                    playing={playing}
                    waves={[
                      { freq, volume: 0.5 },
                      { freq: freq * 2, volume: 0.25 },
                      { freq: freq * 4, volume: 0.2 },
                      { freq: freq * 8, volume: 0.15 },
                      { freq: freq * 16, volume: 0.1 },
                    ]}
                  />
                </div>
              );
            })}
          </div>
        ))}
        <div className="">
          {tetNotes.map(({ note, freq, color }) => {
            if (!note || !freq) return null;
            const playing = Boolean(playingNotes[note]);
            return (
              <div
                key={note}
                className={`absolute p-1 border-2 border-solid ${
                  playing ? "border-gray-100" : "border-gray-800"
                } ${
                  color == "white"
                    ? "bg-gray-400 h-32 w-16"
                    : "size-16 bg-gray-900"
                }`}
                style={{
                  marginLeft: `calc(${
                    ((freq / root) * 100 - 100) * 0.9
                  }% - 2rem)`,
                }}
                onMouseDown={() => setPlaying(note, !playingNotes[note])}
                onMouseUp={() => setPlaying(note, false)}
              >
                <div>{note}</div>
                <div>{freq.toFixed(2)}</div>
                <PlayNote
                  playing={Boolean(playingNotes[note])}
                  waves={[
                    { freq, volume: 0.5 },
                    { freq: freq * 2, volume: 0.25 },
                    { freq: freq * 4, volume: 0.2 },
                    { freq: freq * 8, volume: 0.15 },
                    { freq: freq * 16, volume: 0.1 },
                  ]}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
