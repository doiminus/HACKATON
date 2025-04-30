import React, { useState } from 'react';
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

const EventCardMap = ({ sport, teamA, teamB, venue, date, time, imageUrl, teamAScore = 0, teamBScore = 0 }) => {
    const [isClicked, setIsClicked] = useState(false);

    const sportInCroatian = sportNamesInCroatian[sport] || sport;
    const icon = sportIcons[sport] || { icon: cilBoltCircle };
    const showTeams = teamA !== 'NA' && teamB !== 'NA';

    const handleCardClick = () => {
        setIsClicked((prev) => !prev);
    };

    function isOlderThanToday(inputDate) {
        if (!inputDate) return false;

        const dateToCompare = new Date(inputDate);
        if (isNaN(dateToCompare.getTime())) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        dateToCompare.setHours(0, 0, 0, 0);

        return dateToCompare < today;
    }


    return (
        <div
            className={`relative aspect-video bg-zagreb-light-blue rounded-b-xl overflow-hidden shadow-lg border border-zagreb-blue flex items-end cursor-pointer transform transition-all duration-300 ${isClicked ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : ''}`}

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
                <span className="text-sm font-medium">{sportInCroatian}</span>
            </div>

            <div className="relative z-10 p-4 bg-black/40 text-white w-full">
                {showTeams && (
                    <h3 className="text-md font-semibold truncate">
                        {teamA} - {teamB}
                    </h3>
                )}

                {showTeams && isOlderThanToday(date) && (
                    <h3 className="text-md font-semibold truncate">
                        {teamAScore} : {teamBScore}
                    </h3>
                )}
                <p className="text-sm" style={{ marginTop: "5px" }}>{venue}</p>
                <p className="text-xs mt-1 opacity-90" style={{ marginTop: "-15px" }}>{formatDateDDMMYYYY(date)} u {time}</p>
            </div>
        </div>
    );
};

export default EventCardMap;
