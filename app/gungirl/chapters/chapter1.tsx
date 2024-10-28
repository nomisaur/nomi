import { useState } from "react";
import { useGunGirlContext } from "../state";
import { Clicker } from "@/components/clicker";
export const Chapter1 = () => {
  // const { state, handleState } = useGunGirlContext();
  const [sleep, setSleep] = useState(false);
  const [cry, setCry] = useState(0);

  const renderChoices = (x: number) => {
    return (
      <div>
        {x < 3 && (
          <Clicker onClick={() => setCry(cry + 1)} disabled={cry > x || sleep}>
            Cry
          </Clicker>
        )}
        <Clicker onClick={() => setSleep(true)} disabled={cry > x || sleep}>
          Sleep
        </Clicker>
      </div>
    );
  };

  return (
    <div>
      <h1>Chapter 1</h1>
      <p>
        You were born a little baby child, baptized in the blood of your mother.
        Despite the whispers, you were not born holding a gun. Nevertheless, the
        nature of your story has invited many such ignorant rumors. Ah, how they
        sting.
      </p>
      <p>
        You needed to be held. You cried in your crib while your parents fought
        in the other room. You heard the shouting, though your developing brain
        could not make sense of it. You only felt the terror of it.
      </p>
      {renderChoices(0)}
      {cry > 0 && (
        <>
          <p>You continued to cry but no one came.</p>
          {renderChoices(1)}
        </>
      )}
      {cry > 1 && (
        <>
          <p>Even still. Maybe they did not hear?</p>
          {renderChoices(2)}
        </>
      )}
      {cry > 2 && (
        <>
          <p>But no one came.</p>
          {renderChoices(3)}
        </>
      )}
      {sleep && (
        <>
          <p>
            Despite your cries you were left all alone. Your nervous system
            remembers. You fall asleep.
          </p>
        </>
      )}
    </div>
  );
};
