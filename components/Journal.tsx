
import React from 'react';
import type { LogEntry } from '../types';
import { STAT_ABBREVIATIONS } from '../constants';

interface JournalProps {
  log: LogEntry[];
}

const Journal: React.FC<JournalProps> = ({ log }) => {
  if (log.length === 0) {
    return (
      <div className="text-center text-stone-500 py-10">
        <h2 className="text-2xl font-serif mb-2">Your Journal is Empty</h2>
        <p>Log your first activity to begin your journey.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-serif font-bold text-center mb-6">Journal</h2>
      {log.map(entry => (
        <div key={entry.id} className="bg-white/60 p-4 rounded-lg shadow border border-stone-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg font-serif">{entry.activityName}</h3>
              <p className="text-sm text-stone-500">{new Date(entry.timestamp).toLocaleString()}</p>
            </div>
            <div className="text-right">
                <p className="text-xl font-bold text-amber-600">+{entry.totalXp} XP</p>
                <div className="flex gap-2 justify-end">
                    {entry.xpGained.map(({ stat, amount }) => (
                        <span key={stat} className="text-xs bg-stone-200 text-stone-700 px-1.5 py-0.5 rounded">
                           +{amount} {STAT_ABBREVIATIONS[stat]}
                        </span>
                    ))}
                </div>
            </div>
          </div>
          {entry.notes && <p className="mt-2 text-stone-700 italic">"{entry.notes}"</p>}
          <div className="flex gap-2 mt-2 text-xs text-stone-600">
              {entry.isFirstStep && <span className="font-bold text-amber-700">First Step! (x2 XP)</span>}
              {entry.acousticModifier && <span>🎵 Music</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Journal;
