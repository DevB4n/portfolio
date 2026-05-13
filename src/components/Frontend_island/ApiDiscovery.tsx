import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ApiDiscovery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="min-h-[120vh] relative flex items-center py-32 px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm-gray/5 to-transparent pointer-events-none" />
      
      <motion.div style={{ opacity }} className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 relative">
        <div className="space-y-12 z-10">
          <motion.div 
            style={{ y: y1 }}
            className="p-8 border border-charcoal/20 bg-canvas/80 backdrop-blur-sm rounded-sm shadow-[8px_8px_0px_rgba(28,28,26,0.05)] relative"
          >
            <div className="absolute -top-3 -left-3 text-muted-navy opacity-50 font-serif italic text-sm">Action</div>
            <pre className="font-mono text-sm md:text-base text-ink overflow-x-auto">
              <span className="text-muted-navy font-bold">const</span> response = <span className="text-muted-gold">await</span> fetch(<span className="text-warm-gray">'/api/data'</span>);{'\n'}
              <span className="text-muted-navy font-bold">const</span> data = <span className="text-muted-gold">await</span> response.json();
            </pre>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="pl-8 border-l border-warm-gray/30 font-sans font-light text-xl text-charcoal/80"
          >
            "How does it know?" I wondered. The interface wasn't just drawing pixels anymore. It was conversing with systems.
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col justify-end pt-24">
          <motion.div 
            style={{ y: y2 }}
            className="p-8 border border-warm-gray/20 bg-muted-navy text-canvas rounded-sm relative shadow-2xl"
          >
            <div className="absolute -top-3 -right-3 text-muted-gold opacity-80 font-serif italic text-sm bg-canvas px-2 text-ink border border-warm-gray/30">200 OK</div>
            <pre className="font-mono text-sm md:text-base overflow-x-auto opacity-90">
              {'{'}{'\n'}
              {'  '}<span className="text-muted-gold">"status"</span>: <span className="text-warm-gray">"success"</span>,{'\n'}
              {'  '}<span className="text-muted-gold">"data"</span>: {'['}{'\n'}
              {'    '}{'{'} <span className="text-muted-gold">"id"</span>: 1, <span className="text-muted-gold">"type"</span>: <span className="text-warm-gray">"architecture"</span> {'}'},{'\n'}
              {'    '}{'{'} <span className="text-muted-gold">"id"</span>: 2, <span className="text-muted-gold">"type"</span>: <span className="text-warm-gray">"state"</span> {'}'}{'\n'}
              {'  '}{']'}{'\n'}
              {'}'}
            </pre>
          </motion.div>
        </div>
        
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block" style={{ zIndex: 0 }}>
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M 300 200 C 500 200, 400 400, 700 400"
            fill="none" 
            stroke="var(--color-warm-gray)" 
            strokeWidth="1" 
            strokeDasharray="4 4"
            className="opacity-30"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default ApiDiscovery;
