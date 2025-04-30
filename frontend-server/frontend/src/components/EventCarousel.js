import React, { useRef, useEffect } from 'react';
import EventCard from './EventCard';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { dummyEvents } from '../utils/dummyData';


const EventCarousel = () => {
    const scrollRef = useRef(null);
    const cardWidth = 320;

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });

            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            if (scrollLeft + clientWidth >= scrollWidth - cardWidth) {
                setTimeout(() => {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }, 5000);
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(scrollRight, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full overflow-hidden py-5">
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
                {dummyEvents.map((event) => (
                    <div key={event.id} className="flex-shrink-0 w-[300px]">
                        <EventCard
                            sport={event.sport}
                            teamA={event.teamA}
                            teamB={event.teamB}
                            venue={event.venue}
                            date={event.date}
                            time={event.time}
                            imageUrl={event.imageUrl}
                        />
                    </div>
                ))}
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

export default EventCarousel;
