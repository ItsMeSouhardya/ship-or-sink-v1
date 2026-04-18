import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';
import GlitchText from '../components/GlitchText';
import scenarioData from '../data/scenarios.json';

export default function FinalEndingPage() {
  const { stats, chaos, decisionHistory, resetGame, setPhase } = useGameStore();

  const getFinalTitle = () => {
    const sorted = [...scenarioData.finalTitles].sort((a, b) => b.minChaos - a.minChaos);
    return sorted.find((t) => chaos >= t.minChaos) || sorted[sorted.length - 1];
  };

  const finalTitle = getFinalTitle();
  const lifeScore = Math.max(0, Math.round(
    (stats.academics + stats.mentalHealth + stats.sleep + stats.focus) / 4 - chaos * 0.3
  ));

  const isCritical = lifeScore < 30;

  return (
    <div className="scanlines min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[var(--bg)] relative overflow-hidden">
      
      {/* Background interference */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
         background: `radial-gradient(ellipse at center, ${isCritical ? 'var(--red)' : 'var(--yellow)'} 0%, transparent 60%)`,
         mixBlendMode: 'screen'
      }} />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl">
        
        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-[var(--red)] text-white font-mono text-sm font-bold uppercase tracking-[0.2em] py-2 mb-8"
        >
          SIMULATION TERMINATED // SYSTEM CRITICAL FAILURE
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 w-full"
        >
          <p className="sys-label-muted mb-4">FINAL_DIAGNOSIS:</p>
          <GlitchText
            text={finalTitle.title.replace(/[^a-zA-Z0-9 ]/g, '').trim()}
            className="display-lg text-white mb-4 uppercase leading-none"
          />
          <div className="panel inline-block bg-[var(--bg-panel-2)] px-6 py-3 border-l-4 border-[var(--red)]">
            <p className="font-mono text-sm text-[var(--red)] uppercase tracking-widest">
              &gt; {finalTitle.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
          
          {/* Life Score Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="panel p-8 bg-[var(--bg-panel-2)] flex flex-col items-center justify-center border-t-4"
            style={{ borderTopColor: isCritical ? 'var(--red)' : 'var(--yellow)' }}
          >
            <p className="sys-label-muted mb-4">OVERALL_SYSTEM_SCORE</p>
            <div className="flex items-end gap-2">
              <span className="font-mono text-8xl font-bold leading-none" style={{ color: isCritical ? 'var(--red)' : 'var(--yellow)' }}>
                {lifeScore}
              </span>
              <span className="font-mono text-2xl text-[var(--text-muted)] pb-2">/100</span>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest mt-6" style={{ color: isCritical ? 'var(--red)' : 'var(--yellow)' }}>
              {isCritical ? 'NON-RECOVERABLE STATE' : 'SEVERE DEGRADATION'}
            </p>
          </motion.div>

          {/* Subsystem Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: 'ACTIONS', val: decisionHistory.length },
              { label: 'ENTROPY', val: `${Math.round(chaos)}%` },
              { label: 'ACADEMICS', val: Math.round(stats.academics) },
              { label: 'MENTAL', val: Math.round(stats.mentalHealth) },
              { label: 'SLEEP', val: Math.round(stats.sleep) },
              { label: 'REGRET', val: Math.round(stats.regret) },
            ].map((s) => (
              <div key={s.label} className="panel p-4 flex flex-col justify-center">
                <p className="sys-label-muted mb-1">{s.label}</p>
                <p className="font-mono text-2xl font-bold text-white">{s.val}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl"
        >
          <button
            onClick={() => setPhase('share')}
            className="btn-primary flex-1 justify-center py-4 text-sm"
          >
            EXPORT FAILURE LOG
          </button>
          <button
            onClick={resetGame}
            className="btn-outline border-[var(--text-muted)] text-[var(--text-muted)] hover:bg-[var(--text-muted)] hover:text-black flex-1 justify-center py-4 text-sm"
          >
            INITIATE SYSTEM REBOOT
          </button>
        </motion.div>
      </div>
    </div>
  );
}
