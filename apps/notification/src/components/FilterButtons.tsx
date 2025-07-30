import React from 'react';
import { NotificationStatus } from '../types';

interface FilterButtonsProps {
  onFilter: (filter: NotificationStatus | 'all') => void;
  currentFilter: NotificationStatus | 'all';
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilter, currentFilter }) => {
  const filters: (NotificationStatus | 'all')[] = ['all', 'unread', 'read'];

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilter(filter)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            currentFilter === filter
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter === 'all' ? 'All' : filter === 'unread' ? 'Unread' : 'Read'}
          {filter !== 'all' && (
            <span className="ml-2 px-2 py-0.5 text-sm rounded-full bg-opacity-20 inline-flex items-center justify-center" 
                  style={{ 
                    backgroundColor: filter === 'unread' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                    color: filter === 'unread' ? '#ef4444' : '#22c55e'
                  }}>
              {filter === 'unread' ? '10' : '8'}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
