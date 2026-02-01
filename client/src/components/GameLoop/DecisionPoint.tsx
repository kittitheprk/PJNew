import { motion } from 'framer-motion';
import type { Choice } from '../../types/game';

interface DecisionPointProps {
    choices: Choice[];
    onDecision: (choice: Choice) => void;
}

export function DecisionPoint({ choices, onDecision }: DecisionPointProps) {
    return (
        <div className="grid gap-4 w-full max-w-2xl mx-auto mt-8">
            {choices.map((choice, index) => (
                <motion.button
                    key={choice.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onDecision(choice)}
                    className="group relative px-6 py-4 bg-surface border border-secondary/20 hover:border-white transition-all duration-300 text-left"
                >
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                    <span className="text-sm text-secondary group-hover:text-white transition-colors uppercase tracking-wider block mb-1">
                        Option {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-lg font-medium text-primary group-hover:text-white transition-colors">
                        {choice.text}
                    </span>
                </motion.button>
            ))}
        </div>
    );
}
