import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GateAnimation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Small delay to ensure styles and layouts are parsed before opening
    const timer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isOpen && (
        <div className="fixed inset-0 z-[100] flex pointer-events-none">
          {/* Left Gate */}
          <motion.div
            initial={{ width: "50%" }}
            exit={{ width: "0%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-backend-bg border-r border-backend-border"
          />
          {/* Right Gate */}
          <motion.div
            initial={{ width: "50%" }}
            exit={{ width: "0%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-backend-bg border-l border-backend-border"
          />
          
          {/* Center Loading Indicator (Optional) */}
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-backend-text tracking-[0.3em] text-xs font-mono"
          >
            INITIALIZING
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GateAnimation;
