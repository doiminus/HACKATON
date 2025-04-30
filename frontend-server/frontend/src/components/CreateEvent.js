import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createEvent } from '../redux/userSlice';

const CreateEvent = () => {
    const dispatch = useDispatch();

    const { sports, teams, venues } = useSelector(state => state.user);
    const [validationError, setValidationError] = useState('');

    const [selectedSport, setSelectedSport] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTeam1, setSelectedTeam1] = useState('');
    const [selectedTeam2, setSelectedTeam2] = useState('');
    const [selectedVenue, setSelectedVenue] = useState('');
    const [eventDate, setEventDate] = useState(new Date());

    const handleSportChange = (e) => {
        const selectedSport = e.target.value;
        setSelectedSport(selectedSport);
        setSelectedCategory('');
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleTeam1Change = (e) => {
        setSelectedTeam1(e.target.value);
    };

    const handleTeam2Change = (e) => {
        setSelectedTeam2(e.target.value);
    };

    const handleVenueChange = (e) => {
        setSelectedVenue(e.target.value);
    };

    const handleDateChange = (date) => {
        setEventDate(date);
    };

    const handleSubmit = () => {
        if (!selectedSport || !selectedTeam1 || !selectedTeam2 || !selectedVenue || !eventDate) {
            setValidationError("Molimo popunite sva polja prije nego što kreirate događaj.");
            return;
        }

        if (selectedTeam1 === selectedTeam2) {
            setValidationError("Tim 1 i Tim 2 ne mogu biti isti.");
            return;
        }

        setValidationError(''); // clear error if all is good

        const isoDate = eventDate.toISOString();
        const date = isoDate.split("T")[0];
        const time = isoDate.split("T")[1].slice(0, 5);

        const eventDetails = {
            name: `${selectedTeam1} vs ${selectedTeam2}`,
            sport_and_category_id: Number(selectedSport),
            venue_id: Number(selectedVenue),
            home_team_id: Number(selectedTeam1),
            away_team_id: Number(selectedTeam2),
            date,
            time,
            score_home: 0,
            score_away: 0
        };

        dispatch(createEvent(eventDetails));
        console.log("Događaj kreiran s podacima:", eventDetails);
    };

    const filteredCategories = sports.find(sport => sport.id === Number(selectedSport))?.categories || [];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Kreiraj Događaj</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sport</label>
                    <select
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                        value={selectedSport}
                        onChange={handleSportChange}
                    >
                        <option value="">Odaberite Ligu</option>
                        {sports.map(sport => (
                            <option key={sport.id} value={sport.id}>{sport.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tim 1</label>
                    <select
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                        value={selectedTeam1}
                        onChange={handleTeam1Change}
                        disabled={!selectedSport}
                    >
                        <option value="">Odaberite Tim 1</option>
                        {teams.map(team => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tim 2</label>
                    <select
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                        value={selectedTeam2}
                        onChange={handleTeam2Change}
                        disabled={!selectedSport}
                    >
                        <option value="">Odaberite Tim 2</option>
                        {teams.map(team => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Mjesto</label>
                    <select
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                        value={selectedVenue}
                        onChange={handleVenueChange}
                    >
                        <option value="">Odaberite Mjesto</option>
                        {venues.map(venue => (
                            <option key={venue.id} value={venue.id}>{venue.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Datum i Vrijeme Događaja</label>
                    <DatePicker
                        selected={eventDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="bg-zagreb-blue text-white py-2 px-4 rounded-md hover:bg-zagreb-light-blue transition duration-300 ease-in-out"
                >
                    Kreiraj Događaj
                </button>
                {validationError && (
                    <div className="mt-4 text-red-600 font-medium">{validationError}</div>
                )}
            </div>
        </div>
    );
};

export default CreateEvent;
