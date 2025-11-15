
import React from 'react';
import type { PlayerState } from '../types';
import { StatBox } from './StatBox';
import { STAT_NAMES } from '../constants';

interface CharacterSheetProps {
  stats: PlayerState['stats'];
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {STAT_NAMES.map((statName) => (
        <StatBox key={statName} name={statName} stat={stats[statName]} />
      ))}
    </div>
  );
};

export default CharacterSheet;
