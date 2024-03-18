import { GetStaticPaths, GetStaticProps } from 'next';
import mainData from '../../../data/db.json';
import fnDatas from '../../../data/fndb.json';

type ProjectData = {
  id: number;
  title: string;
  src: string;
  body: string;
};

type ProjectTemplateProps = {
  myData?: ProjectData;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = mainData.map((data) => ({
    params: { id: String(data.id) },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<
  ProjectTemplateProps,
  { id: string }
> = async (context) => {
  const id = context.params?.id;
  const myData = mainData.find((data) => String(data.id) === id);

  // If we couldn't find the data, return a 404
  if (!myData) {
    return {
      notFound: true,
    };
  }

  return { props: { myData } };
};

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({ myData }) => {
  if (!myData) {
    return <div>No data found</div>; // Fallback content or a 404 page can be rendered here
  }

  return (
    <>
      <h2 className='mt-3 text-4xl flex justify-center'>{myData.title}</h2>
      <img
        className='mx-auto my-4'
        src={myData.src}
        alt={myData.title}
        width={600}
        height={600}
      />
      <p className='w-[80%] mx-auto text-xl mb-4'>{myData.body}</p>
    </>
  );
};

export default ProjectTemplate;
