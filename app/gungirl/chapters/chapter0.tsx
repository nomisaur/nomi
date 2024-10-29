import { useState } from "react";
import { useChapter, useFlipper, useGunGirlContext } from "../state";
import { Clicker } from "../components/clicker";

export const Chapter0 = () => {
  const { state, handleState } = useGunGirlContext();
  const { next } = useFlipper();
  const { chapterState, setChapterState } = useChapter();
  const [name, setName] = useState(state.name || "");
  const setPronouns = (choice: string) =>
    handleState((state) => {
      state.pronouns = choice;
      return state;
    });
  return (
    <div className="">
      <div>Hello, my child, what is your name?</div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleState((state) => {
              state.name = name;
              return state;
            });
          }
        }}
        disabled={Boolean(state.name)}
        placeholder="name"
      ></input>
      {state.name && (
        <div>
          <div>
            Ah, <span className="capitalize">{state.name}</span>, that's right.
            Tell me, what are your pronouns?
          </div>
          <div>
            <Clicker
              onClick={() => setPronouns("he/him")}
              disabled={Boolean(state.pronouns)}
              className="w-100"
              id="he"
            >
              {state.pronouns === "he/him" ? "she/her" : "he/him"}
            </Clicker>
            <Clicker
              onClick={() => setPronouns("she/her")}
              disabled={Boolean(state.pronouns)}
              className="w-100"
              id="she"
            >
              {state.pronouns || "she/her"}
            </Clicker>
            <Clicker
              onClick={() => setPronouns("they/them")}
              disabled={Boolean(state.pronouns)}
              className="w-100"
              id="they"
            >
              {state.pronouns === "they/them" ? "she/her" : "they/them"}
            </Clicker>
          </div>
          {state.pronouns && (
            <div>
              <div>
                Ahh, welcome to this world, my beautiful baby girl. May you not
                suffer too greatly.
              </div>
              <Clicker onClick={next} id="born">
                Become born
              </Clicker>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
