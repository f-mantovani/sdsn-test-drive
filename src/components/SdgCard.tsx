import Image from "next/image";
import { Arrow } from "./Icons/Arrow";

export const SdgCard = ({ observation }: { observation: ObservationProps }) => {
  return (
    <div className="grid grid-cols-2 gap-4 border-2 border-solid border-black px-8 py-4 text-xl dark:border-white">
      <div>
        <p>Country: {observation.name}</p>
        <p>Score: {observation.score}</p>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <p>Rating:</p>
          <div
            style={{ backgroundColor: observation.rating }}
            className="h-6 w-6 rounded-full "
          ></div>
          <p>{observation.rating}</p>
        </div>

        <div className="flex items-center gap-2">
          <p>Trend:</p>
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
  score: number;
};
