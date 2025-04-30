import React from 'react';

const VenueList = ({ venues, onSelectVenue }) => {
    const handleClick = (e, venue) => {
        const clickedElement = e.target.closest('li');
        if (clickedElement) {
            clickedElement.classList.toggle('active');
            const sibling = clickedElement.nextElementSibling;
            if (sibling) sibling.classList.toggle('dropdown-active');
        }

        if (onSelectVenue && venue) {
            onSelectVenue(venue);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-zagreb-blue"> Lokacije</h3>
                <button
                    className="bg-zagreb-blue text-white py-2 px-4 rounded-md hover:bg-zagreb-light-blue transition duration-300 ease-in-out"
                    onClick={() => alert('Add Venue clicked!')}
                >
                    <i className="bi bi-plus"></i> Dodaj
                </button>
            </div>

            <ul className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
                {venues.map(venue => (
                    <li
                        key={venue.id}
                        onClick={(e) => handleClick(e, venue)} 
                        className="cursor-pointer bg-white border border-gray-300 rounded-md p-4 shadow-sm hover:bg-blue-50 transition duration-150 flex items-center gap-3"
                    >
                        <img 
                            src={venue.photo} 
                            alt={venue.name} 
                            className="w-16 h-16 object-cover rounded-md" 
                        />

                        <div className="flex flex-col">
                            <h4 className="text-lg font-semibold text-zagreb-blue">{venue.name}</h4>
                            <p className="text-sm text-gray-600">Address: {venue.address}</p>
                            {venue.capacity && <p className="text-sm text-gray-600">Capacity: {venue.capacity}</p>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VenueList;
