import { sdgIndex } from ".";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import axios from "axios";

export default function goalDetails(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <div className="m-auto flex w-3/4 flex-col items-center justify-items-center gap-4">
      <h1>{props.data?.title}</h1>
      <p>{props.data?.description}</p>
      <br />
      <br />
      <br />

      <section className="flex flex-wrap gap-8">
        {props.goal.map((goal) => (
          <div
            key={goal.Name}
            className="flex flex-col border-2 border-solid border-white px-8 py-4"
          >
            <p>Country Name: {goal.Name}</p>
            <p>Rating: {goal[`Goal_${props.data.code}_Rating`]}</p>
            <p>Trend: {goal[`Goal_${props.data.code}_Trend`]}</p>
            <p>Score: {goal[`Goal_${props.data.code}_Score`].toFixed(2)}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export const getStaticProps = (async (context) => {
  const id = context.params?.id;

  const { data } = await axios.get(
    `https://unstats.un.org/SDGAPI/v1/sdg/Goal/${id}/Target/List?includechildren=false`,
  );

  const countries = ["Brazil", "Finland", "France", "Germany", "China"].map(
    (country) =>
      axios.get(
        `https://services7.arcgis.com/IyvyFk20mB7Wpc95/arcgis/rest/services/Sustainable_Development_Report_2023_(GOAL_DATA_ONLY)/FeatureServer/0/query?where=Name%20%3D%20'${country}'&outFields=Goal_${id}_Rating,Goal_${id}_Trend,ID,Name,Goal_${id}_Score,Region&outSR=4326&f=json`,
      ),
  );

  const solved = (await Promise.allSettled(countries)).map(
    ({ value: { data } }) => {
      return data.features[0].attributes;
    },
  );

  return {
    props: {
      data: data[0],
      goal: solved,
    },
  };
}) satisfies GetStaticProps<{
  data: Goals;
  goal: Attributes[];
}>;

export const getStaticPaths = async () => {
  const paths = sdgIndex.map((index) => ({ params: { id: `${index}` } }));
  return {
    paths,
    fallback: false,
  };
};

type Goals = {
  code: string;
  title: string;
  description: string;
  uri: string;
};

type Attributes = {
  Goal_1_Rating: string;
  Goal_1_Score: number;
  Goal_1_Trend: string;
  ID: string;
  Name: string;
  Region: string;
};
