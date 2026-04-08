import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onNext: () => void;
}

// Roast theme images
const roastImages = [
  '/data/roast/IMG-20241213-WA0026.jpg',
  '/data/roast/IMG-20241213-WA0032.jpg',
  '/data/roast/IMG-20241213-WA0035.jpg',
  '/data/roast/IMG-20241213-WA0040.jpg',
];

export function LandingPage({ onNext }: LandingPageProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1a0a2e] via-[#16213e] to-[#0f3460] overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#00FF9F] rounded-full opacity-20"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
          className="mb-8"
        >
          <Sparkles className="w-16 h-16 text-[#00FF9F]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-extrabold text-center mb-4 bg-gradient-to-r from-[#00FF9F] via-[#FF5C5C] to-[#00FF9F] bg-clip-text text-transparent animate-pulse"
          style={{ animationDuration: '3s' }}
        >
          Happy Birthday
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="text-6xl md:text-8xl font-black text-white mb-8 text-center glitch-text"
          data-text="SATHANA"
        >
          SATHANA
        </motion.h2>

        {/* Image Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 gap-4 mb-12 max-w-md w-full"
        >
          {roastImages.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 5 : -5 }}
              className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#00FF9F] shadow-lg shadow-[#00FF9F]/50"
            >
              <ImageWithFallback
                src={img}
                alt={`Sathana ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xl md:text-2xl text-[#00FF9F] text-center mb-8 font-semibold max-w-2xl"
        >
          Ready for a wild ride? Let's see if you can handle what's coming... 😈
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="group relative px-8 py-4 bg-gradient-to-r from-[#FF5C5C] to-[#00FF9F] rounded-full text-white font-bold text-xl shadow-2xl shadow-[#FF5C5C]/50 hover:shadow-[#00FF9F]/50 transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            Let's Go!
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </span>
        </motion.button>
      </div>

      <style>{`
        .glitch-text {
          position: relative;
          text-shadow: 0.05em 0 0 #FF5C5C, -0.025em -0.05em 0 #00FF9F, 0.025em 0.05em 0 #00FFFF;
          animation: glitch 1s infinite;
        }
        
        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 #FF5C5C, -0.025em -0.05em 0 #00FF9F, 0.025em 0.05em 0 #00FFFF;
          }
          14% {
            text-shadow: 0.05em 0 0 #FF5C5C, -0.025em -0.05em 0 #00FF9F, 0.025em 0.05em 0 #00FFFF;
          }
          15% {
            text-shadow: -0.05em -0.025em 0 #00FFFF, 0.025em 0.025em 0 #FF5C5C, -0.05em -0.05em 0 #00FF9F;
          }
          49% {
            text-shadow: -0.05em -0.025em 0 #00FFFF, 0.025em 0.025em 0 #FF5C5C, -0.05em -0.05em 0 #00FF9F;
          }
          50% {
            text-shadow: 0.025em 0.05em 0 #00FF9F, 0.05em 0 0 #00FFFF, 0 -0.05em 0 #FF5C5C;
          }
          99% {
            text-shadow: 0.025em 0.05em 0 #00FF9F, 0.05em 0 0 #00FFFF, 0 -0.05em 0 #FF5C5C;
          }
          100% {
            text-shadow: -0.025em 0 0 #00FFFF, -0.025em -0.025em 0 #FF5C5C, -0.025em -0.05em 0 #00FF9F;
          }
        }
      `}</style>
    </div>
  );
}
