//@ts-ignore
import { getColor } from "@sdgindex/data/sdgs";

import Image from "next/image";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Link from "next/link";
import axios from "axios";

const squareProportion = 120;

export type Goals = {
  code: string;
  title: string;
  description: string;
  uri: string;
};

export function placeIcons(n: number) {
  const color = getColor(n);

  return (
    <>
      <Image
        style={{ backgroundColor: color }}
        src={`/assets/sdg${n}-white.svg`}
        width={squareProportion}
        height={squareProportion}
        alt={`Icon for SDG goal ${n}`}
        priority
      />
    </>
  );
}

export default function App({
  goals,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="flex flex-wrap justify-center gap-6">

      {goals.map((goal) => (
        <Link href={`${goal.code}`} key={goal.code} className="max-w-[120px]">
          {placeIcons(+goal.code)}
        </Link>
      ))}
    </div>
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
