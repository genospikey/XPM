
import type { Activity, StatName } from './types';

export const STAT_NAMES: StatName[] = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];

export const STAT_ABBREVIATIONS: Record<StatName, string> = {
  Strength: 'STR',
  Dexterity: 'DEX',
  Constitution: 'CON',
  Intelligence: 'INT',
  Wisdom: 'WIS',
  Charisma: 'CHA',
};

export const ACTIVITIES: Activity[] = [
  // Physical
  { id: 'act_01', name: 'Weightlifting', description: 'Lifting heavy things.', baseXpPerMinute: 3, statVector: { Strength: 0.8, Constitution: 0.2 } },
  { id: 'act_02', name: 'Running / Cardio', description: 'Endurance training.', baseXpPerMinute: 2, statVector: { Constitution: 0.7, Dexterity: 0.3 } },
  { id: 'act_03', name: 'Yoga / Stretching', description: 'Flexibility and balance.', baseXpPerMinute: 1.5, statVector: { Dexterity: 0.6, Wisdom: 0.4 } },
  { id: 'act_04', name: 'Rock Climbing', description: 'Scaling walls.', baseXpPerMinute: 4, statVector: { Strength: 0.6, Dexterity: 0.4 } },
  { id: 'act_05', name: 'Team Sports', description: 'Playing a sport with others.', baseXpPerMinute: 3, statVector: { Dexterity: 0.4, Constitution: 0.3, Charisma: 0.3 } },
  // Mental
  { id: 'act_06', name: 'Studying / Learning', description: 'Acquiring new knowledge.', baseXpPerMinute: 2, statVector: { Intelligence: 1.0 } },
  { id: 'act_07', name: 'Programming / Coding', description: 'Building systems with logic.', baseXpPerMinute: 2.5, statVector: { Intelligence: 0.8, Wisdom: 0.2 } },
  { id: 'act_08', name: 'Meditation', description: 'Mindfulness and focus.', baseXpPerMinute: 1, statVector: { Wisdom: 0.9, Constitution: 0.1 } },
  { id: 'act_09', name: 'Strategic Planning', description: 'Organizing future actions.', baseXpPerMinute: 2, statVector: { Intelligence: 0.6, Wisdom: 0.4 } },
  { id: 'act_10', name: 'Reading (Non-Fiction)', description: 'Absorbing information.', baseXpPerMinute: 1.5, statVector: { Intelligence: 0.7, Wisdom: 0.3 } },
  // Social
  { id: 'act_11', name: 'Public Speaking', description: 'Presenting to a group.', baseXpPerMinute: 5, statVector: { Charisma: 0.7, Strength: 0.3 } },
  { id: 'act_12', name: 'Networking Event', description: 'Meeting new people.', baseXpPerMinute: 2, statVector: { Charisma: 0.8, Intelligence: 0.2 } },
  { id: 'act_13', name: 'Deep Conversation', description: 'Engaging with someone meaningfully.', baseXpPerMinute: 2.5, statVector: { Wisdom: 0.5, Charisma: 0.5 } },
  { id: 'act_14', name: 'Leading a Meeting', description: 'Guiding a group discussion.', baseXpPerMinute: 3, statVector: { Strength: 0.5, Charisma: 0.5 } },
  { id: 'act_15', name: 'Date Night', description: 'Focused time with a partner.', baseXpPerMinute: 2, statVector: { Charisma: 0.6, Wisdom: 0.4 } },
];
