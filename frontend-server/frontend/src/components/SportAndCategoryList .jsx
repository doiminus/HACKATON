import React from 'react';

const SportAndCategoryList = ({ items, onSelect }) => {
    const handleClick = (e, item) => {
        const clickedElement = e.target.closest('li');
        
        if (clickedElement) {
            clickedElement.classList.toggle('active');
            const sibling = clickedElement.nextElementSibling;
            if (sibling) {
                sibling.classList.toggle('dropdown-active');
            }
        }

        if (onSelect && item) {
            onSelect(item);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-zagreb-blue">🏆 Sportovi i kategorije</h3>
                <button
                    className="bg-zagreb-blue text-white py-2 px-4 rounded-md hover:bg-zagreb-light-blue transition duration-300 ease-in-out"
                    onClick={() => alert('Add Sport and Category clicked!')}
                >
                    <i className="bi bi-plus"></i> Dodaj
                </button>
            </div>

            <ul className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
                {items.map(item => (
                    <li
                        key={item.id}
                        onClick={(e) => handleClick(e, item)}
                        className="cursor-pointer bg-white border border-gray-300 rounded-md p-4 shadow-sm hover:bg-blue-50 transition duration-150 flex items-center gap-3"
                    >
                        <i className="bi bi-soccer-ball text-zagreb-blue text-xl"></i>

                        <div className="flex flex-col">
                            <h4 className="text-lg font-semibold text-zagreb-blue">{item.sport} - {item.name}</h4>
                            <p className="text-sm text-gray-600">Kategorija: {item.category}</p>
                            <p className="text-sm text-gray-600">Sport: {item.sport}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SportAndCategoryList;
