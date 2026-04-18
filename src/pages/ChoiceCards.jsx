import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';

export default function ChoiceCards() {
  const { currentScenario, situation, narrator, selectChoice, setPhase } = useGameStore();

  if (!currentScenario) {
    setPhase('input');
    return null;
  }

  const handleChoice = (choice) => {
    selectChoice(choice);
    setPhase('loading');
  };

  const narratorIntro = {
    savage: `ALRIGHT. HERE ARE YOUR OPTIONS. ALL TERRIBLE. CHOOSE WISELY (YOU WON'T).`,
    motivational: `GREAT NEWS! YOU HAVE THREE AMAZING OPTIONS AHEAD! (THEY'RE ALL BAD. SO, SO BAD.)`,
    emotional: `I... I JUST WANT YOU TO KNOW... WHATEVER YOU CHOOSE... I'LL BE HERE... THROUGH THE CONSEQUENCES...`,
  };

  return (
    <div className="scanlines min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-[var(--bg)] relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl mb-8"
      >
        <div className="flex justify-between items-end mb-2">
          <p className="sys-label-cyan">SYSTEM.PROMPT // SELECT_ACTION</p>
          <span className="font-mono text-[0.65rem] text-[var(--text-muted)] border border-[var(--border)] px-2 py-1 uppercase">
            CAT: {currentScenario.category.replace(/[^a-zA-Z ]/g, '').trim()}
          </span>
        </div>
        
        <h2 className="display-md text-white mb-4 uppercase bg-[var(--bg-panel-2)] p-4 border-l-4 border-[var(--yellow)]">
          {situation || currentScenario.situation}
        </h2>

        <p className="font-mono text-sm text-[var(--text-muted)] uppercase tracking-widest pl-2 border-l-2 border-[var(--cyan)]">
          OBSERVER_NOTE: {narratorIntro[narrator] || narratorIntro.savage}
        </p>
      </motion.div>

      {/* Choices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {currentScenario.choices.map((choice, i) => (
          <motion.button
            key={choice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleChoice(choice)}
            className="group card-sys p-0 flex flex-col text-left h-full"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b border-[var(--border)] bg-[var(--bg-panel-2)]">
              <span className="sys-label-muted">OPTION_0{i + 1}</span>
              <span className="font-mono text-xs text-[var(--red)] uppercase tracking-widest group-hover:animate-pulse">
                EXECUTE 
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-mono text-lg font-bold text-white mb-4 uppercase leading-tight group-hover:text-[var(--yellow)] transition-colors">
                {choice.label.replace(/[^a-zA-Z0-9 ?!'.,-]/g, '').trim()}
              </h3>

              <div className="mb-6 space-y-2 flex-1">
                <p className="font-mono text-[0.65rem] text-[var(--cyan)] uppercase">IMMEDIATE_FALLOUT:</p>
                <p className="font-mono text-xs text-[var(--text-muted)] uppercase line-clamp-3 leading-relaxed border-l border-[var(--border)] pl-3">
                  {choice.immediate}
                </p>
              </div>

              {/* Stats preview */}
              <div className="mt-auto pt-4 border-t border-[var(--border)] flex flex-wrap gap-2">
                {Object.entries(choice.statChanges)
                  .filter(([, v]) => v !== 0)
                  .slice(0, 3)
                  .map(([stat, val]) => (
                    <span
                      key={stat}
                      className={val < 0 ? 'tag-red' : 'tag-cyan'}
                      style={{ fontSize: '0.6rem' }}
                    >
                      {val > 0 ? '+' : ''}{val} {stat.substring(0,3).toUpperCase()}
                    </span>
                  ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
