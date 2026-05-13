import React from 'react';
import { motion } from 'framer-motion';

const SystemsDiagram: React.FC = () => {
  // Define animation variants for the pulses
  const pulseVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: [0, 1, 1, 0],
      transition: { 
        duration: 2.5, 
        ease: "linear", 
        repeat: Infinity,
        repeatDelay: 1
      } 
    }
  };

  return (
    <section id="systems" class="py-24 px-6 max-w-5xl mx-auto w-full relative">
      <div className="mb-16 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-backend-text mb-4">Architecture & Flow</h2>
        <p className="text-backend-muted max-w-2xl text-lg font-light">
          A minimalist abstraction of request lifecycles. Designing reliable systems requires visualizing the path of data across services.
        </p>
      </div>

      <div className="relative w-full aspect-square md:aspect-video bg-backend-surface/30 border border-backend-border rounded-xl p-8 flex items-center justify-center overflow-hidden">
        
        {/* Abstract Background Grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-backend-muted) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        {/* The SVG Diagram */}
        <svg className="w-full h-full max-w-3xl absolute inset-0 m-auto" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          
          {/* Static Connection Lines */}
          <path d="M 150 200 L 350 200" stroke="var(--color-backend-border)" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 450 180 L 600 120" stroke="var(--color-backend-border)" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 450 220 L 600 280" stroke="var(--color-backend-border)" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 400 150 L 400 80" stroke="var(--color-backend-border)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Animated Data Pulses */}
          <motion.path 
            d="M 150 200 L 350 200" 
            stroke="var(--color-backend-accent)" 
            strokeWidth="3" 
            variants={pulseVariants}
            initial="initial"
            animate="animate"
          />
          <motion.path 
            d="M 450 180 L 600 120" 
            stroke="var(--color-backend-accent)" 
            strokeWidth="3" 
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 }}
          />
          <motion.path 
            d="M 450 220 L 600 280" 
            stroke="var(--color-backend-accent)" 
            strokeWidth="3" 
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 1 }}
          />
          
        </svg>

        {/* Nodes (HTML for easier text positioning) */}
        <div className="absolute inset-0 max-w-3xl m-auto flex items-center justify-between pointer-events-none px-4 md:px-12">
          
          {/* Client Node */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border border-backend-border bg-backend-bg flex flex-col items-center justify-center shadow-lg relative -top-4 md:top-0">
            <span className="text-xs uppercase tracking-widest text-backend-muted mb-2">Source</span>
            <span className="font-semibold text-backend-text text-sm">Client</span>
          </div>

          {/* API Gateway Node */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border border-backend-border bg-backend-surface flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)] relative z-10 -top-4 md:top-0">
            <span className="text-xs uppercase tracking-widest text-backend-muted mb-2">Layer</span>
            <span className="font-semibold text-backend-text text-sm text-center px-2">API Gateway</span>
            
            {/* Auth Node (Top of API) */}
            <div className="absolute -top-16 md:-top-24 w-16 h-16 md:w-20 md:h-20 rounded-full border border-backend-border bg-backend-bg flex items-center justify-center">
              <span className="text-[10px] text-backend-muted uppercase tracking-wider">Auth</span>
            </div>
          </div>

          {/* Backend Services */}
          <div className="flex flex-col space-y-12 md:space-y-20 relative -top-4 md:top-0">
            {/* Database Node */}
            <div className="w-24 h-16 md:w-32 md:h-20 rounded-lg border border-backend-border bg-backend-bg flex items-center justify-center relative shadow-lg">
              <div className="absolute -top-2 w-full h-4 rounded-[50%] border-t border-backend-border bg-backend-bg"></div>
              <div className="absolute -bottom-2 w-full h-4 rounded-[50%] border-b border-backend-border bg-backend-bg"></div>
              <span className="font-semibold text-backend-text text-sm">Database</span>
            </div>

            {/* Cache Node */}
            <div className="w-24 h-16 md:w-32 md:h-20 rounded-lg border border-backend-border bg-backend-bg flex items-center justify-center border-dashed">
              <span className="font-semibold text-backend-muted text-sm">Redis Cache</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SystemsDiagram;
