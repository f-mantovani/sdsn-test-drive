import { Arrow } from "./Icons/Arrow";

export const SdgCard = ({ observation }: { observation: ObservationProps }) => {
  return (
    <div
      data-cy-country-card
      className="grid grid-rows-2 rounded-lg border-2 border-solid border-black px-8 py-4 text-lg dark:border-white"
    >
      <div className="flex justify-between text-xl">
        <h3>{observation.name}</h3>
        <p>Score: {observation.score}</p>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p>Score rating:</p>
          <div
            style={{ backgroundColor: observation.rating }}
            className="h-6 w-6 rounded-full "
          ></div>
          <p>{observation.rating}</p>
        </div>

        <div className="flex items-center gap-2">
          <p>Score trend:</p>
          <Arrow symbol={observation.trend} />
        </div>
      </div>
    </div>
  );
};

type ObservationProps = {
  name: string;
  rating: string;
  trend: string;
  score: string;
};
