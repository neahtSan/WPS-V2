'use client';

import { useState, useRef, useEffect } from 'react';
import { format, parseISO, isSameMonth, isSameDay } from 'date-fns';
import { th } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { CalendarToday } from '@mui/icons-material'; // You can switch this to a Heroicon if preferred
import { Event } from '@/types/event';
import mockEvents from '@/data/mock_events.json';

const events: Event[] = mockEvents;

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [showAll, setShowAll] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };

  const getEventsForDay = (date: Date) => {
    return events.filter((event) =>
      isSameDay(parseISO(event.date), date)
    );
  };

  const getEventsForMonth = (date: Date) => {
    return events.filter((event) =>
      isSameMonth(parseISO(event.date), date)
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setSelectedDate(undefined);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const monthEvents = getEventsForMonth(currentMonth);
  const dayEvents = selectedDate ? getEventsForDay(selectedDate) : [];
  const displayedEvents = selectedDate ? dayEvents : monthEvents;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#8B4513]">
          ปฏิทินกิจกรรมของวัด
        </h2>
        <button
          className="text-[#8B4513] hover:text-[#DAA520]"
          onClick={() => setCurrentMonth(today)}
          aria-label="กลับไปวันนี้"
        >
          <CalendarToday />
        </button>
      </div>

      <div
        className="flex flex-col md:flex-row gap-4"
        ref={calendarRef}
      >
        {/* Calendar */}
        <div className="border rounded-xl shadow-md p-2 bg-white">
          <DayPicker
            locale={th}
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={handleMonthChange}
            modifiers={{
              hasEvent: (day) =>
                monthEvents.some((event) =>
                  isSameDay(parseISO(event.date), day)
                ),
            }}
            modifiersStyles={{
              hasEvent: {
                backgroundColor: '#DAA520',
                color: '#fff',
                borderRadius: '50%',
              },
            }}
            showOutsideDays
            styles={{
              caption: { textAlign: 'center', fontSize: '1.25rem' },
              day: { fontSize: '1rem', padding: '0.5rem' },
            }}
          />
        </div>

        {/* Event list */}
        <div className="flex-1 bg-[#F5DEB3] rounded-xl shadow-inner p-4 max-h-[400px] overflow-y-auto">
          <h3 className="text-[#8B4513] text-lg font-semibold mb-3">
            {selectedDate
              ? `กิจกรรมวันที่ ${format(selectedDate, 'PPP', { locale: th })}`
              : `กิจกรรมในเดือน ${format(currentMonth, 'LLLL yyyy', {
                  locale: th,
                })}`}
          </h3>

          {displayedEvents.length === 0 && (
            <p className="text-sm text-gray-700">ไม่มีรายการกิจกรรม</p>
          )}

          <ul className="space-y-4">
            {displayedEvents
              .slice(0, showAll ? displayedEvents.length : 3)
              .map((event) => (
                <li
                  key={event.id}
                  className="bg-white rounded-lg p-4 shadow transition hover:shadow-md"
                >
                  <p className="text-[#8B4513] font-bold text-base">
                    {event.title}
                  </p>
                  <p className="text-sm text-gray-700">
                    🕒 {event.time}
                  </p>
                  <p className="text-sm text-gray-600">
                    {event.description}
                  </p>
                </li>
              ))}
          </ul>

          {displayedEvents.length > 3 && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-base font-large font-bold text-[#8B4513] underline transition hover:text-[#DAA520]"
              >
                {showAll ? 'แสดงน้อยลง' : 'ดูทั้งหมด'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
