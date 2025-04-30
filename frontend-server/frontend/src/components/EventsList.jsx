import React from 'react';
import { dummyEvents } from '../utils/dummyData'; // Dummy event data

const EventsList = ({ selectedDate }) => {
  const filteredEvents = dummyEvents.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <ul className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
    

    <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold text-zagreb-blue mb-3">🏟️ Događaji XXX</h3>
        <button
          className="bg-zagreb-blue text-white py-2 px-4 rounded-md hover:bg-zagreb-light-blue transition duration-300 ease-in-out"
          onClick={() => alert('Dodaj Događaj clicked!')}
        >
            <i className="bi bi-plus"></i>
          Dodaj
        </button>
        
      </div>

      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <li key={event.id} className="bg-white rounded shadow p-4 flex gap-4">
            <img src={event.imageUrl} alt={event.sport} className="w-20 h-20 object-cover rounded-md" />
            <div>
              <h4 className="text-md font-bold text-zagreb-blue">{event.sport}: {event.teamA} vs {event.teamB}</h4>
              <p className="text-sm text-gray-600">{event.venue}</p>
              <p className="text-sm text-gray-500">{event.date} u {event.time}</p>
            </div>
          </li>
        ))
      ) : (
        <div className="text-gray-500 italic">Nema događaja za odabrani datum.</div>
      )}
    </ul>
  );
};

export default EventsList;
