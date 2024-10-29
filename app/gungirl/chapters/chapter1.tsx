import { useChapter, useFlipper } from "../state";
import { Clicker } from "../components/clicker";
import { Title } from "../components/title";

export const Chapter1 = () => {
  const { next } = useFlipper();
  const {
    chapterState: { sleep, cry },
    setChapterState,
  } = useChapter({ cry: 0, sleep: false });
  const setCry = (n: number) => setChapterState("cry", n);
  const setSleep = (n: boolean) => setChapterState("sleep", n);

  const renderChoices = (x: number) => {
    return (
      <div>
        {x < 3 && (
          <Clicker
            onClick={() => setCry(cry + 1)}
            disabled={cry > x || sleep}
            id={"cry" + x}
          >
            Cry
          </Clicker>
        )}
        <Clicker
          onClick={() => setSleep(true)}
          disabled={cry > x || sleep}
          id={"sleep" + x}
        >
          Sleep
        </Clicker>
      </div>
    );
  };

  return (
    <div>
      <Title>Birth</Title>
      <p>
        You were born a little baby child, baptized in the blood of your mother.
        Years later people would say that you were born holding a gun, but the
        truth is more sad and mundane. What happened was your mother lost so
        much blood having you that she nearly died. The doctors called it a
        massive postpartum hemorrhage. The amount of cold blood being hastily
        infused into her gave her hypothermia, and in her near-death experience
        she saw visions of your life to come and cried out in horror.
      </p>
      <p>
        Your parents brought the trauma of your birth home with them in the
        forested hills of the California Bay Area. You shared a room with your
        three-year-old brother. Your mother fell into a depression and your
        father punished her for it.
      </p>
      <p>
        You were a baby. You needed to be held. You cried in your crib while
        your parents fought in the other room. You heard the shouting, though
        your developing brain could not make sense of it. You only felt the
        terror of it.
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
            remembers. You fell asleep.
          </p>
          <Clicker onClick={() => next()} id="grow">
            grow
          </Clicker>
        </>
      )}
    </div>
  );
};
