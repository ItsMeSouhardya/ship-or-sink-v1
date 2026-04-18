import { motion } from 'framer-motion';

const STAT_CONFIG = {
  academics:    { label: 'ACADEMICS',     emoji: '📚', inverse: false },
  mentalHealth: { label: 'MENTAL HEALTH', emoji: '🧠', inverse: false },
  sleep:        { label: 'SLEEP',         emoji: '😴', inverse: false },
  focus:        { label: 'FOCUS',         emoji: '📱', inverse: false },
  regret:       { label: 'REGRET',        emoji: '💀', inverse: true  },
};

const SEG = 10;

export default function StatBar({ statKey, value }) {
  const cfg = STAT_CONFIG[statKey];
  if (!cfg) return null;

  const filled = Math.round((value / 100) * SEG);
  const isBad  = cfg.inverse ? value > 50 : value < 40;
  const segColor = cfg.inverse
    ? (value > 60 ? 'var(--red)' : value > 30 ? '#f97316' : 'var(--cyan)')
    : (value > 60 ? 'var(--cyan)' : value > 30 ? '#f97316' : 'var(--red)');

  return (
    <div className="stat-row">
      <div className="flex items-center gap-2 w-36 shrink-0">
        <span style={{ fontSize: '0.85rem' }}>{cfg.emoji}</span>
        <span className="sys-label-muted">{cfg.label}</span>
      </div>

      <div className="flex gap-1 flex-1">
        {Array.from({ length: SEG }).map((_, i) => (
          <motion.div
            key={i}
            className="block-bar-segment"
            style={{ height: 10 }}
            animate={{ background: i < filled ? segColor : 'var(--bg-panel-3)' }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          />
        ))}
      </div>

      <motion.span
        key={value}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        className="font-mono text-xs font-bold w-8 text-right"
        style={{ color: isBad ? 'var(--red)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
      >
        {Math.round(value)}
      </motion.span>
    </div>
  );
}
