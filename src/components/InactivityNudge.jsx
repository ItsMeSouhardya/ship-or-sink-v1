import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/gameStore';

const NUDGES = {
  savage: [
    "THINKING... OR JUST BUFFERING?",
    "YOU EVEN PROCRASTINATE BAD DECISIONS?",
    "THIS IS A NEW LEVEL OF USELESSNESS. 💀",
  ],
  motivational: [
    "TAKE YOUR TIME... FAILURE ISN'T GOING ANYWHERE! 💪",
    "EVERY SECOND YOU WAIT IS ANOTHER SECOND OF NOT RUINING YOUR LIFE! KEEP IT UP!",
    "LIFE PROGRESS PAUSED DUE TO LAZINESS. YOU CAN DO THIS!",
  ],
  emotional: [
    "YOU LEFT ME ALONE...",
    "I'M JUST WAITING HERE... IN THE VOID...",
    "WHY CAN'T YOU EVEN MAKE A BAD DECISION...",
  ],
};

export default function InactivityNudge() {
  const { phase, narrator, applyInactivityPenalty, setPhase } = useGameStore();
  const [idleTime, setIdleTime] = useState(0);
  const [stage, setStage] = useState(0); // 0 = none, 1 = 30s, 2 = 60s, 3 = 90s
  
  const activePhases = ['input', 'choices'];
  const isActivePhase = activePhases.includes(phase);

  useEffect(() => {
    if (!isActivePhase) {
      setIdleTime(0);
      setStage(0);
      return;
    }

    const timer = setInterval(() => {
      setIdleTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActivePhase, phase]);

  useEffect(() => {
    if (!isActivePhase) return;

    if (idleTime === 30) {
      setStage(1);
      applyInactivityPenalty();
    } else if (idleTime === 60) {
      setStage(2);
      applyInactivityPenalty();
    } else if (idleTime === 90) {
      setStage(3);
      applyInactivityPenalty();
    } else if (idleTime === 120) {
      setStage(0);
      setIdleTime(0);
      setPhase('overthinking');
    }
  }, [idleTime, isActivePhase, applyInactivityPenalty, setPhase]);

  useEffect(() => {
    const reset = () => {
      // Only reset if no nudge is showing, so they are forced to click the button to dismiss the takeover.
      if (stage === 0) {
        setIdleTime(0);
      }
    };

    window.addEventListener('mousemove', reset);
    window.addEventListener('keydown', reset);
    window.addEventListener('click', reset);
    window.addEventListener('scroll', reset);

    return () => {
      window.removeEventListener('mousemove', reset);
      window.removeEventListener('keydown', reset);
      window.removeEventListener('click', reset);
      window.removeEventListener('scroll', reset);
    };
  }, [stage]);

  const handleDismiss = () => {
    setStage(0);
    setIdleTime(0);
  };

  if (!isActivePhase || stage === 0) return null;

  const currentNudges = NUDGES[narrator] || NUDGES.savage;
  const message = currentNudges[stage - 1];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 backdrop-blur-md bg-black/80"
      >
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{
           backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 3px)',
        }} />

        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="relative z-10 w-full max-w-2xl panel p-8 border-l-4 border-[var(--red)] bg-[var(--bg-panel-2)] text-center shadow-2xl"
        >
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="w-3 h-3 bg-[var(--red)] animate-pulse rounded-none" />
            <span className="font-mono text-xs text-[var(--red)] tracking-widest font-bold">INACTIVITY_WARNING</span>
          </div>

          <h2 className="display-md text-white mt-12 mb-6 uppercase relative inline-block">
            {message}
          </h2>

          <div className="panel bg-[var(--bg)] border-[var(--red)] p-4 mb-8 inline-block mx-auto">
             <p className="font-mono text-[0.65rem] text-[var(--red)] uppercase tracking-widest">
               SYSTEM PENALTY APPLIED: CHAOS INCREASED. STATS DECREASED.
             </p>
          </div>

          <div className="flex justify-center">
             <button
               onClick={handleDismiss}
               className="btn-primary !bg-[var(--red)] hover:!bg-white border-none !text-white hover:!text-[var(--red)] py-4 px-8"
             >
               FINE, RUIN MY LIFE
             </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
