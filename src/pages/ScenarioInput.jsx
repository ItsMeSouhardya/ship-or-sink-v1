import { motion } from 'framer-motion';
import { useState } from 'react';
import useGameStore from '../store/gameStore';
import scenarioData from '../data/scenarios.json';

const SCENARIO_CATEGORIES = scenarioData.scenarios.map((s) => ({
  id: s.id,
  label: s.category.replace(/[^a-zA-Z ]/g, '').trim().toUpperCase(), // remove emojis for terminal feel
  situation: s.situation,
}));

export default function ScenarioInput() {
  const { situation, setSituation, setCurrentScenario, setPhase, narrator, chaos } = useGameStore();
  const [inputVal, setInputVal] = useState(situation || '');

  const narratorHints = {
    savage: 'AWAITING DISASTER INPUT...',
    motivational: 'AWAITING SCENARIO INPUT. (IT\'S GOING TO BE OKAY. PROBABLY NOT.)',
    emotional: 'AWAITING INPUT... I\'M HERE FOR YOU...',
  };

  const handleQuickPick = (scenario) => {
    setInputVal(scenario.situation);
    const found = scenarioData.scenarios.find((s) => s.id === scenario.id);
    if (found) setCurrentScenario(found);
  };

  const handleSubmit = () => {
    if (!inputVal.trim()) return;
    setSituation(inputVal.trim());

    const matched = scenarioData.scenarios.find((s) =>
      inputVal.toLowerCase().includes(s.id.replace('_', ' '))
    );
    const scenario = matched || scenarioData.scenarios[Math.floor(Math.random() * scenarioData.scenarios.length)];
    setCurrentScenario(scenario);
    setPhase('choices');
  };

  return (
    <div className="scanlines min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-[var(--bg)] relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl mb-8"
      >
        <p className="sys-label-cyan mb-2">SYSTEM.INPUT // AWAITING_PARAMETERS</p>
        <h1 className="display-lg text-white mb-2 uppercase">
          DEFINE SCENARIO
        </h1>
        <p className="font-mono text-sm text-[var(--text-muted)] uppercase tracking-widest border-l-2 border-[var(--yellow)] pl-4">
          {narratorHints[narrator] || narratorHints.savage}
        </p>
      </motion.div>

      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-3xl mb-12"
      >
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full relative">
            <div className="sys-label-yellow absolute -top-5 left-0">CURRENT_SITUATION</div>
            <textarea
              id="situation-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
              }}
              placeholder="e.g. Exam tomorrow morning, haven't studied."
              rows={2}
              className="sys-input resize-none w-full bg-[var(--bg-panel-2)] border-[var(--border)] focus:border-[var(--yellow)] font-mono text-sm uppercase"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!inputVal.trim()}
            className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            EXECUTE
          </button>
        </div>
      </motion.div>

      {/* Quick Picks */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-3xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px bg-[var(--border)] flex-1" />
          <p className="sys-label-muted">OR SELECT PRESET SCENARIO</p>
          <div className="h-px bg-[var(--border)] flex-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {SCENARIO_CATEGORIES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => handleQuickPick(s)}
              className="group text-left p-3 border border-[var(--border)] bg-[var(--bg-panel)] hover:border-[var(--cyan)] transition-colors flex flex-col gap-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] font-bold text-[var(--cyan)] tracking-widest">{s.label}</span>
                <span className="font-mono text-[0.55rem] text-[var(--text-muted)] group-hover:text-white transition-colors">[{i + 1}]</span>
              </div>
              <span className="font-mono text-xs text-[var(--text)] uppercase truncate block w-full">
                {s.situation}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Chaos reminder */}
      {chaos > 0 && (
        <div className="absolute top-24 right-6 text-right hidden lg:block">
          <p className="sys-label-muted mb-1">SYSTEM_CHAOS</p>
          <p className="font-mono text-xl font-bold" style={{ color: 'var(--red)' }}>
            {Math.round(chaos)}%
          </p>
        </div>
      )}
    </div>
  );
}
