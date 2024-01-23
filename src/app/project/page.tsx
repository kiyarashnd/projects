'use client';
import { Grid, Heading, HoverCard, Link, Strong, Text } from '@radix-ui/themes';
import enDatas from '../../data/db.json';
import fnDatas from '../../data/fndb.json';

import Image from 'next/image';
import { FormattedMessage } from 'react-intl';
import { useAppSelector } from '../../hooks/useRedux';
import { useEffect, useState } from 'react';

type DataObject = {
  id: number;
  title: string;
  body: string;
  footer: string;
  src: string;
};

export default function Home() {
  // const { lang } = useAppSelector((state) => state.uiConfig);
  const [lang, setLang] = useState('');
  useEffect(() => {
    setLang(`${localStorage.getItem('lang')}`);
  }, []);
  const mainData = lang === 'en' ? enDatas : fnDatas;

  return (
    <section>
      <Heading className='flex justify-center text-4xl text-[#132a13] py-5'>
        {/* projects */}
        <FormattedMessage defaultMessage={'Projects'} id='header.projects' />
      </Heading>
      <Grid columns='3' gap='5' width='auto'>
        {mainData.map((data: DataObject) => {
          return (
            <HoverCard.Root key={data.id}>
              <HoverCard.Trigger className='border-[2px] border-[#ecf39e] sm:!px-12 px-6 bg-[#ecf39e]'>
                <Link href={`project/${data.id}`} className=' !my-0 !mx-auto'>
                  <Text
                    className='text-2xl !flex !justify-center  text-[#132a13]'
                    size={{
                      initial: '2',
                      xs: '2',
                      sm: '3',
                      md: '4',
                      lg: '5',
                    }}
                  >
                    {data.title}
                  </Text>
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
                <Text
                  as='div'
                  style={{ maxWidth: 400 }}
                  className='!flex !justify-center text-[#132a13]'
                  size={{
                    initial: '2',
                    xs: '2',
                    sm: '3',
                    md: '4',
                    lg: '5',
                  }}
                >
                  <Strong>{data.title}</Strong>
                  {` ${data.body.substring(0, data.body.length / 4)}...`}
                </Text>
              </HoverCard.Content>
            </HoverCard.Root>
          );
        })}
      </Grid>
    </section>
  );
}
