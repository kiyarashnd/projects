'use client';

import React, { useState, useRef, useEffect } from 'react';

type ScheduleState = {
  [day: string]: {
    [time: string]: boolean;
  };
};

const daysOfWeek: string[] = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'];
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
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [lastToggled, setLastToggled] = useState<{
    day: string;
    time: string;
  } | null>(null);

  const handleSelectionStart = (day: string, time: string) => {
    setIsSelecting(true);
    // Initialize the day in the schedule if it does not exist
    if (!schedule[day]) {
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        [day]: {},
      }));
    }

    // Toggle the selected state of the cell
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [time]: !prevSchedule[day]?.[time], // Toggle the selected state
      },
    }));
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLTableElement>) => {
    if (!isSelecting) return;

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
            const isSelected = prevSchedule[day]?.[time] || false;
            return {
              ...prevSchedule,
              [day]: {
                ...prevSchedule[day],
                [time]: !isSelected,
              },
            };
          });
          setLastToggled({ day, time });
        }
      }
    }
  };

  const tableRef = useRef<HTMLTableElement>(null);

  const handleSelectionEnd = () => {
    setIsSelecting(false);
    setLastToggled(null);
  };

  // console.log("schedule is : ", schedule);

  useEffect(() => {
    // Define the function inside the effect so it has access to the state
    const handleTouchStart = (event: TouchEvent) => {
      // Prevent scrolling
      event.preventDefault();
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
    <div className='overflow-x-auto'>
      <table
        className='table-fixed border-collapse border-blue-600 bg-white border-spacing-y-4'
        // onTouchStart={handletouchs} // Prevents page scrolling when dragging starts
        // onTouchStart={handleTouchStart}
        ref={tableRef}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleSelectionEnd}
      >
        <thead
          // className={`after:content-[' '] aftre:block after:h-[12rem] after:w-full after:bg-white`}
          className='mb-6'
        >
          <tr>
            <th className='p-2'></th>
            {daysOfWeek.map((day) => (
              <th
                key={day}
                className='!w-[7rem] py-2 bg-[var(--accent-9)] border border-[var(--accent-9)] text-white 
								ast:!rounded-tl-lg 
								border-t-0
								'
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        {/* <div className="w-full h-4"></div> */}
        <tbody>
          {timesOfDay.map((time) => (
            <tr key={time}>
              <td className='py-2'>{time}</td>
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
