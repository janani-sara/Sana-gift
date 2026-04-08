import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function TransitionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0D0D0D 0%, #2a1a1a 25%, #f8f5f2 75%, #f8f5f2 100%)'
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#D4AF37] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              opacity: 0
            }}
            animate={{
              y: -100,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="text-center px-4 z-10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <div className="font-mono text-sm md:text-base text-gray-400 space-y-2">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {'>'} Rebooting Personality...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-[#00FF9F]"
            >
              {'>'} System Check: ████████████ 100%
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-[#D4AF37]"
            >
              {'>'} Restoring Perfection...
            </motion.p>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 2, type: "spring" }}
            className="text-6xl md:text-8xl"
          >
            ✨
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="text-xl md:text-2xl font-serif text-gray-700"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Upgrade Complete
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
