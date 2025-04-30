import React from 'react';

const TeamList = ({ teams, onSelectTeam }) => {

    const handleClick = (e, team) => {
        const clickedElement = e.target.closest('li');
        if (clickedElement) {
            clickedElement.classList.toggle('active');
            const sibling = clickedElement.nextElementSibling;
            if (sibling) sibling.classList.toggle('dropdown-active');
        }

        if (onSelectTeam && team) {
            onSelectTeam(team);
        }
    };

    console.log("Teams data in TeamList:", teams); 
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-zagreb-blue">Timovi</h3>
                <button
                    className="bg-zagreb-blue text-white py-2 px-4 rounded-md hover:bg-zagreb-light-blue transition duration-300 ease-in-out"
                    onClick={() => alert('Dodaj Tim clicked!')}
                >
                    <i className="bi bi-plus"></i> Dodaj
                </button>
            </div>

            <ul className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
                {Array.isArray(teams) && teams.length > 0 ? (
                    teams.map(team => (
                        <li
                            key={team.id}
                            onClick={(e) => handleClick(e, team)}
                            className="cursor-pointer bg-white border border-gray-300 rounded-md p-4 shadow-sm hover:bg-blue-50 transition duration-150 flex items-center gap-3"
                        >
                            <div className="flex flex-col">
                                <h4 className="text-lg font-semibold text-zagreb-blue">{team.name}</h4>
                                <p className="text-sm text-gray-600">Kategorija: {team.sport_and_category?.category}</p>
                                <p className="text-sm text-gray-600">Sport: {team.sport_and_category?.sport}</p>
                                <p className="text-sm text-gray-600">Članovi: {team.members_count}</p>
                                {team.total_points && <p className="text-sm text-gray-600">Ukupni bodovi: {team.total_points}</p>}
                            </div>
                        </li>
                    ))
                ) : (
                    <li>Nema dostupnih timova</li>
                )}
            </ul>
        </div>
    );
};

export default TeamList;
