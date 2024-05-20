//@ts-ignore
import { getColor } from "@sdgindex/data/sdgs";

import Image from "next/image";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Link from "next/link";
import axios from "axios";
import { Footer } from "../components/Footer";

const squareProportion = 120;

export type Goals = {
  code: string;
  title: string;
  description: string;
  uri: string;
};

export function placeIcons(
  n: number,
  goals: Goals | Goals[],
  home: boolean = false,
) {
  const color = getColor(n);
  let goalAlt;
  if (Array.isArray(goals)) {
    const goalFound = goals.find((goal) => +goal.code === n);
    goalAlt = goalFound?.title;
  } else {
    goalAlt = goals.title;
  }

  const imgShadow =
    "hover:scale-125 hover:shadow-lg dark:hover:shadow-white hover:shadow-black";

  return (
    <>
      <Image
        style={{ backgroundColor: color }}
        className={home ? imgShadow : "undefined"}
        src={`/assets/sdg${n}-white.svg`}
        width={squareProportion}
        height={squareProportion}
        alt={`${goalAlt}`}
        title={`${goalAlt}`}
        data-cy-goal-img={n}
        priority
      />
    </>
  );
}

export default function App({
  goals,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="flex flex-col items-center justify-between ">
        <h1 className="text-4xl">Pathways to Progress: Exploring the SDGs</h1>
        <p className="max-w-[77ch]">
          Welcome to our landing page dedicated to the United Nations
          Sustainable Development Goals (SDGs). Here, you can explore the 17
          SDGs, each representing a critical aspect of global development. Click
          on the icons below to delve deeper into each goal and discover how
          five diverse countries (
          <b>Brazil, Finland, France, Germany, and China</b>) are contributing
          to these objectives. By examining their progress, we aim to foster
          greater awareness and understanding of the collective efforts needed
          to achieve a sustainable future for all.
        </p>
      </div>

      <div className="my-8 grid grid-cols-6 justify-items-center gap-y-6">
        {goals.map((goal) => (
          <Link href={`${goal.code}`} key={goal.code} data-cy-goal>
            {placeIcons(+goal.code, goals, true)}
          </Link>
        ))}
      </div>

      <Footer />
    </>
  );
}

export const getStaticProps = (async () => {
  const { data } = await axios.get<Goals[]>(
    "https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false",
  );

  return {
    props: { goals: data },
  };
}) satisfies GetStaticProps<{
  goals: Goals[];
}>;

