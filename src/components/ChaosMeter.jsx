import { motion } from 'framer-motion';

const TOTAL_SEGMENTS = 12;

export default function ChaosMeter({ chaos }) {
  const filled = Math.round((chaos / 100) * TOTAL_SEGMENTS);

  const segColor = (i) => {
    const pct = ((i + 1) / TOTAL_SEGMENTS) * 100;
    if (pct <= 40)  return 'var(--yellow)';
    if (pct <= 65)  return '#f97316';
    if (pct <= 85)  return '#ff5522';
    return 'var(--red)';
  };

  const label = () => {
    if (chaos < 20) return 'STABLE';
    if (chaos < 40) return 'SLIPPING';
    if (chaos < 60) return 'CHAOTIC';
    if (chaos < 80) return 'CRITICAL';
    return 'DOOMED';
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="sys-label">Chaos Meter</span>
        <span className="sys-label-yellow">{label()} — {Math.round(chaos)}%</span>
      </div>
      <div className="block-bar">
        {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => (
          <motion.div
            key={i}
            className="block-bar-segment"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              background: i < filled ? segColor(i) : 'var(--bg-panel-3)',
            }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
