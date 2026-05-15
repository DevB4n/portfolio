import React, { useEffect, useState } from 'react';

const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'siem', label: 'SIEM' },
  { id: 'research', label: 'Research' },
  { id: 'tools', label: 'Tools' },
  { id: 'logs', label: 'Logs' },
  { id: 'philosophy', label: 'Philosophy' },
];

const SecurityNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveSection(id); }),
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.set(id, obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '0',
      padding: '10px 20px',
      borderRadius: '6px',
      background: scrolled ? 'rgba(7,11,20,0.88)' : 'rgba(7,11,20,0.6)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(71,193,226,0.12)',
      boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
      transition: 'background 0.4s ease, box-shadow 0.4s ease',
      whiteSpace: 'nowrap',
    }}>
      {/* Left: Brand */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginRight: '24px',
        paddingRight: '24px',
        borderRight: '1px solid rgba(71,193,226,0.15)',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" stroke="rgba(71,193,226,0.7)" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="2.5" fill="rgba(71,193,226,0.5)"/>
        </svg>
        <span style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'rgba(71,193,226,0.8)',
          fontWeight: 500,
          textTransform: 'uppercase',
        }}>
          SECURITY ISLAND
        </span>
      </div>

      {/* Center: Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {NAV_SECTIONS.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => scrollTo(id, e)}
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '10px',
                letterSpacing: '0.1em',
                color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(180,195,210,0.5)',
                textDecoration: 'none',
                padding: '4px 10px',
                borderRadius: '3px',
                background: isActive ? 'rgba(71,193,226,0.1)' : 'transparent',
                border: isActive ? '1px solid rgba(71,193,226,0.2)' : '1px solid transparent',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
              }}
              onMouseEnter={e => {
                if (!isActive) (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
              }}
              onMouseLeave={e => {
                if (!isActive) (e.target as HTMLElement).style.color = 'rgba(180,195,210,0.5)';
              }}
            >
              {label}
            </a>
          );
        })}
      </div>

      {/* Right: Back button */}
      <div style={{
        marginLeft: '24px',
        paddingLeft: '24px',
        borderLeft: '1px solid rgba(71,193,226,0.15)',
      }}>
        <a
          href="/"
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'rgba(180,195,210,0.5)',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => (e.target as HTMLElement).style.color = 'rgba(71,193,226,0.8)'}
          onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(180,195,210,0.5)'}
        >
          ← Return to Map
        </a>
      </div>
    </nav>
  );
};

export default SecurityNav;
