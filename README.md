# STEREA International Institute (PJNew)

> "The wind here doesn't blow to cool you down, it blows to remind you how small you are."

## Overview
This project is an interactive narrative game set in **STEREA International Institute**, a brutalist and mysterious academic institution. The system focuses on tracking player psychology and decision-making through a sophisticated "**Stats Matrix**" rather than traditional RPG stats.

The client is built with **React + Vite** and features a "Rich Aesthetics" Brutalist design with animations and real-time data visualization.

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

### 3. Psych Engine & Visualization
- **Radar Chart**: Real-time D3/SVG visualization of your personality shape.
- **Feedback System**: Interactive toasts and cues when stats change.

## Project Structure

```
PJNew/
├── client/                 # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/     # Game Components (RadarChart, SceneDisplay)
│   │   ├── context/        # Logic State (StatsContext, GameContext)
│   │   ├── data/           # Game Data (scenes.ts, game_config.json)
│   │   └── types/          # TypeScript Definitions
│   └── tailwind.config.js  # Styling & Theming
├── config/
│   └── stat_config.json    # Original Game Logic Definitions
├── PROLOGUE_...md          # Source Script
└── README.md               # Project Documentation
```

## Setup & Running
1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the game at `http://localhost:5173`.

## Architecture Layers
- **Layer 1 (Input)**: Player Decisions via `DecisionPoint.tsx`.
- **Layer 2 (Processing)**: `StatsContext` updates the hidden 6-variable matrix.
- **Layer 3 (Feedback)**: `RadarChart` and `StatFeedback` provide immediate visual responses.
- **Layer 4 (Progression)**: `SceneDisplay` handles linear flow and logic gates (Sorting).
- **Layer 5 (Results)**: Final analysis screen showing your assigned Dorm.
