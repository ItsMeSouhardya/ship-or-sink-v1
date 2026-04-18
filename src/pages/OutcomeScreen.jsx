import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';
import scenarioData from '../data/scenarios.json';

const TIMELINE_STEPS = [
  { key: 'immediate', label: 'T+0:00 (IMMEDIATE)', color: 'var(--yellow)' },
  { key: 'tomorrow', label: 'T+24:00 (TOMORROW)', color: '#f97316' },
  { key: 'oneMonth', label: 'T+720:00 (30 DAYS)', color: 'var(--red)' },
];

export default function OutcomeScreen() {
  const { selectedChoice, narrator, chaos, setPhase, roundCount } = useGameStore();

  if (!selectedChoice) {
    setPhase('input');
    return null;
  }

  const narratorQuote = selectedChoice.narratorLines?.[narrator] || selectedChoice.narratorLines?.savage;

  const handleContinue = () => {
    if (chaos >= 100) {
      setPhase('ending');
    } else if (roundCount >= 2 && roundCount % 2 === 0) {
      const rand = Math.random();
      if (rand < 0.4) {
        setPhase('overthinking');
      } else if (rand < 0.7) {
        setPhase('alternate');
      } else {
        setPhase('input');
      }
    } else {
      setPhase('input');
    }
  };

  const altUniverse = scenarioData.alternateUniverseLines[
    Math.floor(Math.random() * scenarioData.alternateUniverseLines.length)
  ];

  return (
    <div className="scanlines min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-[var(--bg)] relative overflow-hidden">
      
      {/* Background warning if chaos high */}
      {chaos > 70 && (
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[var(--red)] animate-pulse" />
      )}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mb-10"
      >
        <p className="sys-label-cyan mb-2">SYSTEM.OUTCOME // FALLOUT_ANALYSIS</p>
        <h2 className="display-md text-white uppercase mb-2">
          ACTION LOGGED: <span className="text-[var(--yellow)]">{selectedChoice.label.replace(/[^a-zA-Z0-9 ?!'.,-]/g, '').trim()}</span>
        </h2>
        
        {/* Narrator Quote */}
        <div className="panel p-4 border-l-4 border-[var(--cyan)] mt-6 bg-[var(--bg-panel-2)]">
          <p className="sys-label-cyan mb-1">OBSERVER_FEEDBACK:</p>
          <p className="font-mono text-sm text-white uppercase tracking-wider">
            "{narratorQuote}"
          </p>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="w-full max-w-4xl mb-12">
        <p className="sys-label-muted mb-4 border-b border-[var(--border)] pb-2">PROJECTED CONSEQUENCE TIMELINE</p>
        
        <div className="flex flex-col gap-4">
          {TIMELINE_STEPS.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="flex items-stretch gap-0"
            >
              {/* Timeline marker */}
              <div className="w-32 shrink-0 flex flex-col items-end pr-4 border-r border-[var(--border)] py-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-right" style={{ color: step.color }}>
                  {step.label}
                </span>
                {i < TIMELINE_STEPS.length - 1 && (
                  <div className="w-px h-full mt-2 opacity-30" style={{ background: step.color }} />
                )}
              </div>
              
              {/* Content box */}
              <div className="flex-1 pl-6 py-2">
                <div className="panel p-4 bg-[var(--bg-panel-2)]">
                  <p className="font-mono text-sm text-[var(--text)] uppercase leading-relaxed">
                    {selectedChoice[step.key]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Alt Universe Teaser */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-4xl mb-10 panel p-4 border-l-4 border-[#9333ea] bg-[var(--bg-panel-2)]"
      >
         <p className="sys-label-muted mb-1" style={{ color: '#9333ea' }}>ANOMALY DETECTED // ALT_UNIVERSE_BLEED</p>
         <p className="font-mono text-xs text-gray-400 uppercase tracking-widest italic">
           "{altUniverse}"
         </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-4xl border-t border-[var(--border)] pt-8"
      >
        <button
          onClick={handleContinue}
          className={`btn-primary py-4 px-8 flex-1 justify-center ${chaos >= 100 ? 'bg-[var(--red)] text-white' : ''}`}
        >
          {chaos >= 100 ? 'SYSTEM FAILURE IMMINENT. VIEW FATE.' : 'ACKNOWLEDGE & CONTINUE'}
        </button>

        <button
          onClick={() => setPhase('stats')}
          className="btn-outline py-4 px-8 flex-1 justify-center"
        >
          VIEW SYSTEM STATUS
        </button>
      </motion.div>
    </div>
  );
}
