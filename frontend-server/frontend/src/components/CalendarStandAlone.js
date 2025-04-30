import React, { useState } from 'react';
import { CIcon } from '@coreui/icons-react';
import {
    cilFootball, cilBasketball, cilCheckCircle,
    cilBoltCircle, cilBaseball, cilBike, cilSwimming
} from '@coreui/icons';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

import { sportNamesInCroatian } from '../utils/sportNames';

import CalendarWithEvents from './CalendarWithEvents';

const sportIcons = {
    Football: cilFootball,
    Basketball: cilBasketball,
    Handball: cilCheckCircle,
    Athletics: cilBoltCircle,
    Volleyball: cilBoltCircle,
    Tennis: cilCheckCircle,
    Baseball: cilBaseball,
    Cycling: cilBike,
    Swimming: cilSwimming,
};

const CalendarStandAlone = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSports, setSelectedSports] = useState({
        Football: true,
        Basketball: true,
        Handball: true,
        Athletics: true,
        Volleyball: true,
        Tennis: true,
        Baseball: true,
        Cycling: true,
        Swimming: true,
    });

    const handleCheckboxChange = (sport) => {
        setSelectedSports(prevState => ({
            ...prevState,
            [sport]: !prevState[sport],
        }));
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-xl flex flex-col">

                <div className="bg-zagreb-blue text-white p-3 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Sportska događanja</h2>
                        <div className="bg-white rounded-md px-2 py-1">
                            <i className="bi bi-calendar-day text-gray-600 mr-2"></i>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd.MM.yyyy"
                                className="text-black"
                            />
                        </div>
                    </div>
                    <p className="mt-2 text-sm">
                        {format(selectedDate, 'dd.MM.yyyy')} - Popis sportskih događaja
                    </p>

                    <div className="mt-4 flex flex-wrap gap-4">
                        {Object.keys(sportNamesInCroatian).map((sport) => (
                            <label key={sport} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedSports[sport]}
                                    onChange={() => handleCheckboxChange(sport)}
                                    className="form-checkbox"
                                />
                                <div className="flex items-center bg-black/50 px-2 py-1 rounded-md text-white">
                                    <CIcon
                                        icon={sportIcons[sport]}
                                        size="lg"
                                        className="mr-2 text-white w-5 h-5"
                                    />
                                    <span className="text-sm font-medium">{sportNamesInCroatian[sport]}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex min-h-[1250px] overflow-hidden">
                    <CalendarWithEvents selectedDate={selectedDate} />
                </div>

                <div className="bg-zagreb-blue text-white p-4 rounded-b-lg">
                    <div className="text-lg font-semibold">Sporterica</div>
                    <div className="text-sm mt-2">
                        Pratite nas za više događanja! Redovito provjeravajte za novim ažuriranjima o sportskim događajima koji se održavaju u vašem području.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarStandAlone;
