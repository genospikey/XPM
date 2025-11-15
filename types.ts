
export type StatName = 'Strength' | 'Dexterity' | 'Constitution' | 'Intelligence' | 'Wisdom' | 'Charisma';

export interface Stat {
  score: number;
  xp: number;
  xpToNextLevel: number;
}

export interface LogEntry {
  id: string;
  activityId: string;
  activityName: string;
  timestamp: number;
  duration: number; // in minutes
  xpGained: { stat: StatName, amount: number }[];
  totalXp: number;
  notes: string;
  socialModifier: number;
  acousticModifier: boolean;
  isFirstStep: boolean;
}

export interface PlayerState {
  name: string;
  level: number;
  totalXp: number;
  xpToNextLevel: number;
  stats: Record<StatName, Stat>;
  log: LogEntry[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  baseXpPerMinute: number;
  statVector: { [key in StatName]?: number };
}

export enum SocialModifier {
  Solo = 1.0,
  Pair = 1.5,
  SmallGroup = 1.75,
  LargeGroup = 2.0,
}
