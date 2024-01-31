'use client';

import { Avatar, Flex, Heading, Text } from '@radix-ui/themes';
import { FormattedMessage } from 'react-intl';

const People = () => {
  return (
    <>
      <Flex direction='column' gap='5' className='!ms-4 !mb-28'>
        <Heading mt='6'>
          <FormattedMessage defaultMessage={'People'} id='header.people' />
        </Heading>
        <Text>
          We are a group of researchers full-time or partially involved in
          Computational Biology and Bioinformatics research:
        </Text>
        <ul className='!list-inside text-yellow-900 list-none flex flex-col gap-2'>
          <li>
            <Avatar
              src='university.png'
              fallback='A'
              radius='full'
              size='6'
              className='me-3'
            />
            <Text>Monireh Ayari (PhD Student)</Text>
          </li>
          <li>
            <Avatar
              src='university.png'
              fallback='A'
              radius='full'
              size='6'
              className='me-3'
            />
            <Text>
              Frasca (Associate professor) Jessica Gliozzo (PhD student)
              Valentina
            </Text>
          </li>
          <li>
            <Avatar
              src='university.png'
              fallback='A'
              radius='full'
              size='6'
              className='me-3'
            />
            <Text>
              Alberto Cabri (RTDA Researcher) Luca Cappelletti (PhD) Emanuele
            </Text>
          </li>
          <li>
            <Avatar
              src='university.png'
              fallback='A'
              radius='full'
              size='6'
              className='me-3'
            />
            <Text>Monireh Ayari (PhD Student)</Text>
          </li>
          <li>
            <Avatar
              src='university.png'
              fallback='A'
              radius='full'
              size='6'
              className='me-3'
            />
            <Text>
              Frasca (Associate professor) Jessica Gliozzo (PhD student)
              Valentina
            </Text>
          </li>
          <li>
            <Avatar
              src='university.png'
              fallback='A'
              radius='full'
              size='6'
              className='me-3'
            />
            <Text>
              Alberto Cabri (RTDA Researcher) Luca Cappelletti (PhD) Emanuele
            </Text>
          </li>
        </ul>

        <Text>
          We would also like to add Alberto Bertoni, who recently departed his
          life. He created the conditions to develop a Computational Biology Lab
          in our Computer Science dept. and effectively contibuted to
          computational biology research with his unique and exceptional
          research qualities.
        </Text>
      </Flex>
    </>
  );
};

export default People;
