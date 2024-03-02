'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Text } from '@radix-ui/themes';

type ScheduleState = {
  [day: string]: {
    [time: string]: boolean;
  };
};
interface TableProps {
  schedule: ScheduleState;
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleState>>;
}

const daysOfWeek: string[] = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
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

const ScheduleTable: React.FC<TableProps> = ({ schedule, setSchedule }) => {
  const [lastToggled, setLastToggled] = useState<{
    day: string;
    time: string;
  } | null>(null);

  const [firstToggled, setFirstToggled] = useState<{
    day: string;
    time: string;
  } | null>(null);

  const handleSelectionStart = (day: string, time: string) => {
    // Initialize the day in the schedule
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [time]: !prevSchedule[day]?.[time],
      },
    }));
    setFirstToggled({ day, time });
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLTableElement>) => {
    //here we get element that touched with date and time data set
    const touch = event.touches[0];
    const element = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    ) as HTMLElement;

    if (element && element.dataset.type === 'selectable') {
      const day = element.dataset.day;
      const time = element.dataset.time;

      if (day && time) {
        if (
          !lastToggled ||
          lastToggled.day !== day ||
          lastToggled.time !== time
        ) {
          setSchedule((prevSchedule) => {
            //below if says if item that you start darggin is like just last item that you dragging in your first try change color of that to purple
            if (
              firstToggled &&
              firstToggled.day === day &&
              firstToggled.time === time
            ) {
              return {
                ...prevSchedule,
                [day]: {
                  ...prevSchedule[day],
                  [time]: true,
                },
              };
            } else {
              //below code say if prevSchedule[day]?.[time] is undefined means is white set it false
              const isSelected = prevSchedule[day]?.[time] || false;
              return {
                ...prevSchedule,
                [day]: {
                  ...prevSchedule[day],
                  [time]: !isSelected,
                },
              };
            }
          });

          setLastToggled({ day, time });
        }
      }
    }
  };

  const tableRef = useRef<HTMLTableElement>(null);

  const handleSelectionEnd = () => {
    setLastToggled(null);
  };

  useEffect(() => {
    // Define the function inside the effect so it has access to the state
    const handleTouchStart = (event: TouchEvent) => {
      // Prevent scrolling
      event.preventDefault();
      // console.log("you touched me!", event.target);
      // ... (logic to handle touch start)
    };

    // Attach the event listener when the component mounts
    const table = tableRef.current;
    if (table) {
      table.addEventListener('touchstart', handleTouchStart, {
        passive: false,
      });
    }

    // Return a cleanup function to remove the event listener when the component unmounts
    return () => {
      if (table) {
        table.removeEventListener('touchstart', handleTouchStart);
      }
    };
  }, []); // Empty dependency array ensures this runs on mount and unmount only

  return (
    <div className='overflow-x-auto w-[90%]'>
      <table
        className='table-fixed border-collapse border-blue-600 bg-white border-spacing-y-4'
        // onTouchStart={handleTouchStart}
        ref={tableRef} // Prevents page scrolling when dragging starts
        onTouchMove={handleTouchMove}
        onTouchEnd={handleSelectionEnd}
      >
        <thead className='mb-6'>
          <tr>
            <th className='p-2'></th>
            {daysOfWeek.map((day) => (
              <th
                key={day}
                className={`${
                  day === 'ش' ? '!rounded-tr-xl' : ''
                } !w-[7rem] py-2 bg-[var(--accent-9)] border border-[var(--accent-9)] text-white 
								last:!rounded-tl-xl
								border-t-0 border-l-0 border-r-0 
								`}
              >
                <Text size='3' weight='regular'>
                  {day}
                </Text>
              </th>
            ))}
          </tr>
          <tr className='w-full h-4'></tr>
        </thead>
        <tbody>
          {timesOfDay.map((time) => (
            <tr key={time}>
              <td className='pb-4 -translate-y-3'>{time}</td>
              {daysOfWeek.map((day) => (
                <td
                  key={day}
                  data-type='selectable'
                  data-day={day}
                  data-time={time}
                  onTouchStart={() => handleSelectionStart(day, time)}
                  className={`p-2 border-2 cursor-pointer ${
                    schedule[day]?.[time] ? 'bg-purple-400' : 'bg-white'
                  }`}
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
