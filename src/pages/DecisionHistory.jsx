import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';

export default function DecisionHistory() {
  const { decisionHistory, setPhase, chaos } = useGameStore();

  return (
    <div className="scanlines min-h-screen flex flex-col items-center px-6 py-24 bg-[var(--bg)] relative overflow-hidden">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mb-10 border-b border-[var(--border)] pb-6"
      >
        <div className="flex justify-between items-end">
          <div>
            <p className="sys-label-cyan mb-1">SYSTEM.LOGS // EVENT_HISTORY</p>
            <h1 className="display-md text-white uppercase">ACTION REGISTRY</h1>
          </div>
          <div className="text-right hidden sm:block">
            <p className="sys-label-muted">TOTAL RECORDS: {decisionHistory.length}</p>
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-4xl">
        {decisionHistory.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="panel p-12 text-center"
          >
            <p className="font-mono text-sm text-[var(--text-muted)] uppercase tracking-widest mb-4">
              NO RECORDS FOUND IN CURRENT SESSION.
            </p>
            <button
              onClick={() => setPhase('input')}
              className="btn-primary"
            >
              INITIALIZE LOGGING
            </button>
          </motion.div>
        ) : (
          <>
            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 sm:left-24 top-0 bottom-0 w-px bg-[var(--border)]" />

              <div className="space-y-6">
                {decisionHistory.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex flex-col sm:flex-row gap-4 sm:gap-8"
                  >
                    {/* Timestamp / Round (Left column on desktop) */}
                    <div className="sm:w-16 shrink-0 flex items-center sm:items-start sm:pt-4 z-10 bg-[var(--bg)] sm:bg-transparent">
                       <span className="font-mono text-xs text-[var(--cyan)] bg-[var(--bg-panel)] border border-[var(--cyan)] px-2 py-1">
                         T+{item.round}
                       </span>
                    </div>

                    {/* Card */}
                    <div className="flex-1 panel p-5 bg-[var(--bg-panel-2)] hover:border-[var(--yellow)] transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 border-b border-[var(--border)] pb-4">
                        <div>
                          <p className="sys-label-muted mb-1">RECORDED_ACTION:</p>
                          <p className="font-mono text-sm font-bold text-white uppercase">
                            {item.choice.replace(/[^a-zA-Z0-9 ?!'.,-]/g, '').trim()}
                          </p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end shrink-0">
                          <span className="tag-red mb-1">+{item.chaosAdded} CHAOS</span>
                        </div>
                      </div>

                      <div>
                        <p className="sys-label-muted mb-1">SCENARIO_CONTEXT:</p>
                        <p className="font-mono text-xs text-[var(--text-muted)] uppercase">
                          {item.situation}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--border)]">
                        <span className="sys-label-muted px-2 py-1 bg-[var(--bg-panel)]">
                          CLASS: CRITICAL_ERROR
                        </span>
                        {item.chaosAdded >= 25 && (
                          <span className="sys-label-muted px-2 py-1 border border-[var(--red)] text-[var(--red)]">
                            IMPACT: SEVERE
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 panel p-4 bg-[var(--bg-panel-2)] border-l-4 border-[var(--yellow)] flex justify-between items-center"
            >
              <span className="sys-label-muted">SYSTEM_CHAOS_ACCUMULATION:</span>
              <span className="font-mono text-lg font-bold text-[var(--red)]">{Math.round(chaos)}%</span>
            </motion.div>
          </>
        )}

        {/* Actions */}
        {decisionHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => setPhase('input')}
              className="btn-primary flex-1 justify-center"
            >
              CONTINUE LOGGING
            </button>
            <button
              onClick={() => setPhase('share')}
              className="btn-outline flex-1 justify-center"
            >
              EXPORT DATA
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
