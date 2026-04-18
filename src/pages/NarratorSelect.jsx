import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';

const NARRATORS = [
  {
    id: 'savage',
    emoji: 'S-01',
    name: 'SAVAGE_PROTOCOL',
    description: 'Zero filter. Maximum damage.',
    sample: '"Great choice. Absolutely terrible. Keep going."',
    border: 'border-[var(--red)]',
    accent: 'var(--red)',
    bgHover: 'rgba(255,59,59,0.05)',
  },
  {
    id: 'motivational',
    emoji: 'M-02',
    name: 'TOXIC_MOTIVATOR',
    description: 'Fake positivity. Real consequences.',
    sample: '"You\'re doing amazing! (You\'re not.)"',
    border: 'border-[var(--yellow)]',
    accent: 'var(--yellow)',
    bgHover: 'rgba(232,255,0,0.05)',
  },
  {
    id: 'emotional',
    emoji: 'E-03',
    name: 'EMOTIONAL_WRECK',
    description: 'Feels everything. Helps nothing.',
    sample: '"Oh no... oh sweetheart... why..."',
    border: 'border-[var(--cyan)]',
    accent: 'var(--cyan)',
    bgHover: 'rgba(0,212,204,0.05)',
  },
];

export default function NarratorSelect() {
  const { setNarrator, setPhase } = useGameStore();

  const handleSelect = (narrator) => {
    setNarrator(narrator.id);
    setPhase('input');
  };

  return (
    <div className="scanlines min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[var(--bg)] relative">
      {/* Background elements */}
      <div className="absolute top-0 w-full h-px bg-[var(--cyan)] opacity-20" />
      <div className="absolute bottom-0 w-full h-px bg-[var(--cyan)] opacity-20" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mb-12"
      >
        <p className="sys-label-cyan mb-2">SYSTEM.CONFIG // NARRATOR_SELECT</p>
        <h1 className="display-lg text-white mb-4 uppercase">
          INITIALIZE OBSERVER
        </h1>
        <p className="font-mono text-sm text-[var(--text-muted)] uppercase tracking-widest max-w-lg border-l-2 border-[var(--border)] pl-4">
          Select an observer module. Warning: Observer personality will affect all system feedback and consequence reporting.
        </p>
      </motion.div>

      {/* Narrator cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {NARRATORS.map((narrator, i) => (
          <motion.button
            key={narrator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleSelect(narrator)}
            className="group relative flex flex-col text-left panel p-6 border transition-colors duration-200 overflow-hidden"
            style={{ 
              borderColor: 'var(--border)', 
              '--hover-bg': narrator.bgHover 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = narrator.accent;
              e.currentTarget.style.background = narrator.bgHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.background = 'var(--bg-panel)';
            }}
          >
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: narrator.accent }} />

            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-xs font-bold tracking-widest px-2 py-1" style={{ color: '#000', background: narrator.accent }}>
                {narrator.emoji}
              </span>
              <span className="sys-label-muted">STATUS: READY</span>
            </div>

            <h2 className="display-sm text-white mb-2 tracking-wide uppercase">{narrator.name}</h2>
            <p className="font-mono text-xs text-[var(--text-muted)] mb-6 flex-1 uppercase">
              {narrator.description}
            </p>
            
            <div className="mt-auto pt-4 border-t border-[var(--border)] relative">
              <div className="absolute -left-6 top-0 w-1 h-full" style={{ background: narrator.accent }} />
              <p className="font-mono text-xs italic" style={{ color: narrator.accent }}>
                {narrator.sample}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
