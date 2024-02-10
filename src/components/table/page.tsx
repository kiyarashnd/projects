// components/ScheduleTable.tsx
import React, { useState } from 'react';

type ScheduleState = {
  [day: string]: {
    [time: string]: boolean;
  };
};

const daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
];

const ScheduleTable: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleState>({});
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const getCellId = (day: string, time: string): string => {
    return `${day}-${time}`;
  };

  const handleSelectionStart = (day: string, time: string) => {
    setIsSelecting(true);
    // Initialize the day in the schedule if it does not exist
    if (!schedule[day]) {
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        [day]: {},
      }));
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLTableElement>) => {
    if (!isSelecting) return;

    // Get the touch location
    const touch = event.touches[0];
    const element = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    ) as HTMLElement;

    if (element && element.dataset.type === 'selectable') {
      const day = element.dataset.day;
      const time = element.dataset.time;
      if (day && time) {
        setSchedule((prevSchedule) => ({
          ...prevSchedule,
          [day]: {
            ...prevSchedule[day],
            [time]: true, // Set the cell as selected
          },
        }));
      }
    }
  };

  const handleSelectionEnd = () => {
    setIsSelecting(false);
  };

  console.log('schedule is : ', schedule);

  return (
    <div className='overflow-x-auto'>
      <table
        className='table-fixed border-collapse bg-white'
        onTouchStart={(e) => e.preventDefault()} // Prevents page scrolling when dragging starts
        onTouchMove={handleTouchMove}
        onTouchEnd={handleSelectionEnd}
      >
        <thead>
          <tr>
            <th className='w-16 p-2'></th>
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
                  data-type='selectable'
                  data-day={day}
                  data-time={time}
                  onTouchStart={() => handleSelectionStart(day, time)}
                  className={`p-2 border cursor-pointer ${
                    schedule[day]?.[time] ? 'bg-purple-400' : 'bg-purple-100'
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
