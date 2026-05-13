import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js", 
  "Tailwind CSS", "Framer Motion",  "Three.js",
  "HTML5", "APIs", "Responsive Design", 
];

const TechTags = () => {
  return (
    <section className="py-32 px-8 min-h-[80vh] flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-muted-gold/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-serif text-ink mb-16 text-center italic opacity-80">
          The Palette
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {skills.map((skill, index) => {
            // Randomize slight rotations and translations for an organic feel
            const rotation = Math.random() * 6 - 3; // -3 to 3 degrees
            const yOffset = Math.random() * 10 - 5; // -5 to 5 px

            return (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: yOffset }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0,
                  y: -5,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                viewport={{ once: true }}
                style={{ rotate: rotation }}
                className="px-6 py-3 bg-canvas border border-warm-gray/20 shadow-sm text-charcoal font-sans text-sm md:text-base cursor-pointer relative group"
              >
                {/* Paint stroke effect on hover */}
                <span className="absolute inset-0 bg-muted-navy opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
                {skill}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechTags;
