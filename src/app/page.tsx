// 'use client';

// import { Box, Container, Flex, Strong, Text } from '@radix-ui/themes';
// import logo from '../../public/logo.png';
// import uni from '../../public/University.png';
// import { FormattedMessage } from 'react-intl';
// import Image from 'next/image';

// const Home = () => {
//   return (
//     <>
//       <Flex
//         gap={'0'}
//         justify={'center'}
//         pt={'6'}
//         pb={'6'}
//         className='!bg-[#4f772d] h-[15rem]'
//       >
//         <Box>
//           <Image
//             src={logo.src}
//             alt='logo'
//             width={100}
//             height={100}
//             className='sm:!w-[10rem] sm:!h-[10rem]'
//           />
//         </Box>
//         <Box height='9' className='w-[18rem] mx-5 text-center	'>
//           <Text
//             size={{
//               initial: '2',
//               xs: '2',
//               sm: '3',
//               md: '4',
//               lg: '5',
//             }}
//           >
//             <Strong>
//               <FormattedMessage defaultMessage={'Strong'} id='Home.header' />
//             </Strong>
//             <br />
//             <FormattedMessage defaultMessage={'text'} id='Home.header.text' />
//           </Text>
//         </Box>
//         <Box>
//           <Image
//             src={uni.src}
//             alt='logo'
//             width={100}
//             height={100}
//             className='sm:!w-[10rem] sm:!h-[10rem]'
//           />
//         </Box>
//       </Flex>

//       <Container mt={'4'}>
//         <Text
//           className='text-xl'
//           size={{
//             initial: '2',
//             xs: '2',
//             sm: '3',
//             md: '4',
//             lg: '5',
//           }}
//         >
//           We are a research group focused on the application of Artificial
//           Intelligence methods to Molecular Biology and Medicine, and we are
//           part of the Department of Computer Science of the University of Milan.
//           <br />
//           The core of our expertise is in the area of Computer Science, with a
//           special focus on Machine Learning, Data Mining and Data Science, but
//           we apply an interdisciplinary approach that combines knowledge from
//           different areas of Computer Science, Molecular Biology and
//           Biotechnology, often in the context of collaborations with national
//           and international research groups, to develop new or to adapt existing
//           computational approaches to Systems Biology, Network and Precision
//           Medicine, and to other Computational Biology research areas.
//           <br />
//           Our research is documented by more than 150 publications in
//           international journals and conferences in the field of Computational
//           Biology, Bioinformatics and Data Science.
//         </Text>
//       </Container>
//     </>
//   );
// };

// export default Home;

// components/ScheduleTable.tsx
'use client';
import React, { useState, useCallback } from 'react';

// Define a type for the schedule state
type ScheduleState = {
  [day: string]: {
    [time: string]: boolean;
  };
};

const daysOfWeek: string[] = ['ج', 'س', 'چ', 'پ', 'د', 'ی', 'ش'];
const timesOfDay: string[] = [
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '24:00',
];

const ScheduleTable: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleState>({});
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const toggleTimeSlot = useCallback((day: string, time: string): void => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [time]: !prevSchedule[day]?.[time],
      },
    }));
  }, []);

  const handleTouch = useCallback(
    (day: string, time: string): void => {
      if (isDragging) {
        toggleTimeSlot(day, time);
      }
    },
    [isDragging, toggleTimeSlot]
  );

  const startDragging = useCallback(
    (day: string, time: string): void => {
      setIsDragging(true);
      toggleTimeSlot(day, time);
    },
    [toggleTimeSlot]
  );

  const stopDragging = useCallback((): void => {
    setIsDragging(false);
  }, []);

  return (
    <div className='overflow-x-auto'>
      <table className='table-fixed border-collapse bg-white'>
        <thead>
          <tr>
            <th className='w-16 p-2'></th> {/* Empty corner cell */}
            {daysOfWeek.map((day) => (
              <th key={day} className='p-2 bg-purple-200 border'>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timesOfDay.map((time) => (
            <tr key={time}>
              <td className='p-2 bg-purple-200 border'>{time}</td>
              {daysOfWeek.map((day) => (
                <td
                  key={day}
                  className={`p-2 border cursor-pointer ${
                    schedule[day]?.[time] ? 'bg-purple-400' : 'bg-purple-100'
                  }`}
                  onTouchStart={() => startDragging(day, time)}
                  onTouchMove={() => handleTouch(day, time)}
                  onTouchEnd={stopDragging}
                >
                  {/* Cell content here */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
