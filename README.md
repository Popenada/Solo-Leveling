# ARISE — Solo Leveling Workout App

A gamified workout app inspired by Solo Leveling. Complete quests, earn XP, level up your stats, and rank up from E to S.

---

## Tech Stack

- **Framework** — Expo (React Native)
- **Navigation** — Expo Router
- **Styling** — NativeWind (Tailwind for React Native)
- **State** — Zustand + AsyncStorage (persist)
- **Animations** — React Native Reanimated
- **Gestures** — React Native Gesture Handler
- **Haptics** — Expo Haptics
- **Fonts** — Expo Google Fonts (Orbitron, Rajdhani)
- **Icons** — Lottie React Native

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Install

```bash
git clone https://github.com/Popenada/Solo-Leveling.git
cd Solo-Leveling/solo_leveling
npm install
npx expo start
```

---

## Project Structure

```
arise/
├── app/                        # Expo Router screens
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── dashboard.tsx       # Main hunter status screen
│   │   ├── quests.tsx          # Quest board
│   │   ├── workout.tsx         # Active workout
│   │   ├── stats.tsx           # STR/AGI/VIT/INT breakdown
│   │   └── profile.tsx         # Hunter profile + rank
│   ├── quest/
│   │   └── [id].tsx            # Quest detail screen
│   └── workout/
│       ├── [id].tsx            # Active workout session
│       └── complete.tsx        # Post-workout XP summary
│
├── components/
│   ├── ui/                     # Primitive components
│   │   ├── Text.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── StatBar.tsx
│   │   ├── RankBadge.tsx
│   │   ├── Divider.tsx
│   │   └── CountdownTimer.tsx
│   ├── quest/                  # Quest components
│   │   ├── QuestCard.tsx
│   │   ├── QuestList.tsx
│   │   └── QuestCompleteModal.tsx
│   ├── player/                 # Player components
│   │   ├── HunterCard.tsx
│   │   ├── XPBar.tsx
│   │   └── StatGrid.tsx
│   ├── workout/                # Workout components
│   │   ├── ExerciseRow.tsx
│   │   ├── SetLogger.tsx
│   │   ├── RestTimer.tsx
│   │   └── WorkoutSummary.tsx
│   └── effects/                # Animations + modals
│       ├── LevelUpModal.tsx
│       └── RankUpScreen.tsx
│
├── store/                      # Zustand stores
│   ├── useQuestStore.ts
│   ├── usePlayerStore.ts
│   └── useWorkoutStore.ts
│
├── hooks/                      # Custom hooks
│   ├── useCountdown.ts
│   ├── useLevelUp.ts
│   └── useStreak.ts
│
├── lib/                        # Business logic
│   ├── questGenerator.ts       # Auto-generates quests from profile
│   ├── xp.ts                   # XP + level thresholds
│   └── stats.ts                # Stat allocation logic
│
├── constants/
│   ├── theme.ts                # Colors, fonts, spacing, shadows
│   ├── ranks.ts                # E/D/C/B/A/S thresholds
│   └── quests.ts               # Quest templates
│
└── types/
    ├── quest.ts                # Quest, QuestType, QuestRequirement
    ├── player.ts               # Player, Rank, Stats
    └── workout.ts              # Workout, Exercise, Set
```

---

## Core Concepts

### Ranks

Players start at E-Rank and progress to S-Rank by leveling up.

| Rank | Levels | XP Multiplier |
|------|--------|---------------|
| E    | 1–10   | 1.0x          |
| D    | 11–20  | 1.2x          |
| C    | 21–35  | 1.5x          |
| B    | 36–50  | 1.8x          |
| A    | 51–70  | 2.2x          |
| S    | 71–100 | 3.0x          |

### Stats

Every quest rewards one or more stats on completion.

| Stat | Icon | Trained By          |
|------|------|---------------------|
| STR  |  | Heavy lifting       |
| AGI  | | Cardio, speed work  |
| VIT  | | Endurance, recovery |
| INT  | | Form, technique     |

### Quest Types

| Type    | Resets    | Penalty if missed |
|---------|-----------|-------------------|
| Daily   | Midnight  | Yes               |
| Weekly  | Monday    | No                |
| Special | 5–7 days  | No                |
| Penalty | —         | —                 |
| Boss    | 24 hours  | No (A-rank+)      |

---

## Styling Guide

This project uses **NativeWind** for static styles and **inline styles** for dynamic values.

```tsx
// Static → NativeWind className
className="flex-1 bg-card rounded-xl p-4"

// Dynamic → inline style
style={{ width: `${progress}%`, backgroundColor: color }}

// Shadows/glows → always inline (NativeWind doesn't support these)
style={{ shadowColor: '#6347ff', shadowRadius: 12, shadowOpacity: 0.5 }}
```

---

## State Management

Data flows from Zustand stores down to components. Components never own game state directly.

```
usePlayerStore   →  level, XP, rank, stats, streak
useQuestStore    →  quests, progress, completions
useWorkoutStore  →  active session, sets, reps logged
```

---

## Environment

No API keys required for the base app. If you enable AI quest generation add a `.env`:

```
ANTHROPIC_API_KEY=your_key_here
```

---

## Roadmap

- [ ] Onboarding flow — fitness profile + quest generation
- [ ] Active workout session screen
- [ ] Quest detail screen
- [ ] Level up + rank up animations
- [ ] Push notifications for quest resets
- [ ] AI-generated quests (Claude API)
- [ ] Social — guild system, leaderboards
