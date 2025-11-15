
import React, { useState, useMemo } from 'react';
import type { Activity, LogEntry } from '../types';
import { SocialModifier } from '../types';
import { ACTIVITIES } from '../constants';

interface LogActivityModalProps {
  onClose: () => void;
  onLog: (
    activity: Activity,
    duration: number,
    notes: string,
    socialModifier: SocialModifier,
    acousticModifier: boolean
  ) => void;
  playerLog: LogEntry[];
}

const LogActivityModal: React.FC<LogActivityModalProps> = ({ onClose, onLog, playerLog }) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState('');
  const [socialModifier, setSocialModifier] = useState<SocialModifier>(SocialModifier.Solo);
  const [acousticModifier, setAcousticModifier] = useState(false);

  const filteredActivities = useMemo(() => {
    if (!searchTerm) return ACTIVITIES;
    return ACTIVITIES.filter(act => act.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedActivity && duration > 0) {
      onLog(selectedActivity, duration, notes, socialModifier, acousticModifier);
      onClose();
    }
  };
  
  const loggedActivityIds = new Set(playerLog.map(entry => entry.activityId));

  if (!selectedActivity) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-amber-50 rounded-lg shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-stone-200">
            <h2 className="text-2xl font-serif font-bold text-center">Select Activity</h2>
            <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mt-2 p-2 border border-stone-300 rounded-md bg-white"
            />
            </div>
            <ul className="overflow-y-auto p-2">
            {filteredActivities.map(act => (
                <li key={act.id}>
                <button onClick={() => setSelectedActivity(act)} className="w-full text-left p-3 hover:bg-amber-100 rounded-md transition-colors">
                    <p className="font-bold">{act.name} {!loggedActivityIds.has(act.id) && <span className="text-xs text-amber-600 font-normal">(First Step!)</span>}</p>
                    <p className="text-sm text-stone-600">{act.description}</p>
                </button>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-amber-50 rounded-lg shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold">{selectedActivity.name}</h2>
            <button type="button" onClick={() => setSelectedActivity(null)} className="text-sm text-amber-600 hover:underline">Change activity</button>
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-stone-700">Duration (minutes)</label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value, 10))}
              className="mt-1 block w-full p-2 border border-stone-300 rounded-md shadow-sm bg-white"
              min="1"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-stone-700">Notes (optional)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full p-2 border border-stone-300 rounded-md shadow-sm bg-white"
              rows={2}
            />
          </div>

          <div>
            <span className="block text-sm font-medium text-stone-700">Context</span>
            <div className="mt-2 grid grid-cols-2 gap-2">
                {(Object.keys(SocialModifier) as Array<keyof typeof SocialModifier>).filter(k => isNaN(Number(k))).map((key) =>(
                    <button type="button" key={key} onClick={() => setSocialModifier(SocialModifier[key])} className={`p-2 rounded-md text-sm border-2 ${socialModifier === SocialModifier[key] ? 'bg-amber-500 text-white border-amber-500' : 'bg-white hover:bg-amber-100 border-stone-200'}`}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                    </button>
                ))}
            </div>
            <div className="mt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={acousticModifier} onChange={e => setAcousticModifier(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"/>
                    <span className="text-sm text-stone-700">Music Playing? (Small XP Bonus)</span>
                </label>
            </div>
          </div>


          <div className="flex justify-between items-center pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-stone-700 hover:bg-stone-200 transition-colors">Cancel</button>
            <button type="submit" className="px-8 py-3 bg-amber-600 text-white font-bold rounded-lg shadow-md hover:bg-amber-700 transition-all transform hover:scale-105">
              Log It
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogActivityModal;
