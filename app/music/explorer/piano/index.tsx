import React, { useEffect, useState } from "react";
import { PlayNote } from "../playNote";

const TET_CONSTANT = Math.pow(2, 1 / 12);
const MIDDLE_C = 440 * Math.pow(1 / TET_CONSTANT, 9);

const NOTES = [
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
type Note = (typeof NOTES)[number];

interface NoteData {
  note: Note;
  color: "black" | "white";
  freq: number;
}

const layout = {
  KeyS: "c",
  KeyD: "d",
  KeyF: "e",
  KeyG: "f",
  KeyH: "g",
  KeyJ: "a",
  KeyK: "b",
  KeyE: "c#",
  KeyR: "d#",
  KeyY: "f#",
  KeyU: "g#",
  KeyI: "a#",
  KeyL: "2c",
};

const getNotes = (root) =>
  NOTES.reduce((acc: NoteData[], note: Note) => {
    const lastNote = acc.at(-1);
    return [
      ...acc,
      {
        note,
        color: (note.includes("#") ? "black" : "white") as "black" | "white",
        freq: lastNote ? lastNote.freq * TET_CONSTANT : root,
        code: layout[note],
      },
    ];
  }, []);

export const Piano = ({ active = true }) => {
  const [playingNotes, setPlayingNotes] = useState({});
  const setPlaying = (note, playing) => {
    setPlayingNotes({ ...playingNotes, [note]: playing });
  };
  const [middleC, setMiddleC] = useState(MIDDLE_C);
  const [notes, setNotes] = useState(getNotes(middleC));

  useEffect(() => {
    setNotes(getNotes(middleC));
  }, [middleC]);

  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (event) => {
      const note = layout[event.code];
      setPlaying(note, true);
    };
    const handleKeyUp = (event) => {
      const note = layout[event.code];
      setPlaying(note, false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [active, playingNotes, setPlayingNotes]);

  return (
    <div>
      <div>
        root:
        <input
          type="number"
          value={middleC}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!Number.isNaN(value)) setMiddleC(value);
          }}
        />
      </div>
      {notes.map(({ note, color, freq }) => {
        return (
          <div key={note}>
            <div
              onMouseDown={() => setPlaying(note, !playingNotes[note])}
              onMouseUp={() => setPlaying(note, false)}
            >
              {note}
              <PlayNote
                playing={Boolean(playingNotes[note])}
                waves={[
                  { freq, volume: 0.5 },
                  { freq: freq * 1.5, volume: 0.25 },
                ]}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
