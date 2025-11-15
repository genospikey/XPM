
import React from 'react';
import { Link } from 'react-router-dom';
import type { Stat, StatName } from '../types';
import { STAT_ABBREVIATIONS } from '../constants';

interface StatBoxProps {
  name: StatName;
  stat: Stat;
}

export const StatBox: React.FC<StatBoxProps> = ({ name, stat }) => {
  const modifier = Math.floor((stat.score - 10) / 2);
  const modifierSign = modifier >= 0 ? '+' : '';
  const progress = (stat.xp / stat.xpToNextLevel) * 100;

  return (
    <Link to={`/stats/${name}`} className="block bg-white/50 p-4 rounded-lg shadow-md border-2 border-stone-200 hover:border-amber-400 hover:shadow-lg transition-all transform hover:-translate-y-1">
      <div className="flex justify-between items-baseline">
        <h3 className="font-bold font-serif text-lg text-stone-700">{STAT_ABBREVIATIONS[name]}</h3>
        <span className="text-sm text-stone-500">{name}</span>
      </div>
      <div className="text-center my-2">
        <p className="text-5xl font-bold">{stat.score}</p>
        <p className="text-xl text-stone-600 font-serif">{modifierSign}{modifier}</p>
      </div>
      <div className="w-full bg-stone-200 rounded-full h-2.5">
        <div 
          className="bg-amber-500 h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-center text-stone-500 mt-1">{stat.xp} / {stat.xpToNextLevel}</p>
    </Link>
  );
};
