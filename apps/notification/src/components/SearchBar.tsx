import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white rounded-[30px] h-[40px] w-[280px]"
      role="search"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search notifications..."
        className="flex-1 border-none outline-none text-sm bg-transparent text-[#333] pl-[15px] pr-[10px]"
      />
      <button
        type="submit"
        className="bg-[#4b286d] border-none rounded-full w-[34px] h-[34px] flex items-center justify-center cursor-pointer mr-1"
      >
        <FiSearch className="text-white" size={16} />
      </button>
    </form>
  );
};

export default SearchBar;
