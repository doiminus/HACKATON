import React from 'react';

const dummyOrganizations = [
  { id: 1, name: 'Zagrebački Sportski Savez', icon: 'bi-building' },
  { id: 2, name: 'HAŠK Mladost', icon: 'bi-trophy' },
  { id: 3, name: 'Sportska Zajednica Grada Zagreba', icon: 'bi-people' },
  { id: 4, name: 'AK Dinamo-Zrinjevac', icon: 'bi-flag' },
  { id: 5, name: 'Zagrebački Atletski Savez', icon: 'bi-award' },
  { id: 6, name: 'Zagrebački Sportski Savez', icon: 'bi-building' },
  { id: 7, name: 'HAŠK Mladost', icon: 'bi-trophy' },
  { id: 8, name: 'Sportska Zajednica Grada Zagreba', icon: 'bi-people' },
  { id: 9, name: 'AK Dinamo-Zrinjevac', icon: 'bi-flag' },
  { id: 10, name: 'Zagrebački Atletski Savez', icon: 'bi-award' },
];

const OrganizationsList = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-zagreb-blue">🏢 Organizacije</h3>
        <button
          className="bg-zagreb-blue text-white py-2 px-4 rounded-md hover:bg-zagreb-light-blue transition duration-300 ease-in-out"
          onClick={() => alert('Dodaj Organizaciju clicked!')}
        >
            <i className="bi bi-plus"></i>
          Dodaj
        </button>
      </div>

      
      <ul className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
        {dummyOrganizations.map((org) => (
          <li key={org.id} className="bg-white p-4 rounded shadow flex items-center gap-3">
            <i className={`bi ${org.icon} text-zagreb-blue text-xl`}></i>
            <span className="text-gray-800 font-medium">{org.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationsList;
