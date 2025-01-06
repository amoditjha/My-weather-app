import React, { useState, KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
        
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a city..."
          className="w-full h-12 pl-5 pr-12 rounded-full bg-white/10 
                     backdrop-blur-md border border-white/20
                     text-white placeholder-white/60
                     focus:outline-none focus:ring-2 focus:ring-primary-light/50
                     transition-all duration-300 overflow-hidden"
        />
        <button 
          type="submit"
          className="absolute right-2 p-2 rounded-full
                     bg-primary hover:bg-primary-hover
                     transform transition-all duration-300
                     flex items-center justify-center
                     h-8 w-8 my-2 mr-1"
        >
          <Search className="w-4 h-4 text-white overflow-hidden scaling-content" strokeWidth={2.5} />
        </button>
      </form>
    </div>
  );
};