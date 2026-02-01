import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Stats, StatKey, StatImpact } from '../types/game';

interface StatsContextType {
    stats: Stats;
    updateStats: (impact: StatImpact) => void;
    getDominantStat: () => StatKey;
}

const defaultStats: Stats = {
    stance: 0,
    drive: 0,
    intellect: 0,
    knowledge: 0,
    empathy: 0,
    resilience: 0,
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: ReactNode }) {
    const [stats, setStats] = useState<Stats>(defaultStats);

    const updateStats = (impact: StatImpact) => {
        setStats((prev) => {
            const newStats = { ...prev };
            Object.entries(impact).forEach(([key, value]) => {
                if (key in newStats) {
                    newStats[key as StatKey] += value;
                }
            });
            return newStats;
        });
    };

    const getDominantStat = (): StatKey => {
        let maxStat: StatKey = "resilience";
        let maxValue = -Infinity;

        (Object.keys(stats) as StatKey[]).forEach((key) => {
            if (stats[key] > maxValue) {
                maxValue = stats[key];
                maxStat = key;
            }
        });

        return maxStat;
    };

    return (
        <StatsContext.Provider value={{ stats, updateStats, getDominantStat }}>
            {children}
        </StatsContext.Provider>
    );
}

export function useStats() {
    const context = useContext(StatsContext);
    if (context === undefined) {
        throw new Error('useStats must be used within a StatsProvider');
    }
    return context;
}
