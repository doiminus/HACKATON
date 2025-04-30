import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarWithEvents from './CalendarWithEvents';
import { useSelector, useDispatch } from "react-redux";
import { getOrganization, getSports, getVenues, getTeams } from '../redux/userSlice';
import SportAndCategoryList from './SportAndCategoryList ';
import VenueList from './VenueList';
import TeamList from '../TeamLisr';
import CreateEvent from './CreateEvent';

const Dashboard = () => {

    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [org_name, set_org_name] = useState("");
    const [org_id, set_org_id] = useState(0);
    const [local_teams, set_local_teams] = useState([]);
    const {
        user,
        organization,
        sports,
        venues,
        teams } = useSelector(state => state.user);

    useEffect(() => {
        if (user && !organization)
            dispatch(getOrganization());
    }, [dispatch]);

    useEffect(() => {
        if (organization) {
            set_org_name(organization.organization_name);
            set_org_id(organization.id);
        }
    }, [organization]);

    useEffect(() => {
        if (organization && sports.length === 0) {
            const payload = { id: org_id };
            dispatch(getSports(payload));
            dispatch(getVenues(payload));
        }
    }, [dispatch, organization, org_id, sports]);

    useEffect(() => {
        if (sports.length > 0) {
            const sportIds = sports.map(sport => sport.id);
            const payload = { sport_ids: sportIds };
            dispatch(getTeams(payload));
        }
    }, [dispatch, sports]);

    const handleClick = (element) => {
    }

    const handleClickVenue = (element) => {
    }

    const handleClickTeam = (element) => {
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-br from-zagreb-blue to-zagreb-light-blue text-white p-5">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                            <h2 className="text-2xl font-bold">📅 Sportska nadzorna ploča {org_name}</h2>
                            <p className="text-sm mt-1 text-zagreb-yellow">
                                {format(selectedDate, 'dd.MM.yyyy')} - pregled događanja i organizacija
                            </p>
                        </div>
                        <div className="mt-3 md:mt-0 flex items-center bg-white px-3 py-2 rounded-md text-black">
                            <i className="bi bi-calendar-day mr-2 text-zagreb-blue text-lg"></i>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd.MM.yyyy"
                                className="focus:outline-none"
                            />
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <CreateEvent />
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <TeamList teams={teams} onSelectTeam={handleClickTeam} />
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <SportAndCategoryList items={sports} onSelect={handleClick} />
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <VenueList venues={venues} onSelectVenue={handleClickVenue} />
                    </div>
                </div>

                <div className="border-t border-gray-300 my-6"></div>
                <div>
                    <CalendarWithEvents selectedDate={selectedDate} />
                </div>
                <div className="bg-gradient-to-br from-zagreb-blue to-zagreb-light-blue text-white p-4 rounded-b-lg text-center text-sm">
                    © 2025 Sporterica – Ostanite aktivni! 🏃‍♂️
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
