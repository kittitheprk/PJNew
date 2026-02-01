import type { StatImpact } from '../types/game';
import rawConfig from './game_config.json';

// Define the shape of the raw JSON to ensure type safety
interface RawConfig {
    default_stats: { [key: string]: number };
    choices: {
        [sceneId: string]: {
            [choiceKey: string]: StatImpact;
        };
    };
    sorting_logic: Array<{
        condition: string;
        dorm: string;
        description: string;
    }>;
}

export const gameConfig = rawConfig as RawConfig;

export const getSceneChoices = (sceneId: string): Record<string, StatImpact> | null => {
    return gameConfig.choices[sceneId] || null;
};
