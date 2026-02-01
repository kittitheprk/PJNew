import { createContext, useContext, useState, type ReactNode } from 'react';
import type { GameState } from '../types/game';

interface GameContextType {
    gameState: GameState;
    setScene: (sceneId: string) => void;
    completePrologue: (dorm: GameState['assignedDorm']) => void;
}

const initialState: GameState = {
    currentSceneId: 'SCN_001_ARRIVAL',
    history: [],
    isPrologueComplete: false,
    assignedDorm: null,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
    const [gameState, setGameState] = useState<GameState>(initialState);

    const setScene = (sceneId: string) => {
        setGameState((prev) => ({
            ...prev,
            currentSceneId: sceneId,
            history: [...prev.history, prev.currentSceneId],
        }));
    };

    const completePrologue = (dorm: GameState['assignedDorm']) => {
        setGameState((prev) => ({
            ...prev,
            isPrologueComplete: true,
            assignedDorm: dorm,
        }));
    };

    return (
        <GameContext.Provider value={{ gameState, setScene, completePrologue }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
