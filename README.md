# STEREA International Institute (PJNew)

> "The wind here doesn't blow to cool you down, it blows to remind you how small you are."

## Overview
This project is an interactive narrative game set in **STEREA International Institute**, a brutalist and mysterious academic institution. The system focuses on tracking player psychology and decision-making through a sophisticated "**Stats Matrix**" rather than traditional RPG stats.

## Story: The Weight of Stone
The story begins with the **Prologue**, where the player arrives at the institute. Every small action—from how you walk through the gate to how you handle a collision with another student—is measured by the system.

**Current Scene:**
- **SCN_001_ARRIVAL**: The Gate
- **SCN_002_FRICTION**: The Hallway/Corridor
- **SCN_003_SORTING**: The Auditorium

## Mechanical Systems

### 1. The Stats Matrix
The game tracks 6 core psychological parameters:
- **Stance**: Courage / Willingness to confront.
- **Drive**: Initiative / Impulse.
- **Intellect**: Analytical thinking / Logic.
- **Knowledge**: Lore interest / Information gathering.
- **Empathy**: Understanding others / Diplomacy.
- **Resilience**: Endurance / Emotional stability.

### 2. The Sorting Logic
At the end of the prologue, players are sorted into one of four dormitories based on their dominant stats:
- **AKRON** (Hall of Competition): High Stance & Drive.
- **DESMOS** (Hall of Connection): High Empathy.
- **SKIA** (Hall of Shadows): High Intellect.
- **ANTOCHI** (Hall of Endurance): High Resilience / Balanced.

## Project Structure

```
PJNew/
├── config/
│   └── stat_config.json    # Game logic definitions (Choice effects & Sorting rules)
├── database/
│   └── schema.sql          # SQL schema for the 'player_stats' table
├── PROLOGUE_...md          # Source script and game design document
└── README.md               # Project documentation
```

## Setup & Configuration
- **Database**: Use `database/schema.sql` to initialize the `player_stats` table in your SQL database.
- **Logic**: Load `config/stat_config.json` into your game engine to handle choice consequences and sorting logic dynamically.
