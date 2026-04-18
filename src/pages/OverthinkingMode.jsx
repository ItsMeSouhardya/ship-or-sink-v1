import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import useGameStore from '../store/gameStore';
import scenarioData from '../data/scenarios.json';

export default function OverthinkingMode() {
  const { setPhase, chaos } = useGameStore();
  const [visibleThoughts, setVisibleThoughts] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const thoughts = scenarioData.overthinkingThoughts;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < thoughts.length) {
        setVisibleThoughts((prev) => [...prev, thoughts[i]]);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 400);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`scanlines min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] relative overflow-hidden ${isShaking ? 'shake' : ''}`}
    >
      {/* Glitch flashes */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{ opacity: [0, 0.05, 0, 0.08, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ background: 'var(--red)' }}
      />

      {/* Header Warning */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-12 w-full text-center z-10"
      >
        <div className="inline-block border border-[var(--red)] bg-red-950/30 px-6 py-2">
          <p className="font-mono text-sm text-[var(--red)] tracking-[0.3em] uppercase font-bold">
             CRITICAL_WARNING // OVERTHINKING_CASCADE_DETECTED
          </p>
        </div>
      </motion.div>

      {/* Console output area */}
      <div className="relative z-10 w-full max-w-3xl mt-16 px-6">
        <div className="panel bg-[var(--bg-panel-2)] p-6 border-[var(--red)] min-h-[400px] flex flex-col justify-end overflow-hidden relative">
          
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-3 h-3 bg-[var(--red)] animate-pulse" />
            <span className="sys-label-red text-[var(--red)]">SYS_ERROR</span>
          </div>

          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {visibleThoughts.map((thought, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-mono text-sm text-white uppercase border-l-2 border-[var(--red)] pl-3"
                  style={{
                    opacity: Math.max(0.4, 1 - (visibleThoughts.length - i) * 0.15),
                  }}
                >
                  <span className="text-[var(--text-muted)] mr-3">[{new Date().toISOString().substring(11,23)}]</span>
                  {thought}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Blinking cursor at bottom */}
            {visibleThoughts.length < thoughts.length && (
               <div className="font-mono text-sm text-[var(--red)] pl-3 mt-2 animate-pulse">_</div>
            )}
          </div>
        </div>
      </div>

      {/* Escape button (appears after all thoughts shown) */}
      {visibleThoughts.length >= thoughts.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-16 z-20 flex flex-col items-center gap-4"
        >
          <p className="sys-label-muted">CASCADE COMPLETE. SYSTEM DEGRADED.</p>
          <button
            onClick={() => (chaos >= 100 ? setPhase('ending') : setPhase('input'))}
            className="btn-outline border-[var(--red)] text-[var(--red)] hover:bg-[var(--red)] hover:text-white px-8 py-3"
          >
            {chaos >= 100 ? 'ACKNOWLEDGE CRITICAL FAILURE' : 'FORCE REBOOT SYSTEM'}
          </button>
        </motion.div>
      )}

    </motion.div>
  );
}
