import React from 'react';
import { motion } from 'framer-motion';

const StoryBlock = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-32 px-8 relative overflow-hidden">
      {/* Decorative blueprints/sketches */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg className="w-full h-full text-muted-navy" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="10" y1="0" x2="10" y2="100" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2,2" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2,2" />
          <circle cx="80" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="0.1" />
        </svg>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-12">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-2xl md:text-3xl leading-relaxed text-ink font-serif"
        >
          I started programming through frontend development. What first attracted me was visuals, interactions and interfaces.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-xl md:text-2xl leading-relaxed text-charcoal/80 font-sans font-light pl-8 md:pl-16 border-l-[1px] border-warm-gray/30"
        >
          Over time I became curious about how APIs worked, how data moved, how applications communicated.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6 pt-12"
        >
          <p className="text-xl md:text-2xl leading-relaxed text-ink font-serif">
            Looking back, it was difficult for my younger self. Understanding logic, state, APIs and architecture was hard.
          </p>
          <p className="text-2xl md:text-4xl leading-relaxed text-muted-navy font-serif italic pt-8 relative inline-block">
            <span className="relative z-10">But the hardest part was not learning to walk. It was getting up every time I failed.</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-muted-gold/20 -rotate-1 z-0"></span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StoryBlock;
