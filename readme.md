# Game Design Document: Project Chimera

## Subtitle: A System for a Resilient Self

Version: 2.0 (The Transference Model)<br>
Date: November 15, 2025<br>
Status: Ready for Production

## 1. Core Vision & Philosophy

### 1.1 The Hook
A self-improvement tool that re-imagines your life as a Dungeons & Dragons character sheet. It's a private, powerful, and playful system for tracking your real-world activities and translating them into tangible "identity gains" across six core stats. It's not just a tracker; it's a new lens for seeing your own growth.

### 1.2. Core Experience
The player feels sovereign, acknowledged, and enlightened. 

The app provides a concrete, satisfying, and joyful record of growth in a world of abstract anxiety. Its core magic is revealing the hidden connections between the different parts of your life, demonstrating how an action in one domain (like the Physical) directly builds your capacity in another (like the Social).

### 1.3. Design Pillars (The Inviolable Rules)

Foster Growth, Don't Demand It: The system is a tool, not a warden. It records what you did; it does not nag you about what you didn't do. No negative reinforcement.

Trust the Player: The user is the sole arbiter of their truth. The game's deeper mechanics rely on honest self-reporting, making the act of playing an exercise in integrity.

Incentivize Risk & Connection: The system must mechanically and socially reward trying new things (The First Step) and, above all, doing things with other people (The Social Multiplier).

Data Sovereignty: The user owns their data. There is no central server. The app is a lens; the user's life is the storage medium.

Ludic Joy (Build a Sanctuary, Not a Skinner Box): The interface and feedback must be tactile, satisfying, and slightly whimsical. It should feel like a game, not a spreadsheet.

## 2. Core Gameplay Loop

### 2.1. The Primary Loop (The Daily Rep)
Live: The user performs a real-world activity.

Log: The user opens the app, taps the (+) button, logs the activity, and notes the context (e.g., "music was playing," "with friends").

Reward: The app calculates and awards XP with a satisfying visual and auditory cue ("+150 STR").

Allocate: The XP flows into the relevant Stat Box. If a threshold is crossed, a Level Up event occurs.

### 2.2. The Secondary Loop (The Character Arc)

Specialize: The user watches their six core stats grow, reflecting the reality of their life's focus.
Transference: The user taps on a stat to see the "Source Log," discovering how seemingly unrelated activities (like going to the gym and leading a meeting) both contribute to their "Strength."

Achieve: The user unlocks cosmetic "Titles" and "Mascot" rewards from the Local Victory Circuit, celebrating their commitment and building a personal history of victories.

## 3. Core Systems & Mechanics

### 3.1. The Stat System (The Transference Model)
The six stats are unified attributes. Action in one domain builds the stat across all domains.
|Stat|Domain Manifestations (Physical / Mental / Social)|
|:-|:-|
|Strength|Assertive Action / Decisiveness / Social Authority|
|Dexterity|Coordination / Problem-Solving / Social Finesse|
|Constitution|Durability / Persistence / Social Resilience|
|Intelligence|Body Optimization / Systemization / Social Strategy|
|Wisdom|Awareness / Long-Term Judgment / Empathy|
|Charisma|Expressive Presence / Persuasion / Group Magnetism|

### 3.2. The XP & Leveling Algorithm

The XP Formula:

    XP_Gained = (Base_Value) * (Stat_Vector) * (Social_Modifier) * (Acoustic_Modifier) * (LVC_Modifier)

Base_Value: Derived from Time_Cost + Material_Cost (Proof of Work).

Stat_Vector: A simple vector defining which stat(s) the activity builds (e.g., "Rock Climbing" = {STR: 0.6, DEX: 0.4}).

Social_Modifier: The most powerful multiplier. Solo = x1.0, Pair = x1.5, Small Group = x1.75, Large Group = x2.0.

Acoustic_Modifier: A small bonus (e.g., x1.1) if music was used to modulate the environment.

LVC_Modifier: A large bonus (e.g., x2.0) for a "First Step" activity.

Leveling Curve: Standard exponential RPG curve. Levels become progressively harder to achieve, making high levels a true mark of dedication.

### 3.3. The Local Victory Circuit (LVC)
A system of purely symbolic, celebratory rewards for key milestones.

The "First Step" Bonus: A massive XP multiplier for the first time any activity is logged.

The "Streak" Reward: Visual flair (e.g., a flame icon) for logging the same activity 3+ days in a row.

The "Mascot" Event: At set milestones (e.g., every 10th gym trip), a whimsical, stat-appropriate character (e.g., a "Strength Goblin") appears with a celebratory animation.

## 4. User Interface (UI) & User Experience (UX)

### 4.1. Visual Aesthetic

Theme: "Digital Vellum." Clean, high-contrast, legible, but with the tactile warmth and satisfying feel of a paper character sheet.

### 4.2. Screen Architecture (Solo MVP)

#### Screen A: The Character Sheet (Home)

Top: Character Name, Total Level, Global XP Bar.

Center (The Grid): Six large, prominent, clickable Stat Boxes.

Inside the Box: Stat Name (STR), Current Score (14), Modifier (+2).

Bottom (The Nav Bar):
[Journal] (Book Icon)
[LOG ACTIVITY] (Large, Central "+" Icon)
[Settings] (Gear Icon)

#### Screen B: Log Activity

A clean, searchable catalog of activities.

Simple inputs for duration, notes.

Checkboxes for "With a Group?" and "Music Playing?"

A large, satisfying "Log It" button that triggers the reward animation.

#### Screen C: The Journal (The Record & The Insight)

A chronological feed of past logs ("On this day, you gained 400 XP in Charisma.").

A gallery of all unlocked Titles and LVC rewards.

The Stat Detail View: Tapping a stat box on the home screen brings you here. It shows the total XP for that stat, broken down by its Physical, Mental, and Social sources, revealing the Transference effect.

## 5. Technical Architecture

### 5.1. Stack
Type: Progressive Web App (PWA).
Core: Static HTML/CSS/JS. Lightweight framework (e.g., Svelte) for state management.
Hosting: Static hosting (GitHub Pages, Netlify). Goal: Zero server maintenance.

### 5.2. Data Management
Primary Storage: localStorage / IndexedDB in the user's browser. The data lives on the device.
Backup/Sync (v1.1): OAuth 2.0 with Google Drive API. The app will have permission to read/write a single, user-owned save file (chimera_save.json) in the user's own cloud storage. No central database.

## 6. Roadmap

Phase 1: The Sovereign Journey (MVP)

Goal: A functional, offline-capable PWA for a single user.
Features: The six unified stats, core activity logging, solo-focused LVCs, local storage.
Success Metric: It is a genuinely useful and joyful tool for one person (you).

Phase 2: The Resilient Self (v1.1)

Goal: Data permanence and portability.
Features: Google Drive integration for secure, user-owned data backup and sync.

Phase 3: The Fellowship (v2.0 - The Future)

Goal: To incentivize and reward collective action.
Features: A "Party" system. Activation of the Social XP Multiplier. A simple, trust-based system for confirming group activities.