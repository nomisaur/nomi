import { Clicker } from "../components/clicker";
import { Title } from "../components/title";
import { useChapter } from "../state";

export const Chapter2 = () => {
  const { chapterState } = useChapter();
  return (
    <div>
      <Title>Here We Gun Again</Title>
      <p>
        You grew in a house of resentment. Your father resented your mother
        because she was no longer the woman he fell in love with. She was sad
        and drunk now, and he took on a larger share of the work of raising two
        children. They never had sex anymore. He was impatient with you and your
        brother. He yelled and hit in order to get his way.
      </p>
      <p>
        Your mother resented your father for the way he treated you and your
        brother. She hated him for hitting his family, and she hated herself for
        staying. She knew that you and your brother deserved better, but she
        didn't know how to be a mother. She felt trapped and alone, and numbed
        herself with booze.
      </p>
      <p>
        Your brother resented them both. Your mother failed him and he fought
        her at every opportunity. Your father taught him to be tough and angry,
        and he took it out on you. He resented you most of all for being so
        weak, for in you he saw the sensitivity that he aimed to kill within
        himself.
      </p>
      <p>
        And you resented yourself for existing. God did not love you. You had no
        refuge in family, and you couldn't make friends. You were weird and
        alone and small. You had a rat-like face that jutted forward, and big
        overbite-teeth. The other children called you "Ratatouille" and laughed
        at you.
      </p>
      <Clicker id="ok">ok</Clicker>
      {chapterState.clickedButtons.ok && (
        <>
          <p>
            And you held your arms up and hunched like a rat too. You cried
            weird, and other children made a game of making you cry so that they
            could mock you. Your brother called you "Rat Fuck" and shoved you.
            You told your parents and they yelled at both of you for fighting.
          </p>
          <p>
            Your hair was often tangled because you were neglected, and your
            mother scolded you for it. Your clothing didn't fit right, and you
            were bad at school, too. You felt stupid and ugly, and the world
            agreed. You often thought of killing yourself even though you were
            only seven-years-old. Many have said that you probably should have.
          </p>
          <Clicker id="fuck">fuck</Clicker>
        </>
      )}
    </div>
  );
};
