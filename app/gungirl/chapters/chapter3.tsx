import { Title } from "../components/title";
import { Clicker } from "../components/clicker";
import { useChapter } from "../state";

export const Chapter3 = () => {
  const { chapterState } = useChapter();
  const firstChoice =
    chapterState.clickedButtons.go1 || chapterState.clickedButtons.home;
  return (
    <div>
      <Title>Some Sunshine</Title>
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
            wider path. You followed it North West for a while. You felt uneasy
            being in the open. Soon you found another narrow trail that broke
            off from the path. This one wound tightly around many tall flowering
            shrubs that nearly arched over your head.
          </p>
          <p>
            After a while you passed between two young trees that branched out
            to touch each other over your head. You felt that they must be in
            love. You found yourself crossing into a small clearing, about the
            size of your bedroom. Along all sides were dense trees with no
            obvious paths, except for the one you entered from. Above you the
            trees opened to a ring of sky from which the sun shone down onto the
            soft earth. Off to the side was a wide stump of a boulder that made
            for a nice seat.
          </p>
          <p>
            You sat there in the sun looking up at the sky and the bright
            billowing clouds. You were happy then. You felt as if you were much
            lighter, as if a heavy weight was off of you for a moment of rest.
            You were proud of yourself for being a little rebel, and so you sat
            there with a satisfied little grin kicking your feet. You didn't
            even think about how miserable your life was in general.
          </p>
          <p>
            Before too long a nice beautiful German Shepherd approached you. She
            stuck her face all up in your space and you pet her. She licked at
            your palm and you giggled. You examined her collar and found that
            she was named Lucky.
          </p>
          <p>
            After the excitement wore off Lucky laid down on a warm spot of
            earth and you laid along side her. You stared up at the sky for some
            uncountable amount of time. You had no thoughts at all. You were
            just the sensations of the world and there was no separation. It
            could have been an instant or it could have been an eternity. Time
            did not keep its tally for the moment.
          </p>
          <p>
            Lucky stirred and suddenly you were brought back to yourself again.
            Suddenly she got up and ran off. You were now in shadow, and you
            noticed a chill. You got up and headed home through the winding
            path. As you got closer to home you felt the weight that bearing
            down on you again. You remembered how awful your life was. You
            wondered if you would ever feel that weightless joy again.
          </p>
          <p>
            The sun was going down and you felt ever colder. You were shivering
            as you came into the clearing of your house. It seemed to loom above
            you. You put your hand on the doorknob and hesitated to open it. You
            were afraid.
          </p>
        </>
      )}
    </div>
  );
};
