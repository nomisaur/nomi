import { Title } from "../components/title";
import { Clicker } from "../components/clicker";
import { useChapter } from "../state";

export const Chapter4 = () => {
  const { chapterState } = useChapter();
  const firstChoice =
    chapterState.clickedButtons.go1 || chapterState.clickedButtons.home;
  return (
    <div>
      <Title>You Can Look Away For This</Title>
      <p>
        "Where the fuck have you been! I've been worried sick about you. Don't
        you ever put me through that again!" yelled Mom.
      </p>
      <p>
        She grabbed you by the arm and pulled you roughly to her. She beat you
        with a vaccuum wire. You don't remember all of it. You fell asleep
        crying that night.
      </p>
      <br></br>
      <p>
        A year passed. You didn't venture out into the woods again. You didn't
        look outside yourself to escape anymore. Instead you shut down and went
        inwards. The world was not made for you.
      </p>
      <p>
        You were an angry child. At night you bit yourself as hard as you could
        stand. You hid the marks under your sleeves.
      </p>
    </div>
  );
};
