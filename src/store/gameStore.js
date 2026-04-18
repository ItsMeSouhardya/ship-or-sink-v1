import { create } from 'zustand';

const initialStats = {
  academics: 80,
  mentalHealth: 80,
  sleep: 80,
  focus: 80,
  regret: 10,
};

const useGameStore = create((set, get) => ({
  // Game state
  phase: 'landing', // landing | narrator | input | choices | loading | outcome | stats | overthinking | alternate | history | progression | ending | share
  narrator: null, // 'savage' | 'motivational' | 'emotional'
  situation: '',
  currentScenario: null,
  selectedChoice: null,
  stats: { ...initialStats },
  chaos: 0,
  decisionHistory: [],
  chaosHistory: [0],
  roundCount: 0,
  showChaosEvent: false,
  currentChaosEvent: null,

  // Actions
  setPhase: (phase) => set({ phase }),
  setNarrator: (narrator) => set({ narrator }),
  setSituation: (situation) => set({ situation }),
  setCurrentScenario: (scenario) => set({ currentScenario: scenario }),

  selectChoice: (choice) => {
    const state = get();
    const newStats = { ...state.stats };

    // Apply stat changes
    Object.entries(choice.statChanges).forEach(([stat, change]) => {
      if (stat in newStats) {
        newStats[stat] = Math.max(0, Math.min(100, newStats[stat] + change));
      }
    });

    const newChaos = Math.min(100, state.chaos + (choice.chaosIncrease || 15));
    const newHistory = [
      ...state.decisionHistory,
      {
        round: state.roundCount + 1,
        situation: state.situation,
        choice: choice.label,
        emoji: choice.emoji,
        chaosAdded: choice.chaosIncrease,
        timestamp: new Date().toISOString(),
      },
    ];
    const newChaosHistory = [...state.chaosHistory, newChaos];

    set({
      selectedChoice: choice,
      stats: newStats,
      chaos: newChaos,
      decisionHistory: newHistory,
      chaosHistory: newChaosHistory,
      roundCount: state.roundCount + 1,
    });
  },

  triggerChaosEvent: (event) => {
    set({ showChaosEvent: true, currentChaosEvent: event });
    const newChaos = Math.min(100, get().chaos + (event.chaos || 10));
    set({ chaos: newChaos });
  },

  dismissChaosEvent: () => set({ showChaosEvent: false, currentChaosEvent: null }),

  applyInactivityPenalty: () => {
    const state = get();
    const newStats = { ...state.stats };
    ['academics', 'mentalHealth', 'sleep', 'focus'].forEach((stat) => {
      newStats[stat] = Math.max(0, newStats[stat] - 2);
    });
    newStats.regret = Math.min(100, newStats.regret + 5);
    
    const newChaos = Math.min(100, state.chaos + 5);
    
    // Optional: add to chaos history if you want it tracked on the chart, but usually we only track per round.
    
    set({
      stats: newStats,
      chaos: newChaos,
    });
  },

  resetGame: () =>
    set({
      phase: 'landing',
      narrator: null,
      situation: '',
      currentScenario: null,
      selectedChoice: null,
      stats: { ...initialStats },
      chaos: 0,
      decisionHistory: [],
      chaosHistory: [0],
      roundCount: 0,
      showChaosEvent: false,
      currentChaosEvent: null,
    }),
}));

export default useGameStore;
