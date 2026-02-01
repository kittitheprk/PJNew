export type StatKey = "stance" | "drive" | "intellect" | "knowledge" | "empathy" | "resilience";

export interface Stats {
    stance: number;
    drive: number;
    intellect: number;
    knowledge: number;
    empathy: number;
    resilience: number;
}

export interface StatImpact {
    [key: string]: number; // e.g., "stance": 1, "drive": -1
}

export interface Choice {
    id: string;
    text: string;
    impact: StatImpact;
    nextSceneId: string; // or null for end of act
    feedback?: string; // Short text feedback shown after selection
}

export interface Scene {
    id: string;
    narrative: string[]; // Array of strings for multi-step text typing
    choices?: Choice[];
    bgm?: string;
    background?: string; // Path to background image/style
}

export interface GameState {
    currentSceneId: string;
    history: string[]; // List of scene IDs visited
    isPrologueComplete: boolean;
    assignedDorm: "AKRON" | "DESMOS" | "SKIA" | "ANTOCHI" | null;
}
