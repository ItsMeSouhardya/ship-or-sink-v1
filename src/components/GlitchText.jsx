import { useEffect, useState } from 'react';

export default function GlitchText({ text, className = '', tag = 'h1' }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 350);
    }, 3500 + Math.random() * 2000);
    return () => clearInterval(iv);
  }, []);

  const Tag = tag;

  return (
    <Tag className={`relative inline-block ${className}`} style={{ fontFamily: 'var(--font-display)' }}>
      <span className={glitch ? 'opacity-0' : ''}>{text}</span>

      {glitch && (
        <>
          {/* cyan slice */}
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              color: 'var(--cyan)',
              clipPath: 'inset(25% 0 55% 0)',
              transform: 'translate(-5px, 1px)',
              fontFamily: 'var(--font-display)',
              opacity: 0.9,
            }}
          >{text}</span>
          {/* yellow slice */}
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              color: 'var(--yellow)',
              clipPath: 'inset(55% 0 20% 0)',
              transform: 'translate(5px, -1px)',
              fontFamily: 'var(--font-display)',
              opacity: 0.8,
            }}
          >{text}</span>
          {/* white base restored */}
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              color: '#fff',
              clipPath: 'inset(0% 0 75% 0)',
              fontFamily: 'var(--font-display)',
            }}
          >{text}</span>
        </>
      )}
    </Tag>
  );
}
