import { GameProvider } from './context/GameContext';
import { StatsProvider } from './context/StatsContext';
import { SceneDisplay } from './components/GameLoop/SceneDisplay';
import { StatFeedback } from './components/PsychEngine/StatFeedback';
import { useState } from 'react';

function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface via-background to-background opacity-50 -z-10" />
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mix-blend-difference">
            STEREA
          </h1>
          <p className="text-secondary tracking-[0.5em] uppercase text-xs md:text-sm">International Institute</p>
          <div className="pt-12">
            <button
              onClick={() => setStarted(true)}
              className="px-8 py-3 bg-white text-black font-bold tracking-widest hover:bg-gray-200 transition-all active:scale-95 duration-200"
            >
              INITIALIZE
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GameProvider>
      <StatsProvider>
        <div className="w-full h-screen bg-background text-primary overflow-hidden font-sans selection:bg-white selection:text-black">
          <StatFeedback />
          <SceneDisplay />
        </div>
      </StatsProvider>
    </GameProvider>
  );
}

export default App;
