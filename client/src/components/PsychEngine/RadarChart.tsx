import { useStats } from '../../context/StatsContext';
import { motion } from 'framer-motion';
import type { StatKey } from '../../types/game';

const MAX_STAT_VALUE = 10; // Assuming 10 is the max for the chart boundary
const HEX_SIZE = 100;

export function RadarChart() {
    const { stats } = useStats();

    const statOrder: StatKey[] = ['stance', 'drive', 'intellect', 'knowledge', 'empathy', 'resilience'];

    // Calculate points for the polygon
    const points = statOrder.map((key, index) => {
        const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2; // Start from top
        const value = Math.max(0, Math.min(stats[key], MAX_STAT_VALUE));
        const radius = (value / MAX_STAT_VALUE) * HEX_SIZE;
        const x = Math.cos(angle) * radius + HEX_SIZE;
        const y = Math.sin(angle) * radius + HEX_SIZE;
        return `${x},${y}`;
    }).join(' ');

    // Background Hexagon (Full size)
    const bgPoints = statOrder.map((_, index) => {
        const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
        const x = Math.cos(angle) * HEX_SIZE + HEX_SIZE;
        const y = Math.sin(angle) * HEX_SIZE + HEX_SIZE;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Background Grid */}
            <svg width="200" height="200" className="overflow-visible opacity-20">
                <polygon points={bgPoints} fill="transparent" stroke="currentColor" strokeWidth="1" />
            </svg>

            {/* Active Chart */}
            <svg width="200" height="200" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible">
                <motion.polygon
                    points={points}
                    fill="rgba(255, 255, 255, 0.1)"
                    stroke="white"
                    strokeWidth="2"
                    initial={{ opacity: 0 }}
                    animate={{ points }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
                {/* Data Points */}
                {statOrder.map((key, index) => {
                    const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
                    const value = Math.max(0, Math.min(stats[key], MAX_STAT_VALUE));
                    const radius = (value / MAX_STAT_VALUE) * HEX_SIZE;
                    const x = Math.cos(angle) * radius + HEX_SIZE;
                    const y = Math.sin(angle) * radius + HEX_SIZE;

                    return (
                        <motion.circle
                            key={key}
                            cx={x}
                            cy={y}
                            r="2"
                            className="fill-white"
                            animate={{ cx: x, cy: y }}
                        />
                    );
                })}
            </svg>

            {/* Labels */}
            {statOrder.map((key, index) => {
                const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
                const labelRadius = HEX_SIZE + 20; // Push labels out

                return (
                    <div
                        key={key}
                        className="absolute text-[10px] uppercase tracking-widest text-secondary font-mono"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(calc(-50% + ${Math.cos(angle) * labelRadius}px), calc(-50% + ${Math.sin(angle) * labelRadius}px))`
                        }}
                    >
                        {key}
                    </div>
                );
            })}
        </div>
    );
}
