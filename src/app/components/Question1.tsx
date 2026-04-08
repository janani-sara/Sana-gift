import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface Question1Props {
  onNext: () => void;
  onBack: () => void;
}

export function Question1({ onNext, onBack }: Question1Props) {
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveButton = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const maxX = container.width - 150; // button width
    const maxY = container.height - 60; // button height
    
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    
    setButtonPos({ x: newX, y: newY });
    setAttempts(prev => prev + 1);
  };

  useEffect(() => {
    if (attempts >= 5) {
      setTimeout(() => {
        onNext();
      }, 1000);
    }
  }, [attempts, onNext]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1a0a2e] via-[#FF5C5C]/20 to-[#1a0a2e] overflow-hidden">
      {/* Background chaos */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-[#FF5C5C] rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-[#00FF9F] text-[#00FF9F] rounded-full hover:bg-[#00FF9F]/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back</span>
        </motion.button>

        <div ref={containerRef} className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-2xl w-full text-center">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white mb-6"
            >
              Question 1
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-4xl text-[#00FF9F] mb-12 font-bold leading-relaxed"
            >
              Are you girl ?
            </motion.p>

            {attempts > 0 && (
              <motion.p
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xl text-[#FF5C5C] mb-8 font-semibold"
              >
                Nice try! Attempt {attempts}/1 😂
              </motion.p>
            )}

            {attempts >= 10 && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl text-[#00FF9F] mb-8 font-bold"
              >
                Fine! You win! Moving on... 😤
              </motion.p>
            )}

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative min-h-[200px]">
              {/* YES button (runs away) */}
              <motion.button
                ref={yesButtonRef}
                animate={{ x: buttonPos.x, y: buttonPos.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={moveButton}
                onTouchStart={moveButton}
                className="px-8 py-4 bg-[#00FF9F] text-black font-bold text-xl rounded-full shadow-lg shadow-[#00FF9F]/50 hover:shadow-2xl transition-shadow cursor-pointer"
              >
                YES! 😈
              </motion.button>

              {/* NO button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-8 py-4 bg-[#FF5C5C] text-white font-bold text-xl rounded-full shadow-lg shadow-[#FF5C5C]/50 hover:shadow-2xl transition-all"
              >
                NO WAY! 😱
              </motion.button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-400 mt-8 text-sm"
            >
              (Hint: The YES button is shy... catch it if you can! 😏)
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}