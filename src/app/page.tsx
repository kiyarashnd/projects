'use client';

import { Box, Container, Flex, Strong, Text } from '@radix-ui/themes';
import logo from '../../public/logo.png';
import uni from '../../public/University.png';
import { FormattedMessage } from 'react-intl';

const Home = () => {
  return (
    <>
      <Flex
        gap={'0'}
        justify={'center'}
        pt={'6'}
        pb={'6'}
        className='!bg-[#4f772d] h-[15rem]'
      >
        <Box>
          <img
            src={logo.src}
            alt='logo'
            width={100}
            height={100}
            className='sm:!w-[10rem] sm:!h-[10rem]'
          />
        </Box>
        <Box height='9' className='w-[18rem] mx-5 text-center	'>
          <Text
            size={{
              initial: '2',
              xs: '2',
              sm: '3',
              md: '4',
              lg: '5',
            }}
          >
            <Strong>
              <FormattedMessage defaultMessage={'Strong'} id='Home.header' />
            </Strong>
            <br />
            <FormattedMessage defaultMessage={'text'} id='Home.header.text' />
          </Text>
        </Box>
        <Box>
          <img
            src={uni.src}
            alt='logo'
            width={100}
            height={100}
            className='sm:!w-[10rem] sm:!h-[10rem]'
          />
        </Box>
      </Flex>

      <Container mt={'4'}>
        <Text
          className='text-xl'
          size={{
            initial: '2',
            xs: '2',
            sm: '3',
            md: '4',
            lg: '5',
          }}
        >
          We are a research group focused on the application of Artificial
          Intelligence methods to Molecular Biology and Medicine, and we are
          part of the Department of Computer Science of the University of Milan.
          <br />
          The core of our expertise is in the area of Computer Science, with a
          special focus on Machine Learning, Data Mining and Data Science, but
          we apply an interdisciplinary approach that combines knowledge from
          different areas of Computer Science, Molecular Biology and
          Biotechnology, often in the context of collaborations with national
          and international research groups, to develop new or to adapt existing
          computational approaches to Systems Biology, Network and Precision
          Medicine, and to other Computational Biology research areas.
          <br />
          Our research is documented by more than 150 publications in
          international journals and conferences in the field of Computational
          Biology, Bioinformatics and Data Science.
        </Text>
      </Container>
    </>
  );
};

export default Home;
