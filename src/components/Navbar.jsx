import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';

export default function Navbar() {
  const { phase, setPhase } = useGameStore();

  const hiddenPhases = ['landing', 'narrator', 'loading', 'overthinking', 'ending'];
  if (hiddenPhases.includes(phase)) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-panel)]">
      {/* Logo */}
      <button
        onClick={() => setPhase('input')}
        className="font-display text-2xl text-[var(--yellow)] tracking-wider italic"
      >
        LIFE RUINER
      </button>

      {/* Nav links */}
      <div className="flex items-center gap-6">
        <NavLink label="SIMULATOR" active={['input', 'choices', 'outcome'].includes(phase)} onClick={() => setPhase('input')} />
        <NavLink label="CHAOS LOG" active={phase === 'history'} onClick={() => setPhase('history')} />
        <NavLink label="SYSTEM STATUS" active={['stats', 'progression'].includes(phase)} onClick={() => setPhase('stats')} />
      </div>

      {/* Right action */}
      <button 
        onClick={() => setPhase('input')}
        className="btn-primary py-2 px-4"
        style={{ fontSize: '0.65rem' }}
      >
        INITIATE RUIN
      </button>
    </nav>
  );
}

function NavLink({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-xs font-bold tracking-widest uppercase transition-colors relative ${
        active ? 'text-[var(--yellow)]' : 'text-[var(--text-muted)] hover:text-white'
      }`}
    >
      {label}
      {active && (
        <motion.div 
          layoutId="nav-indicator"
          className="absolute -bottom-5 left-0 right-0 h-[2px] bg-[var(--yellow)]"
        />
      )}
    </button>
  );
}
