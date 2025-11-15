
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { JournalIcon, PlusIcon, UserIcon } from './icons/Icons';

interface BottomNavProps {
  onLogClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onLogClick }) => {
    const location = useLocation();
    
    const getLinkClass = (path: string) => {
        return location.pathname === path ? 'text-amber-600' : 'text-stone-500 hover:text-amber-500';
    }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t-2 border-stone-200 shadow-up">
      <nav className="flex justify-around items-center h-16 max-w-2xl mx-auto">
        <Link to="/" className={`flex flex-col items-center transition-colors ${getLinkClass('/')}`}>
          <UserIcon />
          <span className="text-xs">Sheet</span>
        </Link>
        <button
          onClick={onLogClick}
          className="bg-amber-500 text-white rounded-full h-16 w-16 -mt-8 flex items-center justify-center shadow-lg border-4 border-amber-50 transform hover:scale-105 transition-transform"
          aria-label="Log Activity"
        >
          <PlusIcon />
        </button>
        <Link to="/journal" className={`flex flex-col items-center transition-colors ${getLinkClass('/journal')}`}>
          <JournalIcon />
          <span className="text-xs">Journal</span>
        </Link>
      </nav>
    </footer>
  );
};
