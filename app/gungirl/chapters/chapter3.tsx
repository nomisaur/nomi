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
        considering whether or not to venture forth and become a rule-breaker.
        This might be the first rule that you would be consciously breaking. You
        looked back towards your home. The more you stared at it the more it
        narrowed in on you like it wanted to swallow you. A shiver ran down your
        spine and you turned away.
      </p>
      <p>
        You looked now towards the tall green trees that covered the hills that
        rolled up like great waves and met the clouds. If only you could be one
        of those clouds floating above everything, unbothered by the troubles
        below. The trees called to you and you wanted to go to them.
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
          <p>no.</p>
          <Clicker id={"go2"} disabled={chapterState.clickedButtons.go2}>
            break the rules
          </Clicker>
        </>
      )}
      {(chapterState.clickedButtons.go1 || chapterState.clickedButtons.go2) && (
        <>
          <p>
            A wind blew from the deepening trees. The light speckled through the
            swaying leaves and glittered on the soft earth. You took a deep
            breath and set out on the trail ahead.
          </p>
          <p>
            You walked a while on a narrow trail between trees and bushes. You
            stepped over large rocks and fallen branches. The trail ended onto a
            wider path that ran South to North. You followed it North for a
            while, but it started to veer East, back towards your home. You
            found another narrow trail that broke off from the path to continue
            West.
          </p>
          <p>The trail met a small creek and ran along side it. </p>
        </>
      )}
    </div>
  );
};
