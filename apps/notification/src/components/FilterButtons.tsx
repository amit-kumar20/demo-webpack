import React from 'react';
import { NotificationStatus } from '../types';

interface FilterButtonsProps {
  onFilter: (filter: NotificationStatus | 'all') => void;
  currentFilter: NotificationStatus | 'all';
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilter, currentFilter }) => {
  const filters: Array<{ id: NotificationStatus | 'all'; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'read', label: 'Read' }
  ];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilter(filter.id)}
          className={`px-4 py-2 rounded-lg ${
            currentFilter === filter.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
