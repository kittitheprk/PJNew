import { useEffect, useState, useRef } from 'react';
import { useStats } from '../../context/StatsContext';
import type { StatKey } from '../../types/game';
import { motion, AnimatePresence } from 'framer-motion';

export function StatFeedback() {
    const { stats } = useStats();
    const prevStats = useRef(stats);
    const [feedbackQueue, setFeedbackQueue] = useState<{ key: StatKey, diff: number, id: number }[]>([]);
    const counter = useRef(0);

    useEffect(() => {
        const changes: { key: StatKey, diff: number }[] = [];
        (Object.keys(stats) as StatKey[]).forEach(key => {
            const diff = stats[key] - prevStats.current[key];
            if (diff !== 0) {
                changes.push({ key, diff });
            }
        });

        if (changes.length > 0) {
            const newItems = changes.map(c => ({ ...c, id: counter.current++ }));
            setFeedbackQueue(prev => [...prev, ...newItems]);

            // Auto dismiss
            setTimeout(() => {
                setFeedbackQueue(prev => prev.slice(newItems.length));
            }, 3000);
        }

        prevStats.current = stats;
    }, [stats]);

    return (
        <div className="absolute top-4 right-4 flex flex-col items-end space-y-2 pointer-events-none z-50">
            <AnimatePresence>
                {feedbackQueue.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`
              flex items-center space-x-2 px-3 py-1 rounded-full border bg-surface/80 backdrop-blur-sm
              ${item.key === 'stance' || item.key === 'drive' ? 'border-red-500/50 text-red-500' : ''}
              ${item.key === 'intellect' || item.key === 'knowledge' ? 'border-blue-500/50 text-blue-500' : ''}
              ${item.key === 'empathy' || item.key === 'resilience' ? 'border-green-500/50 text-green-500' : ''}
            `}
                    >
                        <span className="text-[10px] uppercase font-bold tracking-widest">{item.key}</span>
                        <span className="text-xs font-mono">{item.diff > 0 ? '+' : ''}{item.diff}</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
