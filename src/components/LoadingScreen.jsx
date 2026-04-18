import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const MSGS = [
  'CALCULATING WORST DECISION...',
  'CONSULTING PAST MISTAKES...',
  'SIMULATING REGRET SEQUENCE...',
  'ACTIVATING CHAOS PROTOCOLS...',
  'PROCESSING BAD TAKES...',
  'MEASURING FALLOUT...',
  'RUINING YOUR LIFE...',
  'COMPILING POOR JUDGMENT...',
  'OPTIMIZING FOR REGRET...',
  'IGNORING GOOD ADVICE...',
];

export default function LoadingScreen({ onComplete }) {
  const [idx, setIdx]       = useState(0);
  const [pct, setPct]       = useState(0);
  const [dots, setDots]     = useState('');

  useEffect(() => {
    const miv = setInterval(() => setIdx(i => (i + 1) % MSGS.length), 550);
    const div  = setInterval(() => setDots(d => d.length < 3 ? d + '.' : ''), 400);
    const piv  = setInterval(() => {
      setPct(p => {
        if (p >= 100) { clearInterval(piv); setTimeout(onComplete, 200); return 100; }
        return Math.min(100, p + Math.random() * 14 + 4);
      });
    }, 120);
    return () => { clearInterval(miv); clearInterval(div); clearInterval(piv); };
  }, [onComplete]);

  const filledSeg = Math.round((Math.min(pct, 100) / 100) * 20);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)',
      }} />

      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center gap-6">
        {/* Logo */}
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--yellow)', letterSpacing: '0.1em' }}>
          LIFE RUINER
        </div>

        {/* Animated message */}
        <AnimatePresence mode="wait">
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="sys-label text-center"
            style={{ color: 'var(--cyan)' }}
          >
            {MSGS[idx]}{dots}
          </motion.p>
        </AnimatePresence>

        {/* Segmented progress */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-3 rounded-none"
                style={{
                  background: i < filledSeg ? 'var(--yellow)' : 'var(--bg-panel-3)',
                  transition: 'background 0.15s',
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="sys-label-muted">PROCESSING</span>
            <span className="sys-label-yellow">{Math.min(Math.round(pct), 100)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
