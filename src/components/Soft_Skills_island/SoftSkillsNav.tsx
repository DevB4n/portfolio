import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'mindset', label: 'Mindset' },
  { id: 'journey', label: 'Journey' },
  { id: 'howIWork', label: 'How I Work' },
  { id: 'values', label: 'Values' },
  { id: 'reflections', label: 'Reflections' },
  { id: 'artifacts', label: 'Artifacts' },
];

const LighthouseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M8 6l4-4 4 4" />
    <rect x="9" y="6" width="6" height="10" rx="1" />
    <path d="M7 16h10M5 20h14" />
    <path d="M12 10h.01" />
    <line x1="9" y1="12" x2="15" y2="12" />
  </svg>
);

const SoftSkillsNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('mindset');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );
      observer.observe(element);
      observers.set(id, observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleScroll = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        width: 'calc(100% - 48px)',
        maxWidth: '980px',
        borderRadius: '100px',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        background: scrolled
          ? 'rgba(244, 237, 225, 0.82)'
          : 'rgba(244, 237, 225, 0.55)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(197, 168, 128, 0.25)',
        boxShadow: scrolled
          ? '0 4px 32px rgba(100, 70, 30, 0.10)'
          : '0 2px 16px rgba(100, 70, 30, 0.06)',
        transition: 'all 0.4s ease',
      }}
    >
      {/* LEFT: Icon + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7a5c3a', minWidth: 0 }}>
        <LighthouseIcon />
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', fontWeight: 500, color: '#5a3e22', whiteSpace: 'nowrap', letterSpacing: '0.01em' }}>
          Soft Skills Islands
        </span>
      </div>

      {/* CENTER: Section links */}
      <ul style={{ display: 'flex', alignItems: 'center', gap: '4px', listStyle: 'none', margin: 0, padding: 0, flexShrink: 0 }}>
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleScroll(id, e)}
                style={{
                  display: 'block',
                  padding: '5px 12px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  color: isActive ? '#5a3e22' : '#9a7d5e',
                  background: isActive ? 'rgba(197, 168, 128, 0.22)' : 'transparent',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>

      {/* RIGHT: Back button */}
      <a
        href="/My_Travel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '100px',
          fontSize: '11px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          color: '#7a5c3a',
          border: '1px solid rgba(197, 168, 128, 0.4)',
          background: 'rgba(197, 168, 128, 0.08)',
          transition: 'all 0.25s ease',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(197, 168, 128, 0.22)';
          (e.currentTarget as HTMLAnchorElement).style.color = '#5a3e22';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(197, 168, 128, 0.08)';
          (e.currentTarget as HTMLAnchorElement).style.color = '#7a5c3a';
        }}
      >
        ← Back
      </a>
    </nav>
  );
};

export default SoftSkillsNav;
