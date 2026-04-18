import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import useGameStore from './store/gameStore';
import scenarioData from './data/scenarios.json';

// Pages
import LandingPage from './pages/LandingPage';
import NarratorSelect from './pages/NarratorSelect';
import ScenarioInput from './pages/ScenarioInput';
import ChoiceCards from './pages/ChoiceCards';
import OutcomeScreen from './pages/OutcomeScreen';
import StatsPage from './pages/StatsPage';
import OverthinkingMode from './pages/OverthinkingMode';
import AlternateUniverse from './pages/AlternateUniverse';
import DecisionHistory from './pages/DecisionHistory';
import ChaosProgression from './pages/ChaosProgression';
import FinalEndingPage from './pages/FinalEndingPage';
import SharePage from './pages/SharePage';

// Components
import LoadingScreen from './components/LoadingScreen';
import ChaosEventPopup from './components/ChaosEventPopup';
import Navbar from './components/Navbar';
import InactivityNudge from './components/InactivityNudge';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const { phase, setPhase, roundCount, triggerChaosEvent, showChaosEvent } = useGameStore();
  const chaosEventTimerRef = useRef(null);

  // Random chaos events every 25-45 seconds while playing
  useEffect(() => {
    const playingPhases = ['input', 'choices', 'outcome', 'stats', 'history', 'progression'];
    if (!playingPhases.includes(phase) || showChaosEvent) return;

    const delay = 25000 + Math.random() * 20000;
    chaosEventTimerRef.current = setTimeout(() => {
      if (roundCount >= 1 && Math.random() < 0.6) {
        const events = scenarioData.chaosEvents;
        const event = events[Math.floor(Math.random() * events.length)];
        triggerChaosEvent(event);
      }
    }, delay);

    return () => clearTimeout(chaosEventTimerRef.current);
  }, [phase, roundCount, showChaosEvent]);

  const renderPage = () => {
    switch (phase) {
      case 'landing':
        return <PageWrapper key="landing"><LandingPage /></PageWrapper>;
      case 'narrator':
        return <PageWrapper key="narrator"><NarratorSelect /></PageWrapper>;
      case 'input':
        return <PageWrapper key="input"><ScenarioInput /></PageWrapper>;
      case 'choices':
        return <PageWrapper key="choices"><ChoiceCards /></PageWrapper>;
      case 'loading':
        return (
          <LoadingScreen
            key="loading"
            onComplete={() => setPhase('outcome')}
          />
        );
      case 'outcome':
        return <PageWrapper key="outcome"><OutcomeScreen /></PageWrapper>;
      case 'stats':
        return <PageWrapper key="stats"><StatsPage /></PageWrapper>;
      case 'overthinking':
        return <PageWrapper key="overthinking"><OverthinkingMode /></PageWrapper>;
      case 'alternate':
        return <PageWrapper key="alternate"><AlternateUniverse /></PageWrapper>;
      case 'history':
        return <PageWrapper key="history"><DecisionHistory /></PageWrapper>;
      case 'progression':
        return <PageWrapper key="progression"><ChaosProgression /></PageWrapper>;
      case 'ending':
        return <PageWrapper key="ending"><FinalEndingPage /></PageWrapper>;
      case 'share':
        return <PageWrapper key="share"><SharePage /></PageWrapper>;
      default:
        return <PageWrapper key="landing"><LandingPage /></PageWrapper>;
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Global scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-[9990]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)',
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Global Modals/Popups */}
      <ChaosEventPopup />
      <InactivityNudge />

      {/* Page render */}
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
    </div>
  );
}
