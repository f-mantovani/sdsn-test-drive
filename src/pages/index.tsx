import Image from 'next/image';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
//@ts-ignore
import { getColor } from '@sdgindex/data/sdgs';
import Link from 'next/link';

export const sdgIndex = Array.from({length: 17}, (_, index) => index + 1);
const squareProportion = 120;

type Goals = {
    code: string;
    title: string;
    description: string;
    uri: string;
};

function placeIcons(n: number, goals: Goals[]) {
    const goalFound = goals.find((goal) => +goal.code === n);
    const color = getColor(n);

    return (
        <>
            <Image
				style={{backgroundColor: color}}
                src={`/assets/sdg${n}-white.svg`}
                width={squareProportion}
                height={squareProportion}
                alt={`Icon for SDG goal ${n}`}
                priority
            />
            <p className='truncate'>{goalFound?.title}</p>
        </>
    );
}

export default function App({ goals }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className='flex gap-6 flex-wrap justify-center'>
            {sdgIndex.map((p) => (
                <Link href={`${p}`} key={p} className='max-w-[120px]'>
                    {placeIcons(p, goals)}
                </Link>
            ))}
        </div>
    );
}

export const getStaticProps = (async () => {
    const response = await fetch(
        'https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false'
    );

    const goals = await response.json();

    return {
        props: { goals },
    };
}) satisfies GetStaticProps<{
    goals: Goals[];
}>;
