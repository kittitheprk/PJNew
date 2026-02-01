import type { Scene } from '../types/game';

// Mapping the Prologue Script to Scene Objects
export const scenes: Record<string, Scene> = {
    "SCN_001_ARRIVAL": {
        id: "SCN_001_ARRIVAL",
        narrative: [
            "The wind here doesn't blow to cool you down, it blows to remind you how small you are.",
            "Ahead lies 'STEREA International Institute'. No welcome signs. No seniors handing out flyers. Just silence.",
            "The footsteps of hundreds of students passing you by... without a single one looking at your face.",
            "You stand at the boundary. The first feeling isn't excitement, it's weight.",
            "How will you enter?"
        ],
        // Choices are linked via IDs in stat_config.json, handled by the engine to merge data
        choices: [
            { id: "choice_A", text: "Walk straight through the crowd. Don't look away.", impact: {}, nextSceneId: "SCN_002_FRICTION" },
            { id: "choice_B", text: "Observe from the corner. Watch the flow.", impact: {}, nextSceneId: "SCN_002_FRICTION" },
            { id: "choice_C", text: "Follow the group quietly. Blend in.", impact: {}, nextSceneId: "SCN_002_FRICTION" }
        ]
    },
    "SCN_002_FRICTION": {
        id: "SCN_002_FRICTION",
        narrative: [
            "You walk into the building. The air inside is colder than outside.",
            "Suddenly—SLAM!",
            "A shoulder checks you hard. You stumble slightly.",
            "A female student in a pristine uniform (Akron) stops. She doesn't apologize, just turns to assess you.",
            "'...You're in the way.'"
        ],
        choices: [
            { id: "choice_A", text: "\"Sorry, I wasn't watching.\" (Bow slightly)", impact: {}, nextSceneId: "SCN_003_SORTING" },
            { id: "choice_B", text: "\"The hall is wide. Why shove?\" (Stare back)", impact: {}, nextSceneId: "SCN_003_SORTING" },
            { id: "choice_C", text: "...", impact: {}, nextSceneId: "SCN_003_SORTING" }
        ]
    },
    "SCN_003_SORTING": {
        id: "SCN_003_SORTING",
        narrative: [
            "No sorting hat. No warm ceremony. Just results on a massive LED screen.",
            "Speaker: 'STEREA doesn't choose you based on what you want to be... but on what you ARE when we aren't looking.'",
            "Your name appears on the screen. The system calculates your nature..."
        ],
        choices: [] // End of prologue chain, triggers logic
    }
};
