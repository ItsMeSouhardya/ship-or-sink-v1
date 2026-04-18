import { motion } from 'framer-motion';
import { useState } from 'react';
import useGameStore from '../store/gameStore';
import scenarioData from '../data/scenarios.json';

export default function SharePage() {
  const { stats, chaos, decisionHistory, roundCount, narrator, resetGame, setPhase } = useGameStore();
  const [copied, setCopied] = useState(false);

  const getFinalTitle = () => {
    const sorted = [...scenarioData.finalTitles].sort((a, b) => b.minChaos - a.minChaos);
    return sorted.find((t) => chaos >= t.minChaos) || sorted[sorted.length - 1];
  };

  const lifeScore = Math.max(0, Math.round(
    (stats.academics + stats.mentalHealth + stats.sleep + stats.focus) / 4 - chaos * 0.3
  ));
  const finalTitle = getFinalTitle();

  const narratorNames = {
    savage: 'SAVAGE_PROTOCOL',
    motivational: 'TOXIC_MOTIVATOR',
    emotional: 'EMOTIONAL_WRECK',
  };

  const shareText = `SYSTEM LOG // LIFE RUINER 

STATUS: TERMINATED
DIAGNOSIS: ${finalTitle.title.replace(/[^a-zA-Z0-9 ]/g, '').trim()}
SCORE: ${lifeScore}/100
ENTROPY: ${Math.round(chaos)}%
EVENTS_LOGGED: ${roundCount}

METRICS:
[ACD] ${Math.round(stats.academics)}% | [MNT] ${Math.round(stats.mentalHealth)}% 
[SLP] ${Math.round(stats.sleep)}% | [RGT] ${Math.round(stats.regret)}%

OBSERVER: ${narratorNames[narrator] || 'UNKNOWN'}
> "${finalTitle.subtitle}"

SIMULATE AT: localhost:5173`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="scanlines min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-[var(--bg)] relative">
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center w-full max-w-2xl mb-8 border-b border-[var(--border)] pb-6"
      >
        <p className="sys-label-cyan mb-1">SYSTEM.OUTPUT // DATA_EXPORT</p>
        <h1 className="display-md text-white uppercase">EXPORT FAILURE LOG</h1>
      </motion.div>

      <div className="w-full max-w-2xl space-y-6">
        
        {/* Copy text block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="panel p-6 bg-[var(--bg-panel-2)] border-l-4 border-[var(--yellow)] relative group"
        >
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="w-2 h-2 bg-[var(--yellow)] animate-pulse rounded-full" />
            <span className="sys-label-yellow">READY</span>
          </div>

          <p className="sys-label-muted mb-4">RAW_DATA_PAYLOAD:</p>
          
          <pre className="font-mono text-[0.75rem] text-[var(--text)] whitespace-pre-wrap leading-relaxed">
            {shareText}
          </pre>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-4"
        >
          <button
            onClick={handleCopy}
            className={`py-4 font-mono text-sm font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${
              copied 
                ? 'bg-[var(--cyan)] text-black border border-[var(--cyan)]' 
                : 'bg-[var(--yellow)] text-black border border-[var(--yellow)] hover:bg-white'
            }`}
          >
            {copied ? 'PAYLOAD COPIED TO CLIPBOARD' : 'COPY RAW LOG'}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={resetGame}
              className="btn-outline justify-center border-[var(--red)] text-[var(--red)] hover:bg-[var(--red)] hover:text-white"
            >
              REBOOT SYSTEM
            </button>
            <button
              onClick={() => setPhase('history')}
              className="btn-outline justify-center border-[var(--text-muted)] text-[var(--text-muted)] hover:bg-[var(--text-muted)] hover:text-white"
            >
              VIEW EVENT HISTORY
            </button>
          </div>
        </motion.div>

        {/* Warning footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="font-mono text-[0.65rem] text-[var(--text-muted)] uppercase tracking-widest">
             WARNING: TRANSMITTING THIS DATA WILL EXPOSE YOUR POOR DECISION-MAKING CAPABILITIES TO UNAUTHORIZED PERSONNEL.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
