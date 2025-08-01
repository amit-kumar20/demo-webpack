import React from 'react';
import { BsCheckCircle, BsEnvelope } from 'react-icons/bs';
import { FaInbox } from 'react-icons/fa';

// Exported type so it can be used externally
export type FilterType = 'all' | 'unread' | 'read';

interface FilterButtonsProps {
  onFilter: (filter: FilterType) => void;
  currentFilter: FilterType;
  unreadCount: number;
  readCount: number;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  onFilter,
  currentFilter,
  unreadCount,
  readCount,
}) => {
  const filters: FilterType[] = ['all', 'unread', 'read'];

  const getIcon = (filter: FilterType) => {
    switch (filter) {
      case 'unread':
        return <BsEnvelope className="text-[#4b286d]" />;
      case 'read':
        return <BsCheckCircle className="text-[#4b286d]" />;
      default:
        return <FaInbox className="text-[#4b286d]" />;
    }
  };

  const getCount = (filter: FilterType) => {
    switch (filter) {
      case 'unread':
        return unreadCount;
      case 'read':
        return readCount;
      default:
        return unreadCount + readCount;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilter(filter)}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border shadow-sm
            ${
              currentFilter === filter
                ? 'bg-[#4b286d] text-white border-[#4b286d]'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
        >
          {getIcon(filter)}
          <span className="capitalize">{filter}</span>
          <span
            className={`ml-auto text-[10px] sm:text-xs font-semibold rounded-full px-1.5 sm:px-2 py-0.5
              ${
                filter === 'unread'
                  ? 'bg-purple-100 text-[#4b286d]'
                  : filter === 'read'
                  ? 'bg-purple-100 text-[#4b286d]'
                  : 'bg-purple-100 text-[#4b286d]'
              }`}
          >
            {getCount(filter)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
