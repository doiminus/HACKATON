import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { format } from 'date-fns';
import { CIcon } from '@coreui/icons-react';
import {
  cilFootball,
  cilBasketball,
  cilBoltCircle,
  cilCheckCircle,
  cilBaseball,
  cilBike,
  cilSwimming,
} from '@coreui/icons';
import { sportNamesInCroatian } from '../utils/sportNames';
import { formatDateDDMMYYYY, formatMonthYear, getDaysInMonth } from '../utils/dateUtils';
import { getAllEvents } from '../redux/userSlice';

const sportIcons = {
  Football: { icon: cilFootball },
  Basketball: { icon: cilBasketball },
  Handball: { icon: cilCheckCircle },
  Athletics: { icon: cilBoltCircle },
  Volleyball: { icon: cilBoltCircle },
  Tennis: { icon: cilCheckCircle },
  Baseball: { icon: cilBaseball },
  Cycling: { icon: cilBike },
  Swimming: { icon: cilSwimming },
};

const CalendarWithEvents = () => {

  const dispatch = useDispatch();
  const { events } = useSelector(state => state.user);
  const [dummyEvents, setDummyEvents] = useState([]);

  useEffect(() => {
      dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
      
      if (events.events) {
          setDummyEvents(events.events);
      }
  }, [events]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

  const startDayOfWeek = startOfMonth.getDay();

  const daysInMonth = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    daysInMonth.push(null); 
  }
  for (let day = 1; day <= endOfMonth.getDate(); day++) {
    daysInMonth.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
  }

  const eventsByDate = dummyEvents.reduce((acc, event) => {
    const dateKey = new Date(event.date).toDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
  }, {});

  const handlePrevMonth = () => {
    setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };


  const monthNameInCroatian = formatMonthYear(selectedDate, 'MMMM yyyy');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[100%]">
      <div className="flex items-center justify-between mb-6">
        <button onClick={handlePrevMonth} className="bg-zagreb-blue text-white px-4 py-2 rounded hover:bg-zagreb-light-blue">
          <i className="bi bi-arrow-left"></i>
        </button>
        <h2 className="text-2xl font-bold text-zagreb-blue">
          📅 {monthNameInCroatian}
        </h2>
        <button onClick={handleNextMonth} className="bg-zagreb-blue text-white px-4 py-2 rounded hover:bg-zagreb-light-blue">
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 text-center font-semibold text-zagreb-blue mb-2">
        {['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {daysInMonth.map((day, index) => {
          const isOutsideCurrentMonth = day === null;

          const dateKey = day ? day.toDateString() : null;
          const events = dateKey ? eventsByDate[dateKey] || [] : [];

          return (
            <div
              key={index}
              className={`bg-gray-50 border border-zagreb-blue rounded-md p-3 min-h-[200px] shadow-sm ${
                isOutsideCurrentMonth ? 'bg-gray-500/50' : ''
              }`}
            >
              {day && (
                <>
                  <div className="text-right text-xs font-semibold text-gray-500 mb-2">
                    {format(day, 'd')}
                  </div>

                  {events.length > 0 ? (
                    events.map((event) => {
                      const icon = sportIcons[event.sport] || { icon: cilBoltCircle };
                      const sportInCroatian = sportNamesInCroatian[event.sport] || event.sport;

                      return (
                        <div key={event.id} className="bg-zagreb-blue/90 text-white rounded-md px-2 py-1 mb-2 text-xs shadow flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <CIcon {...icon} size="sm" className="w-4 h-4 text-white" />
                            <span className="font-medium">{sportInCroatian}</span>
                          </div>
                          <div>{event.teamA} - {event.teamB}</div>
                          <div>{event.time}h</div>
                          <div className="text-zagreb-yellow">{event.venue}</div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs italic text-gray-400">Nema događaja</p>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWithEvents;
