
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { usePlayerData } from './hooks/usePlayerData';
import CharacterSheet from './components/CharacterSheet';
import Journal from './components/Journal';
import StatDetail from './components/StatDetail';
import LogActivityModal from './components/LogActivityModal';
import { BottomNav } from './components/BottomNav';
import { STAT_NAMES } from './constants';
import type { StatName } from './types';

export default function App() {
  const { playerData, logActivity, setPlayerName } = usePlayerData();
  const [isLogging, setIsLogging] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(playerData.name);

  const handleNameSave = () => {
    setPlayerName(newName);
    setEditingName(false);
  };
  
  if (!playerData.name && !editingName) {
      setEditingName(true);
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-amber-50 text-stone-900 flex flex-col">
        <main className="flex-grow container mx-auto p-4 pb-24 max-w-2xl">
           <header className="text-center mb-6 pt-4">
             {editingName ? (
                <div className="flex justify-center items-center gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-white/50 text-3xl font-bold font-serif text-center p-2 rounded-lg border-2 border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Enter Your Name"
                  />
                  <button onClick={handleNameSave} className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">Save</button>
                </div>
              ) : (
                <h1 className="text-3xl font-bold font-serif cursor-pointer" onClick={() => setEditingName(true)}>
                  {playerData.name}
                </h1>
              )}
            <p className="text-stone-600">Level {playerData.level}</p>
            <div className="w-full bg-stone-200 rounded-full h-4 mt-2 border border-stone-300">
              <div
                className="bg-amber-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(playerData.totalXp / playerData.xpToNextLevel) * 100}%` }}
              ></div>
            </div>
             <p className="text-xs text-stone-500 mt-1">{playerData.totalXp} / {playerData.xpToNextLevel} XP</p>
          </header>

          <Routes>
            <Route path="/" element={<CharacterSheet stats={playerData.stats} />} />
            <Route path="/journal" element={<Journal log={playerData.log} />} />
            {STAT_NAMES.map(statName => (
                 <Route 
                    key={statName}
                    path={`/stats/${statName}`} 
                    element={<StatDetail statName={statName as StatName} log={playerData.log} />} 
                />
            ))}
          </Routes>
        </main>

        <BottomNav onLogClick={() => setIsLogging(true)} />

        {isLogging && (
          <LogActivityModal
            onClose={() => setIsLogging(false)}
            onLog={logActivity}
            playerLog={playerData.log}
          />
        )}
      </div>
    </HashRouter>
  );
}
