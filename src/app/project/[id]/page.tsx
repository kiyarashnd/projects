'use client';
// import datas from '../../../data/db.json';
import enDatas from '../../../data/db.json';
import fnDatas from '../../../data/fndb.json';
import Image from 'next/image';
import { useAppSelector } from '../../../hooks/useRedux';

type Props = {
  params: {
    id: string;
  };
};

const ProjectTemplate = (props: Props) => {
  // const { lang } = useAppSelector((state) => state.uiConfig);
  let lang = localStorage.getItem('lang');

  const mainData = lang === 'en' ? enDatas : fnDatas;

  const myData = mainData.find((data) => String(data.id) === props.params.id);

  return (
    <>
      <h2 className='mt-3 text-4xl flex justify-center'>{myData?.title}</h2>
      <Image
        className='mx-auto my-4'
        src={`${myData?.src}`}
        alt={`${myData?.title}`}
        width={600}
        height={600}
      />
      <p className='w-[80%] mx-auto text-xl mb-4'>{myData?.body}</p>
    </>
  );
};

export default ProjectTemplate;
