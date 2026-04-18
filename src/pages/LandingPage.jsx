import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';

export default function LandingPage() {
  const { setPhase } = useGameStore();

  return (
    <div className="scanlines min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] relative overflow-hidden">
      
      {/* Background teal scanlines */}
      <div className="absolute inset-0 hero-scanlines opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)] to-[var(--bg)]" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center">
        
        {/* Title Block */}
        <div className="w-full text-center mb-8 relative">
          {/* Subtle lined background for the title area */}
          <div className="absolute inset-0 -mx-10" style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
          }} />
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-xl text-white relative z-10 uppercase tracking-wide"
          >
            LIFE RUINER
          </motion.h1>
        </div>

        {/* Subtitle / System message */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="border-l-4 border-[var(--yellow)] pl-6 mb-16 max-w-2xl w-full"
        >
          <p className="text-xl sm:text-2xl text-[var(--text)] uppercase tracking-wider font-light leading-snug">
            BAD DECISION SIMULATOR. ENTER A CHOICE. MEASURE THE FALLOUT. REGRET EVERYTHING.
          </p>
        </motion.div>

        {/* Action Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-2xl"
        >
          <p className="sys-label-cyan mb-2" style={{ color: 'var(--cyan)' }}>SYSTEM INITIALIZATION</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setPhase('narrator')}
              className="btn-primary flex-1 justify-center text-sm py-4"
            >
              INITIALIZE RUIN SEQUENCE
            </button>
          </div>
        </motion.div>

        {/* System Logs / Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 w-full max-w-2xl panel p-6 grid grid-cols-3 gap-6"
        >
          <div className="flex flex-col items-center border-r border-[var(--border)]">
            <span className="font-mono text-xl font-bold text-[var(--yellow)]">∞</span>
            <span className="sys-label-muted mt-1 text-center">BAD DECISIONS</span>
          </div>
          <div className="flex flex-col items-center border-r border-[var(--border)]">
            <span className="font-mono text-xl font-bold text-white">100%</span>
            <span className="sys-label-muted mt-1 text-center">REGRET LEVEL</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-mono text-xl font-bold text-[var(--red)]">CRITICAL</span>
            <span className="sys-label-muted mt-1 text-center">SYSTEM STATUS</span>
          </div>
        </motion.div>
      </div>

      {/* Footer text */}
      <div className="absolute bottom-6 w-full px-8 flex justify-between items-center z-10 text-[0.65rem] font-mono text-[var(--red)] uppercase tracking-widest opacity-80">
        <span>© 2024 SYSTEM_FAILURE_LABS. ALL REGRETS RESERVED.</span>
        <div className="flex gap-6">
          <span>PRIVACY_VOID</span>
          <span>TERMS_OF_RUIN</span>
          <span>DATA_LEAK</span>
        </div>
      </div>
    </div>
  );
}
