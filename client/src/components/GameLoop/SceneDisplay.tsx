import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { useStats } from '../../context/StatsContext';
import { scenes } from '../../data/scenes';
import { getSceneChoices } from '../../data/gameConfig';
import { DecisionPoint } from './DecisionPoint';
import { RadarChart } from '../PsychEngine/RadarChart';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Choice } from '../../types/game';

export function SceneDisplay() {
    const { gameState, setScene, completePrologue } = useGame();
    const { updateStats, stats } = useStats();
    const [lineIndex, setLineIndex] = useState(0);

    const currentScene = scenes[gameState.currentSceneId];
    const isLastLine = lineIndex >= currentScene.narrative.length - 1;

    // Reset line index when scene changes
    useEffect(() => {
        setLineIndex(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState.currentSceneId]);

    // Handle Choice Selection
    const handleDecision = (choice: Choice) => {
        // 1. Calculate Impact
        const sceneChoices = getSceneChoices(currentScene.id);
        if (sceneChoices && sceneChoices[choice.id]) {
            updateStats(sceneChoices[choice.id]);
        }

        // 2. Move to Next Scene or End
        if (choice.nextSceneId) {
            setScene(choice.nextSceneId);
        }
    };

    // Check for auto-sorting triggers
    useEffect(() => {
        if (gameState.currentSceneId === 'SCN_003_SORTING' && isLastLine) {
            // Run logic after a brief delay
            const timeout = setTimeout(() => {
                // Logic to find dorm based on stats
                let dorm: "AKRON" | "DESMOS" | "SKIA" | "ANTOCHI" = "ANTOCHI";

                if (stats.stance >= 2 && stats.drive >= 1) dorm = "AKRON";
                else if (stats.empathy >= 2) dorm = "DESMOS";
                else if (stats.intellect >= 2) dorm = "SKIA";

                completePrologue(dorm);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [gameState.currentSceneId, isLastLine, stats, completePrologue]);

    const advanceText = () => {
        if (!isLastLine) {
            setLineIndex(prev => prev + 1);
        }
    };

    if (gameState.isPrologueComplete) {
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-8 animate-in fade-in duration-1000">
                <h1 className="text-6xl font-bold tracking-tighter text-white">Analysis Complete</h1>
                <div className="text-2xl text-secondary">Assigned Dormitory</div>
                <div className={`text-5xl font-mono font-bold tracking-widest text-${gameState.assignedDorm?.toLowerCase()}`}>
                    {gameState.assignedDorm}
                </div>
                <RadarChart />
            </div>
        )
    }

    return (
        <div className="flex h-screen w-full bg-background text-primary relative">
            {/* Visual / Radar Section - Left or Background */}
            <div className="absolute top-8 right-8 z-10 opacity-50 hover:opacity-100 transition-opacity">
                <RadarChart />
            </div>

            {/* Main Narrative Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto z-0">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={`${gameState.currentSceneId}-${lineIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-2xl md:text-3xl font-light leading-relaxed text-center mb-12 min-h-[120px]"
                    >
                        "{currentScene.narrative[lineIndex]}"
                    </motion.div>
                </AnimatePresence>

                {/* Interaction Area */}
                <div className="w-full">
                    {!isLastLine ? (
                        <button
                            onClick={advanceText}
                            className="mx-auto flex items-center space-x-2 text-secondary hover:text-white transition-colors uppercase tracking-widest text-sm"
                        >
                            <span>Continue</span> <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        currentScene.choices && currentScene.choices.length > 0 ? (
                            <DecisionPoint choices={currentScene.choices} onDecision={handleDecision} />
                        ) : (
                            <div className="text-center text-sm text-secondary animate-pulse">
                                PROCESSING PSYCHOMETRICS...
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-4 left-4 text-xs text-secondary/40 font-mono">
                SCENE: {gameState.currentSceneId}
            </div>
        </div>
    );
}
