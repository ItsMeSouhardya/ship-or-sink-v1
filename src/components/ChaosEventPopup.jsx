import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/gameStore';

export default function ChaosEventPopup() {
  const { showChaosEvent, currentChaosEvent, dismissChaosEvent } = useGameStore();

  return (
    <AnimatePresence>
      {showChaosEvent && currentChaosEvent && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-20 left-1/2 z-[9999] -translate-x-1/2 w-full max-w-md px-4"
        >
          <div
            className="panel-accent-red p-4 cursor-pointer"
            style={{ borderRadius: 2 }}
            onClick={dismissChaosEvent}
          >
            <div className="flex items-start gap-3">
              <div className="warn-icon mt-0.5">!</div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-lg text-white leading-none mb-1"
                   style={{ fontFamily: 'var(--font-display)' }}>
                  {currentChaosEvent.text}
                </p>
                <p className="sys-label-muted">{currentChaosEvent.subtext}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="tag-red">+{currentChaosEvent.chaos} CHAOS</span>
                <span className="sys-label-muted" style={{ fontSize: '0.55rem' }}>CLICK TO DISMISS</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
