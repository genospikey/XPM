
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { LogEntry, StatName } from '../types';
import { STAT_ABBREVIATIONS } from '../constants';

interface StatDetailProps {
  statName: StatName;
  log: LogEntry[];
}

const StatDetail: React.FC<StatDetailProps> = ({ statName, log }) => {
  const relevantLogs = log.filter(entry =>
    entry.xpGained.some(gained => gained.stat === statName)
  );

  return (
    <div>
      <div className="text-center mb-6">
        <Link to="/" className="text-amber-600 hover:underline mb-4 inline-block">&larr; Back to Character Sheet</Link>
        <h2 className="text-4xl font-serif font-bold">{statName}</h2>
        <p className="text-stone-500">Log of all activities contributing to {STAT_ABBREVIATIONS[statName]}.</p>
      </div>

      {relevantLogs.length === 0 ? (
        <p className="text-center text-stone-500 py-8">No activities have contributed to this stat yet.</p>
      ) : (
        <div className="space-y-3">
          {relevantLogs.map(entry => {
            const statXp = entry.xpGained.find(g => g.stat === statName)?.amount || 0;
            return (
              <div key={entry.id} className="bg-white/60 p-3 rounded-lg shadow border border-stone-200 flex justify-between items-center">
                <div>
                  <p className="font-bold">{entry.activityName}</p>
                  <p className="text-sm text-stone-500">{new Date(entry.timestamp).toLocaleDateString()}</p>
                </div>
                <p className="text-lg font-bold text-amber-600">+{statXp} XP</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatDetail;
