import React, { useEffect, useState } from 'react';

export interface Section {
  id: string;
  label: string;
}

interface NavigationBarProps {
  sections: Section[];
  theme?: 'frontend' | 'backend';
}

const NavigationBar: React.FC<NavigationBarProps> = ({ sections, theme = 'frontend' }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();

    // Create an observer for each section to track which is most visible
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-20% 0px -60% 0px', // Trigger when element is near top-center
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.set(id, observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  const handleScroll = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80; // offset for nav bar
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const isBackend = theme === 'backend';

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full px-6 py-3 transition-all duration-300 ${isBackend
        ? 'glass-backend text-backend'
        : 'glass-ink text-ink'
      }`}>
      <ul className="flex items-center space-x-6 md:space-x-8 text-xs md:text-sm font-sans font-medium tracking-wide">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleScroll(id, e)}
                className={`relative transition-colors duration-300 ${isActive
                    ? (isBackend ? 'text-white' : 'text-ink font-semibold')
                    : (isBackend ? 'text-backend-muted hover:text-white' : 'text-charcoal/60 hover:text-ink')
                  }`}
              >
                {label}
                {isActive && (
                  <span className={`absolute -bottom-1 left-0 w-full h-[1px] ${isBackend ? 'bg-white' : 'bg-ink'
                    } animate-pulse`} />
                )}
              </a>
            </li>
          );
        })}
        {/* Link to swap islands */}
        <li className="pl-4 ml-4 border-l border-opacity-20 border-current">
          <a
            href={isBackend ? "/Frontend_island" : "/Backend_island"}
            className={`transition-colors duration-300 uppercase tracking-widest text-[10px] ${isBackend ? 'text-backend-muted hover:text-white' : 'text-charcoal/60 hover:text-ink'
              }`}
          >
            {isBackend ? "→ Go to Frontend" : "→ Go to Backend"}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
