'use client';
import datas from '../../data/db.json';
import Image from 'next/image';

type Props = {
  params: {
    id: string;
  };
};

const ProjectTemplate = (props: Props) => {
  console.log(typeof props.params.id);
  const myData = datas.find((data) => String(data.id) === props.params.id);

  return (
    <>
      {/* <h1>project Tmeplate fo id of {`${props.params.id}`}</h1> */}
      <h2 className='mt-3 text-4xl flex justify-center'>{myData?.title}</h2>
      <Image
        className='mx-auto my-4'
        src={`${myData?.src}`}
        alt={`${myData?.title}`}
        width={600}
        height={600}
      />
      <p className='w-[80%] mx-auto text-xl mb-4'>{myData?.body}</p>

      <footer className='bg-gray-400 flex justify-center py-10'>
        {myData?.footer}
      </footer>
    </>
  );
};

export default ProjectTemplate;
