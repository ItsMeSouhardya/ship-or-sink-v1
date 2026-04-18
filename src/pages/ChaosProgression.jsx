import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';
import useGameStore from '../store/gameStore';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="panel p-3 border-[var(--cyan)] bg-[var(--bg-panel-2)]">
        <p className="sys-label-muted mb-1">{label}</p>
        <p className="font-mono text-sm font-bold text-[var(--cyan)]">CHAOS: {Math.round(payload[0].value)}%</p>
      </div>
    );
  }
  return null;
};

export default function ChaosProgression() {
  const { chaosHistory, decisionHistory, setPhase } = useGameStore();

  const chartData = chaosHistory.map((val, i) => ({
    name: i === 0 ? 'T-0' : `T+${i}`,
    chaos: val,
    decision: decisionHistory[i - 1]?.choice || '',
  }));

  const maxChaos = Math.max(...chaosHistory);
  const avgChaos = chaosHistory.length > 1
    ? Math.round(chaosHistory.reduce((a, b) => a + b, 0) / chaosHistory.length)
    : 0;

  return (
    <div className="scanlines min-h-screen flex flex-col items-center px-6 py-24 bg-[var(--bg)] relative overflow-hidden">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mb-8 border-b border-[var(--border)] pb-6"
      >
        <p className="sys-label-cyan mb-1">SYSTEM.ANALYTICS // ENTROPY_TRACKING</p>
        <h1 className="display-md text-white uppercase">CHAOS PROGRESSION</h1>
      </motion.div>

      <div className="w-full max-w-4xl space-y-6">
        
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { label: 'PEAK_ENTROPY', val: `${Math.round(maxChaos)}%`, color: 'var(--red)' },
            { label: 'AVG_ENTROPY', val: `${avgChaos}%`, color: 'var(--yellow)' },
            { label: 'EVENTS_LOGGED', val: decisionHistory.length, color: 'var(--cyan)' },
          ].map((s) => (
            <div key={s.label} className="panel p-4 flex flex-col items-center justify-center bg-[var(--bg-panel-2)] border-t-2" style={{ borderTopColor: s.color }}>
              <p className="sys-label-muted mb-2">{s.label}</p>
              <p className="font-mono text-3xl font-bold" style={{ color: s.color }}>{s.val}</p>
            </div>
          ))}
        </motion.div>

        {/* Main chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="panel p-6 bg-[var(--bg-panel-2)] border-l-4 border-[var(--cyan)]"
        >
          <div className="flex justify-between items-center mb-6">
             <h3 className="sys-label-cyan">TELEMETRY_DATA: ENTROPY_OVER_TIME</h3>
             <span className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-pulse" />
          </div>

          {chartData.length < 2 ? (
            <div className="text-center py-16 panel bg-[var(--bg)] border-dashed">
              <p className="sys-label-muted">INSUFFICIENT DATA FOR MEANINGFUL ANALYSIS.</p>
              <p className="sys-label-muted mt-2">REQUIRE MINIMUM 2 EVENTS.</p>
            </div>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chaosGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--cyan)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--cyan)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="var(--border-2)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="var(--text-muted)"
                    tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    stroke="var(--text-muted)"
                    tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-2)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  
                  <ReferenceLine y={50} stroke="var(--yellow)" strokeDasharray="3 3" label={{ value: 'WARNING', fill: 'var(--yellow)', fontSize: 10, position: 'insideTopLeft' }} />
                  <ReferenceLine y={80} stroke="var(--red)" strokeDasharray="3 3" label={{ value: 'CRITICAL', fill: 'var(--red)', fontSize: 10, position: 'insideTopLeft' }} />
                  
                  <Area
                    type="stepAfter"
                    dataKey="chaos"
                    stroke="var(--cyan)"
                    strokeWidth={2}
                    fill="url(#chaosGrad)"
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>

        {/* Milestone markers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="panel p-6 bg-[var(--bg-panel-2)]"
        >
          <h3 className="sys-label-muted mb-6">SYSTEM_THRESHOLDS</h3>
          <div className="space-y-4">
            {[
              { threshold: 25, label: 'MINOR_DEGRADATION', color: 'var(--cyan)' },
              { threshold: 50, label: 'CASCADE_WARNING (OVERTHINKING_RISK)', color: 'var(--yellow)' },
              { threshold: 75, label: 'TIMELINE_FRACTURE (ALT_UNIVERSE_BLEED)', color: '#9333ea' },
              { threshold: 100, label: 'TOTAL_SYSTEM_FAILURE', color: 'var(--red)' },
            ].map((m) => (
              <div key={m.threshold} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center font-mono text-xs font-bold border shrink-0"
                  style={{
                    background: maxChaos >= m.threshold ? `color-mix(in srgb, ${m.color} 15%, transparent)` : 'transparent',
                    borderColor: maxChaos >= m.threshold ? m.color : 'var(--border)',
                    color: maxChaos >= m.threshold ? m.color : 'var(--text-muted)'
                  }}
                >
                  {m.threshold}%
                </div>
                <div className="flex-1">
                  <p className="font-mono text-xs uppercase" style={{ color: maxChaos >= m.threshold ? 'white' : 'var(--text-muted)' }}>
                    {m.label}
                  </p>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: maxChaos >= m.threshold ? m.color : 'var(--border-2)' }}>
                  {maxChaos >= m.threshold ? 'BREACHED' : 'SECURE'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <button
            onClick={() => setPhase('input')}
            className="btn-primary flex-1 justify-center"
          >
            CONTINUE SIMULATION
          </button>
          <button
            onClick={() => setPhase('share')}
            className="btn-outline flex-1 justify-center"
          >
            EXPORT REPORT
          </button>
        </motion.div>
      </div>
    </div>
  );
}
