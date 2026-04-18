import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';
import StatBar from '../components/StatBar';
import ChaosMeter from '../components/ChaosMeter';

export default function StatsPage() {
  const { stats, chaos, roundCount, setPhase } = useGameStore();

  const avgRegret = stats.regret;
  const overallHealth = Math.round(
    (stats.academics + stats.mentalHealth + stats.sleep + stats.focus) / 4
  );

  const getHealthLabel = () => {
    if (overallHealth > 70) return { label: 'FUNCTIONAL', color: 'var(--cyan)' };
    if (overallHealth > 50) return { label: 'DEGRADED', color: 'var(--yellow)' };
    if (overallHealth > 30) return { label: 'CRITICAL', color: '#f97316' };
    return { label: 'TERMINAL', color: 'var(--red)' };
  };

  const health = getHealthLabel();

  return (
    <div className="scanlines min-h-screen flex flex-col items-center justify-start px-6 py-24 bg-[var(--bg)] relative overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mb-8"
      >
        <div className="flex justify-between items-end border-b border-[var(--border)] pb-4 mb-6">
          <div>
            <p className="sys-label-cyan mb-1">SYSTEM.METRICS // LIFE_STATUS</p>
            <h1 className="display-md text-white uppercase">VITAL STATISTICS</h1>
          </div>
          <div className="text-right hidden sm:block">
            <p className="sys-label-muted">UPTIME: {roundCount} CYCLES</p>
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Main Stats & Chaos */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Health Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="panel p-6 flex items-center justify-between"
            style={{ borderLeft: `4px solid ${health.color}` }}
          >
            <div>
              <p className="sys-label-muted mb-1">OVERALL_INTEGRITY</p>
              <p className="font-display text-4xl uppercase" style={{ color: health.color, letterSpacing: '0.05em' }}>
                {health.label}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-5xl font-bold text-white">{overallHealth}<span className="text-xl text-[var(--text-muted)]">/100</span></p>
            </div>
          </motion.div>

          {/* Stat Bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="panel p-6 bg-[var(--bg-panel-2)]"
          >
            <div className="flex justify-between items-center mb-6 border-b border-[var(--border)] pb-2">
               <span className="sys-label-cyan">SUBSYSTEM_ANALYSIS</span>
               <span className="sys-label-muted">LIVE FEED</span>
            </div>
            <div className="space-y-4">
              {Object.entries(stats).map(([key, val], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <StatBar statKey={key} value={val} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Chaos Meter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="panel p-6"
          >
            <ChaosMeter chaos={chaos} />
          </motion.div>
        </div>

        {/* Right Column: Diagnostics & Actions */}
        <div className="space-y-6">
          
          {/* Diagnostics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 gap-4"
          >
            <div className="panel-2 p-4 text-center">
              <p className="sys-label-muted mb-2">DECISION_COUNT</p>
              <p className="font-mono text-3xl font-bold text-white">{roundCount}</p>
            </div>
            <div className="panel-2 p-4 text-center border-l-2 border-[var(--red)]">
              <p className="sys-label-muted mb-2">AVG_REGRET</p>
              <p className="font-mono text-3xl font-bold text-[var(--red)]">{Math.round(avgRegret)}%</p>
            </div>
            <div className="panel-2 p-4 text-center border-l-2 border-[var(--yellow)]">
              <p className="sys-label-muted mb-2">SLEEP_DEFICIT</p>
              <p className="font-mono text-3xl font-bold text-[var(--yellow)]">-{Math.max(0, 80 - Math.round(stats.sleep))}</p>
            </div>
          </motion.div>

          {/* Fix button fakeout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="panel p-4 border border-[var(--red)] bg-red-900/10 text-center"
          >
             <button className="w-full py-2 bg-[var(--red)] text-white font-mono text-xs font-bold uppercase tracking-widest opacity-50 cursor-not-allowed mb-2">
               INITIATE LIFE FIX
             </button>
             <p className="sys-label-red text-[var(--red)]">ERROR: TOO LATE.</p>
          </motion.div>

          {/* Nav Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3"
          >
            <button
              onClick={() => setPhase('input')}
              className="btn-primary justify-center py-4"
            >
              RESUME SIMULATION
            </button>
            <button
              onClick={() => setPhase('history')}
              className="btn-outline justify-center py-3"
            >
              VIEW CHAOS LOG
            </button>
            <button
              onClick={() => setPhase('progression')}
              className="btn-outline justify-center py-3"
            >
              SYSTEM CHARTS
            </button>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
