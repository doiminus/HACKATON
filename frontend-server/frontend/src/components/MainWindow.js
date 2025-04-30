import React, { useState, useEffect } from 'react';
import { CIcon } from '@coreui/icons-react';
import {
    cilFootball, cilBasketball, cilCheckCircle,
    cilBoltCircle, cilBaseball, cilBike, cilSwimming
} from '@coreui/icons';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, subDays, addDays } from 'date-fns';
import { sportNamesInCroatian } from '../utils/sportNames';
import EventCard from './EventCard';
import MainWindowDetails from './MainWindowDetails';
import LeafletMapComponent from './LeafletMapComponent';
import { useSelector, useDispatch } from "react-redux";

import { getAllEvents } from '../redux/userSlice';
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

const MainWindow = () => {

    const dispatch = useDispatch();
    const { events, selected_event } = useSelector(state => state.user);
    const [dummyEvents, setDummyEvents] = useState([]);

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    useEffect(() => {
        if (events.events) {
            setDummyEvents(events.events);
        }
    }, [events]);

    useEffect(() => {
        console.log(JSON.stringify(selected_event));
    }, [selected_event]);

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

    const today = new Date();
    const initialStartDate = subDays(today, 30);
    const initialEndDate = addDays(today, 30);

    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);

    const handleCheckboxChange = (sport) => {
        setSelectedSports(prevState => ({
            ...prevState,
            [sport]: !prevState[sport],
        }));
    };

    const filterByDateRange = (eventDate) => {
        if (!startDate || !endDate) return true;
        const eventDateObj = new Date(eventDate);
        return eventDateObj >= startDate && eventDateObj <= endDate;
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-xl flex flex-col">

                {/* Header */}
                <div className="bg-zagreb-blue text-white p-3 rounded-t-lg" >
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Sportska događanja</h2>
                        <div className="bg-white rounded-md px-2 py-1">
                            <i className="bi bi-calendar-day text-gray-600 mr-2"></i>
                            <DatePicker
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(dates) => {
                                    const [start, end] = dates;
                                    setStartDate(start);
                                    setEndDate(end);
                                }}
                                dateFormat="dd.MM.yyyy"
                                className="text-black"
                                isClearable
                            />
                        </div>
                    </div>
                    <p className="mt-2 text-sm" >
                        {startDate && endDate
                            ? `From: ${format(startDate, 'dd.MM.yyyy')} - To: ${format(endDate, 'dd.MM.yyyy')}`
                            : "Select date range"}
                    </p>
                </div>


                <div className="mt-4 flex flex-wrap gap-4" style={{ marginBottom: "5px", marginTop: "5px" }}>
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
                <div className="flex h-[800px] overflow-hidden">
                    <div className="flex flex-col w-[330px] overflow-y-auto p-2 border-r">
                        {dummyEvents
                            .filter(event =>
                                selectedSports[event.sport] && filterByDateRange(event.date)
                            )
                            .map((event) => (
                                <div key={event.id} className="mb-1">
                                    <EventCard
                                        id={event.id}
                                        sport={event.sport}
                                        teamA={event.teamA}
                                        teamB={event.teamB}
                                        venue={event.venue}
                                        date={event.date}
                                        time={event.time}
                                        imageUrl={event.imageUrl}
                                        category={event.category}
                                    />
                                </div>
                            ))}
                    </div>
                    <div className="flex-grow p-4 overflow-hidden">
                        <div className="h-full w-full rounded-lg shadow-md overflow-hidden">
                            <LeafletMapComponent events={dummyEvents.filter(event =>
                                selectedSports[event.sport] && filterByDateRange(event.date)
                            )} />
                        </div>
                    </div>
                </div>
                {selected_event ?
                    (<MainWindowDetails />)
                    : (<div>
                        <hr className="border-t border-gray-300" />
                        <CalendarWithEvents selectedDate={endDate} />
                    </div>
                    )
                }
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

export default MainWindow;
