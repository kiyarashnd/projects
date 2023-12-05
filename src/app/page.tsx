'use client';
import { Box, Grid, HoverCard, Link, Strong, Text } from '@radix-ui/themes';
import datas from '../data/db.json';
import Image from 'next/image';

type DataObject = {
  id: number;
  title: string;
  body: string;
  footer: string;
  src: string;
};

export default function Home() {
  console.log(datas);
  return (
    <>
      <h2 className='flex justify-center text-4xl text-red-400 my-5'>
        projects
      </h2>
      <Grid columns='3' gap='5' width='auto'>
        {datas.map((data: DataObject) => {
          return (
            <HoverCard.Root key={data.id}>
              <HoverCard.Trigger className='border-[2px] border-black px-12 bg-red-300'>
                <Link href={`${data.id}`} className=' !my-0 !mx-auto'>
                  <Text className='text-2xl'>{data.title}</Text>
                  <Image
                    src={data.src}
                    alt={data.title}
                    width={400}
                    height={400}
                  />
                  <Text>{data.footer}</Text>
                </Link>
              </HoverCard.Trigger>
              <HoverCard.Content size='3'>
                <Text as='div' size='3' style={{ maxWidth: 400 }}>
                  <Strong>{data.title}</Strong>
                  {` ${data.body.substring(0, data.body.length / 4)}...`}
                </Text>
              </HoverCard.Content>
            </HoverCard.Root>
          );
        })}
      </Grid>
    </>
  );
}
