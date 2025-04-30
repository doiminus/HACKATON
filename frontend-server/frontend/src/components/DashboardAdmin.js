import React, { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import OrganizationsList from './OrganizationsList';
import EventsList from './EventsList';
import CalendarWithEvents from './CalendarWithEvents';

const DashboardAdmin = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">


                <div className="bg-gradient-to-br from-zagreb-blue to-zagreb-yellow text-white p-5">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                            <h2 className="text-2xl font-bold">📅 Sportska nadzorna ploča</h2>
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
                    <OrganizationsList />
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <EventsList selectedDate={selectedDate} />
                    </div>
                </div>
                <div className="border-t border-gray-300 my-6"></div>
                <div>
                    <CalendarWithEvents selectedDate={selectedDate} />
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-br from-zagreb-blue to-zagreb-light-blue text-white p-4 rounded-b-lg text-center text-sm">
                    © 2025 Sporterica – Ostanite aktivni! 🏃‍♂️
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
