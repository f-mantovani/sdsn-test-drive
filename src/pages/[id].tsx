//@ts-ignore
import { getLabel } from "@sdgindex/data/sdgs";

import type { InferGetStaticPropsType, GetStaticProps } from "next";
import axios from "axios";

import { Goals, placeIcons } from ".";
import { SdgCard } from "../components/SdgCard";
import { LegendInfo } from "../components/LegendInfo";

export default function goalDetails(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const goalTitle = getLabel(+props.goal?.code);
  return (
    <div className="mx-auto my-8 flex w-3/4 flex-col items-center justify-items-center gap-28">
      <section className="flex items-start gap-8">
        {placeIcons(+props.goal.code)}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl">
            SDG {props.goal.code} - {goalTitle}
          </h1>
          <h2 className="text-2xl">{props.goal?.title}</h2>
          <p>{props.goal?.description}</p>
        </div>
      </section>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-8">
          <h2 className="text-2xl">Countries index for - {goalTitle}</h2>
          <div className="flex flex-wrap gap-8">
            {props.data.map((goal) => {
              const observation = {
                name: goal.Name,
                rating: goal[`Goal_${props.goal.code}_Rating`] as string,
                trend: goal[`Goal_${props.goal.code}_Trend`] as string,
                score: +(+goal[`Goal_${props.goal.code}_Score`]).toFixed(2),
              };
              return <SdgCard key={goal.Name} observation={observation} />;
            })}
          </div>
        </section>

        <h2 className="text-2xl">Legend</h2>
        <LegendInfo />
      </div>
    </div>
  );
}

export const getStaticProps = (async (context) => {
  const id = context.params?.id;

  const { data } = await axios.get<Goals[]>(
    `https://unstats.un.org/SDGAPI/v1/sdg/Goal/${id}/Target/List?includechildren=false`,
  );

  const countries = ["Brazil", "Finland", "France", "Germany", "China"].map(
    (country) =>
      axios.get(
        `https://services7.arcgis.com/IyvyFk20mB7Wpc95/arcgis/rest/services/Sustainable_Development_Report_2023_(GOAL_DATA_ONLY)/FeatureServer/0/query?where=Name%20%3D%20'${country}'&outFields=Goal_${id}_Rating,Goal_${id}_Trend,ID,Name,Goal_${id}_Score,Region&outSR=4326&f=json`,
      ),
  );

  const solved = (await Promise.allSettled(countries)).map(
    //@ts-ignore
    ({ value: { data } }) => {
      return data.features[0].attributes;
    },
  ) as Attributes[];
  return {
    props: {
      goal: data[0],
      data: solved,
    },
  };
}) satisfies GetStaticProps<{
  goal: Goals;
  data: Attributes[];
}>;

export const getStaticPaths = async () => {
  const { data: goals } = await axios.get<Goals[]>(
    "https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false",
  );

  const paths = goals.map((goal) => ({ params: { id: goal.code } }));

  return {
    paths,
    fallback: false,
  };
};

type Attributes = {
  [key: string]: string | number;
  ID: string;
  Name: string;
  Region: string;
};
