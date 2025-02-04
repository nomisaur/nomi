import { Title } from "../components/title";
import { Clicker } from "../components/clicker";
import { useChapter } from "../state";

export const Chapter4 = () => {
  const { chapterState } = useChapter();
  const firstChoice =
    chapterState.clickedButtons.go1 || chapterState.clickedButtons.home;
  return (
    <div>
      <Title>Lessons from Mom</Title>
      <p>
        Do you remember how you were beaten? Do you remember the terror of being
        so small and under threat of someone so big and erratic? I don't need to
        tell you this. You know this. You know what it's like to be powerless.
        That pain is still in your heart if you look for it.
      </p>
      <p>
        That night that you came home late you were beaten. Your mom was so
        worried about you and she showed you her love through her violence. She
        did it for you, she told herself. She did it all for you.
      </p>
      <p>
        She taught you how to build walls around your heart, the same walls that
        kept her safe. It was one of the few things that she knew how to teach
        you because it was taught to her. The craft had been passed down in your
        family for generations.
      </p>
      <p>
        To be open, to explore the world around you with curiosity, these things
        were dangerous. Some deep ancestral wound spoke fear into your body. You
        didn't soon go back into the woods. You learned not to grow outwards.
        Instead you could only go inwards like some stunted tree twisting in on
        itself.
      </p>
      <p>
        You spent most of your time inside your own mind, disconnected from your
        body. And having only your wounds for company, you grew familiar with
        hatred, a shadow that you wrapped around yourself like a blanket.
      </p>
      <p>A year passed before you went out into the woods again.</p>
    </div>
  );
};
