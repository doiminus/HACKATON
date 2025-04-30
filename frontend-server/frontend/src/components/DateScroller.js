import React, { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';

const DateScroller = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const scrollRef = useRef(null);
    const currentDate = dayjs();

    const startOfMonth = dayjs().startOf('month');
    const endOfMonth = dayjs().endOf('month');
    const dates = [];
    let currentDay = startOfMonth;

    while (currentDay.isBefore(endOfMonth) || currentDay.isSame(endOfMonth, 'day')) {
        dates.push(currentDay);
        currentDay = currentDay.add(1, 'day');
    }

    const handleCalendarOpen = () => {
        alert("Open a modal or navigate to another page.");
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const interval = setInterval(scrollRight, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full py-5">

            <button
                onClick={scrollLeft}
                className="absolute left-0 top-0 bottom-0 z-10 w-[50px] bg-gradient-to-r from-white/80 to-transparent hover:from-white flex items-center justify-center"
            >
                <i className="bi bi-chevron-left text-3xl text-black"></i>
            </button>

            <div
                ref={scrollRef}
                className="flex space-x-1 overflow-x-auto scrollbar-hide scroll-smooth px-4"
            >
                <button
                    onClick={handleCalendarOpen}
                    className="bg-zagreb-light-blue text-white p-3 rounded-lg shadow-md hover:bg-zagreb-light-blue/70 transition duration-200 flex items-center justify-center"
                >
                    <i className="bi bi-calendar-week" style={{ fontSize: '24px' }}></i>
                </button>

                {dates.map((date) => {
                    const isSelected = date.isSame(selectedDate, 'day');
                    const isCurrentDate = date.isSame(currentDate, 'day');

                    return (
                        <button
                            key={date.format('YYYY-MM-DD')}
                            onClick={() => setSelectedDate(date)}
                            className={`flex flex-col items-center px-4 py-2 rounded-lg border shadow-sm transition duration-200
                                ${isSelected
                                    ? 'bg-zagreb-yellow text-white font-bold'
                                    : isCurrentDate
                                        ? 'bg-zagreb-light-blue text-white font-bold'
                                        : 'bg-white text-zagreb-blue hover:bg-zagreb-light-blue/40'}
                            `}
                        >
                            <span className="text-sm">{date.format('ddd')}</span>
                            <span className="text-lg">{date.format('D')}</span>
                        </button>
                    );
                })}
            </div>

            <button
                onClick={scrollRight}
                className="absolute right-0 top-0 bottom-0 z-10 w-[50px] bg-gradient-to-l from-white/80 to-transparent hover:from-white flex items-center justify-center"
            >
                <i className="bi bi-chevron-right text-3xl text-black"></i>
            </button>
        </div>
    );
};

export default DateScroller;
