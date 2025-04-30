import React from 'react';
import { useSelector } from 'react-redux';

const MainWindowDetails = () => {
    const { selected_event } = useSelector(state => state.user);

    if (!selected_event) {
        return (
            <div className="bg-white p-6">
                <h3 className="text-lg font-semibold mb-4 text-zagreb-blue">Detalji događaja</h3>
                <p className="text-gray-700">No event selected</p>
            </div>
        );
    }

    const event = selected_event.event;

    const renderPlayerRows = () => {
        const rows = [];
        for (let i = 1; i <= 22; i++) {
            rows.push(
                <tr key={i} className="border-b">
                    <td className="px-4 py-2">{i}.</td>
                    <td className="px-4 py-2">-</td>
                    <td className="px-4 py-2">-</td>
                    <td className="px-4 py-2">
                        <button className="bg-zagreb-blue text-white px-3 py-1 text-sm rounded hover:bg-zagreb-blue-dark flex items-center gap-2">
                            <i className="bi bi-bar-chart-line"></i> Statistika
                        </button>
                    </td>
                </tr>
            );
        }
        return rows;
    };

    return (
        <>
            <hr className="border-t border-gray-300" />
            <div className="bg-white p-6">
                <h3 className="text-lg font-semibold mb-4 text-zagreb-blue">Detalji događaja</h3>

                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                    <div className="lg:w-1/3 bg-zagreb-light-blue/20 p-4 rounded shadow-sm">
                        <h4 className="text-md font-semibold text-zagreb-blue mb-2">Lokacija & Vrijeme</h4>
                        <p className="text-sm text-gray-700 mb-1"><strong>Mjesto:</strong> {event.venue}</p>
                        <p className="text-sm text-gray-700 mb-1"><strong>Vrijeme:</strong> {event.time}</p>
                        <p className="text-sm text-gray-700"><strong>Datum:</strong> {new Date(event.date).toLocaleDateString('hr-HR')}</p>
                    </div>

                    <div className="lg:w-2/3 bg-zagreb-light-blue/10 p-4 rounded shadow-sm">
                        <h4 className="text-md font-semibold text-zagreb-blue mb-2">Rezultat i timovi</h4>
                        <div className="flex items-center justify-between text-center">
                            <div className="w-1/3">
                                <h5 className="font-bold text-lg">{event.home_team.name}</h5>
                                <p className="text-sm text-gray-600">{event.home_team.name}</p>
                            </div>
                            <div className="w-1/3 text-3xl font-extrabold text-zagreb-yellow">
                                {event.score_home} : {event.score_away}
                            </div>
                            <div className="w-1/3">
                                <h5 className="font-bold text-lg">{event.away_team.name}</h5>
                                <p className="text-sm text-gray-600">{event.away_team.name}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h5 className="text-zagreb-blue font-semibold mb-2">{event.home_team.name}</h5>
                            <table className="w-full border border-gray-300 rounded text-sm">
                                <thead className="bg-zagreb-light-blue/50 text-zagreb-blue">
                                    <tr>
                                        <th className="px-4 py-2 text-left">#</th>
                                        <th className="px-4 py-2 text-left">Ime</th>
                                        <th className="px-4 py-2 text-left">Broj</th>
                                        <th className="px-4 py-2 text-left">Akcija</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderPlayerRows()}
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h5 className="text-zagreb-blue font-semibold mb-2">{event.away_team.name}</h5>
                            <table className="w-full border border-gray-300 rounded text-sm">
                                <thead className="bg-zagreb-light-blue/50 text-zagreb-blue">
                                    <tr>
                                        <th className="px-4 py-2 text-left">#</th>
                                        <th className="px-4 py-2 text-left">Ime</th>
                                        <th className="px-4 py-2 text-left">Broj</th>
                                        <th className="px-4 py-2 text-left">Akcija</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderPlayerRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainWindowDetails;
