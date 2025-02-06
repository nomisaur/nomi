import React, { useState } from "react";
import { PlayNote } from "../playNote";

export const Piano = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <div
        onMouseDown={() => setPlaying(!playing)}
        onMouseUp={() => setPlaying(false)}
      >
        play
      </div>
      <PlayNote playing={playing} frequency={440} volume={0.5} />
    </div>
  );
};
