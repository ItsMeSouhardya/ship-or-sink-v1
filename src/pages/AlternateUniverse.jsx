import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';
import scenarioData from '../data/scenarios.json';

export default function AlternateUniverse() {
  const { setPhase, stats } = useGameStore();

  const altLine = scenarioData.alternateUniverseLines[
    Math.floor(Math.random() * scenarioData.alternateUniverseLines.length)
  ];

  const altStats = {
    academics: 95,
    mentalHealth: 90,
    sleep: 88,
    focus: 92,
    regret: 5,
  };

  return (
    <div className="scanlines min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--bg)] relative overflow-hidden">
      
      {/* Background interference */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiM5MzMzZWEiPjwvcmVjdD4KPC9zdmc+')] mix-blend-screen" />

      <div className="relative z-10 w-full max-w-4xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-block border border-[#9333ea] px-4 py-1 mb-4">
            <p className="sys-label-muted text-[#9333ea]">ANOMALY DETECTED // PARALLEL_TIMELINE_INTERSECTION</p>
          </div>
          <h1 className="display-lg text-white mb-4 uppercase">
            SIMULATION VARIANCE
          </h1>
          <div className="panel bg-[var(--bg-panel-2)] p-4 border-l-4 border-[#9333ea] max-w-2xl mx-auto">
            <p className="font-mono text-sm text-[var(--text)] uppercase tracking-wide">
              &gt; {altLine}
            </p>
          </div>
        </motion.div>

        {/* Side-by-side comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
          {/* Your universe */}
          <div className="panel p-6 border-t-4 border-[var(--red)]">
            <div className="flex justify-between items-center mb-6 border-b border-[var(--border)] pb-2">
              <span className="sys-label-red text-[var(--red)]">LOCAL_TIMELINE [CURRENT]</span>
              <span className="warn-icon">!</span>
            </div>
            
            {Object.entries(stats).map(([key, val]) => (
              <div key={key} className="stat-row">
                <span className="sys-label-muted">{key}</span>
                <div className="flex-1 mx-4 h-1 border-b border-dashed border-[var(--border)] opacity-30" />
                <span className="font-mono text-sm font-bold text-[var(--red)]">{Math.round(val)}</span>
              </div>
            ))}
          </div>

          {/* Alternate universe */}
          <div className="panel p-6 border-t-4 border-[#9333ea]">
            <div className="flex justify-between items-center mb-6 border-b border-[var(--border)] pb-2">
              <span className="sys-label-muted" style={{ color: '#9333ea' }}>REMOTE_TIMELINE [OPTIMAL]</span>
              <span className="font-mono text-xs text-[#9333ea]">*</span>
            </div>
            
            {Object.entries(altStats).map(([key, val]) => (
              <div key={key} className="stat-row">
                <span className="sys-label-muted">{key}</span>
                <div className="flex-1 mx-4 h-1 border-b border-dashed border-[var(--border)] opacity-30" />
                <span className="font-mono text-sm font-bold text-[#9333ea]">{val}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">
            NOTE: DIVERGENCE CAUSED BY USER ERROR. OPTIMAL TIMELINE UNREACHABLE.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={() => setPhase('input')}
            className="btn-outline border-[var(--red)] text-[var(--red)] hover:bg-[var(--red)] hover:text-white px-8 py-3"
          >
            RETURN TO FLAWED TIMELINE
          </button>
        </motion.div>
      </div>
    </div>
  );
}
