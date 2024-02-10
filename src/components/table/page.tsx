// components/ScheduleTable.tsx
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
