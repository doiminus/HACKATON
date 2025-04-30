import React from 'react';
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

import { formatDateDDMMYYYY } from '../utils/dateUtils';
import { sportNamesInCroatian } from '../utils/sportNames';

import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEvent } from '../redux/dataSlice';
import { getEventById } from '../redux/userSlice';

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

const EventCard = ({ id, sport, teamA, teamB, venue, date, time, imageUrl, category }) => {
    const dispatch = useDispatch();
    const selected_event = useSelector(state => state.data.selected_event);

    const sportInCroatian = sportNamesInCroatian[sport] || sport;
    const icon = sportIcons[sport] || { icon: cilBoltCircle };
    const showTeams = teamA !== 'NA' && teamB !== 'NA';

    const isSelected = selected_event === id;

    const handleCardClick = () => {
        dispatch(setSelectedEvent(id));
        const payload = { id: id };
        dispatch(getEventById(id));
    };

    return (
        <div
            className={`relative w-[300px] aspect-video bg-zagreb-light-blue rounded-xl overflow-hidden shadow-lg border border-zagreb-blue flex items-end cursor-pointer transform transition-all duration-300 ${isSelected ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : ''}`}
            onClick={handleCardClick}
        >
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={sport}
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
                />
            )}

            <div className="absolute top-3 left-3 z-10 flex items-center bg-black/50 px-2 py-1 rounded-md text-white">
                {icon && (
                    <CIcon {...icon} size="lg" className="mr-2 text-white w-5 h-5" />
                )}
                <span className="text-sm font-medium">{sportInCroatian} - {category}</span>
            </div>

            <div className="relative z-10 p-4 bg-black/40 text-white w-full">
                {showTeams && (
                    <h3 className="text-md font-semibold truncate">
                        {teamA} - {teamB}
                    </h3>
                )}
                <p className="text-sm">{venue}</p>
                <p className="text-xs mt-1 opacity-90">{formatDateDDMMYYYY(date)} u {time}</p>
            </div>
        </div>
    );
};

export default EventCard;
