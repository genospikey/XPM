
import { useState, useEffect, useCallback } from 'react';
import type { PlayerState, Activity, StatName, LogEntry } from '../types';
import { SocialModifier } from '../types';
import { STAT_NAMES } from '../constants';

const LOCAL_STORAGE_KEY = 'project_chimera_data';

const getInitialStatValue = () => ({ score: 10, xp: 0, xpToNextLevel: 100 });

const getInitialState = (): PlayerState => ({
  name: '',
  level: 1,
  totalXp: 0,
  xpToNextLevel: 1000,
  stats: {
    Strength: getInitialStatValue(),
    Dexterity: getInitialStatValue(),
    Constitution: getInitialStatValue(),
    Intelligence: getInitialStatValue(),
    Wisdom: getInitialStatValue(),
    Charisma: getInitialStatValue(),
  },
  log: [],
});

// XP formula: XP = Base * (level^1.1)
const calculateXpToNextLevel = (level: number) => Math.floor(1000 * Math.pow(level, 1.5));
const calculateStatXpToNextLevel = (score: number) => Math.floor(100 * Math.pow(score - 9, 1.2));


export const usePlayerData = () => {
  const [playerData, setPlayerData] = useState<PlayerState>(() => {
    try {
      const savedData = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : getInitialState();
    } catch (error) {
      console.error("Error loading from local storage", error);
      return getInitialState();
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(playerData));
    } catch (error) {
      console.error("Error saving to local storage", error);
    }
  }, [playerData]);
  
  const setPlayerName = useCallback((name: string) => {
     setPlayerData(prevData => ({ ...prevData, name }));
  }, []);

  const logActivity = useCallback((
    activity: Activity,
    duration: number,
    notes: string,
    socialModifier: SocialModifier,
    acousticModifier: boolean
  ) => {
    setPlayerData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData)) as PlayerState;

      const loggedActivityIds = new Set(newData.log.map(entry => entry.activityId));
      const isFirstStep = !loggedActivityIds.has(activity.id);

      // XP_Gained = (Base_Value) * (Stat_Vector) * (Social_Modifier) * (Acoustic_Modifier) * (LVC_Modifier)
      const baseValue = activity.baseXpPerMinute * duration;
      const acousticBonus = acousticModifier ? 1.1 : 1.0;
      const lvcBonus = isFirstStep ? 2.0 : 1.0;
      
      const totalXpGainedForActivity = baseValue * socialModifier * acousticBonus * lvcBonus;
      
      const xpGainedPerStat: { stat: StatName, amount: number }[] = [];

      for (const stat of STAT_NAMES) {
        if (activity.statVector[stat]) {
          const xpAmount = Math.round(totalXpGainedForActivity * (activity.statVector[stat] || 0));
          if (xpAmount > 0) {
              xpGainedPerStat.push({ stat, amount: xpAmount });
              newData.stats[stat].xp += xpAmount;
          }
        }
      }

      newData.totalXp += Math.round(totalXpGainedForActivity);

      // Check for Stat level ups
      for (const stat of STAT_NAMES) {
        let statInfo = newData.stats[stat];
        while (statInfo.xp >= statInfo.xpToNextLevel) {
          statInfo.score += 1;
          statInfo.xp -= statInfo.xpToNextLevel;
          statInfo.xpToNextLevel = calculateStatXpToNextLevel(statInfo.score);
        }
      }

      // Check for Player level up
      while (newData.totalXp >= newData.xpToNextLevel) {
          newData.level += 1;
          newData.totalXp -= newData.xpToNextLevel;
          newData.xpToNextLevel = calculateXpToNextLevel(newData.level);
      }

      const newLogEntry: LogEntry = {
        id: new Date().toISOString() + Math.random(),
        activityId: activity.id,
        activityName: activity.name,
        timestamp: Date.now(),
        duration,
        xpGained: xpGainedPerStat,
        totalXp: Math.round(totalXpGainedForActivity),
        notes,
        socialModifier,
        acousticModifier,
        isFirstStep,
      };

      newData.log.unshift(newLogEntry);
      
      return newData;
    });
  }, []);

  return { playerData, logActivity, setPlayerName };
};
