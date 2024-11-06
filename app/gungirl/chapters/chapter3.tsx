import { Title } from "../components/title";
import { Clicker } from "../components/clicker";
import { useChapter } from "../state";

export const Chapter3 = () => {
  const { chapterState } = useChapter();
  const firstChoice =
    chapterState.clickedButtons.go1 || chapterState.clickedButtons.home;
  return (
    <div>
      <Title>Forest of isolation</Title>
      <p>
        You stood outside your parents home looking into the woods beyond. You
        lived on the threshhold of a small community of houses spread out among
        the tall coastal trees. To the East things become more urban as the land
        becomes flatter and closer to the bay. To the West is an expanse of
        trees and mist and hills that rise higher up until they peak and then
        fall again into the vast Pacific Ocean.
      </p>
      <p>
        You were not alowed past the treeline, and yet there you stood carefully
        considering whether or not to become a rule-breaker. This might be the
        first rule that you would be consciously breaking. You looked back
        towards your home. The more you stared at it the more it narrowed in on
        you like it wanted to swallow you. A shiver ran down your spine and you
        turned away.
      </p>
      <p>
        You looked now towards the tall green trees that covered the hills that
        rolled up like great waves and met the clouds. If only you could be one
        of those cloud floating above the landscape, free of burdens.
      </p>
      <div>
        <Clicker id={"go1"} disabled={firstChoice}>
          break the rules
        </Clicker>
        <Clicker id="home" disabled={firstChoice}>
          go home
        </Clicker>
      </div>
      {chapterState.clickedButtons.home && (
        <>
          <p>Boring!</p>
          <Clicker id={"go2"} disabled={chapterState.clickedButtons.go2}>
            break the rules
          </Clicker>
        </>
      )}
      {(chapterState.clickedButtons.go1 || chapterState.clickedButtons.go2) && (
        <>
          <p>
            A deep wind blew from the trees and blew your hair behind you. You
            closed your eyes and breathed it in. You heard the soft russle of
            leaves and the light played upon your face.
          </p>
        </>
      )}
    </div>
  );
};
