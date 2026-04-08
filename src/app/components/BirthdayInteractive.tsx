import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Cake, Heart, Sparkles, Star, ArrowRight, ArrowLeft, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayInteractiveProps {
  friendName: string;
  onNext: () => void;
  onBack: () => void;
}

// Beautiful images for this page
const beautifulImages = [
  '/data/beautiful/IMG_20240921_133439.jpg',
  '/data/beautiful/IMG-20250510-WA0015.jpg',
  '/data/beautiful/IMG-20250510-WA0017.jpg',
  '/data/beautiful/IMG-20250831-WA0006.jpg',
];

export function BirthdayInteractive({ friendName, onNext, onBack }: BirthdayInteractiveProps) {
  const [cakeClicks, setCakeClicks] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFD700', '#FFA500', '#FF69B4'],
    });
  };

  const handleCakeClick = () => {
    setCakeClicks(prev => prev + 1);
    triggerConfetti();

    if (cakeClicks + 1 >= 3) {
      setShowMessage(true);
    }
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newHeart = { id: Date.now(), x, y };
    setHearts(prev => [...prev, newHeart]);

    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#FFD700'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF37', '#FFD700'],
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#F8F5F2] via-[#FFE5B4] to-[#F8F5F2] overflow-hidden">
      {/* Floating golden particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: ['-100%', '100%'],
              x: [Math.random() * 50 - 25, Math.random() * 50 - 25],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          >
            <Star className="w-4 h-4 text-[#D4AF37]" fill="#D4AF37" />
          </motion.div>
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
          className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border-2 border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors z-20"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back</span>
        </motion.button>

        <div className="flex-1 px-4 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.h1
              animate={{ 
                scale: [1, 1.05, 1],
                textShadow: [
                  '0 0 20px #D4AF37',
                  '0 0 40px #D4AF37',
                  '0 0 20px #D4AF37',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl md:text-7xl font-black text-[#D4AF37] mb-4"
            >
              Time to Celebrate! 🎉
            </motion.h1>
            <p className="text-2xl md:text-3xl font-bold text-gray-700">
              {friendName}, You're Absolutely Amazing! ✨
            </p>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {beautifulImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? 5 : -5, zIndex: 10 }}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-[#D4AF37]"
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${friendName} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/50 to-transparent" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Section */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Cake Clicking Game */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-[#D4AF37] relative overflow-hidden"
                onClick={handleHeartClick}
              >
                {hearts.map(heart => (
                  <motion.div
                    key={heart.id}
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{ 
                      opacity: 0, 
                      scale: 2,
                      y: -100 
                    }}
                    transition={{ duration: 2 }}
                    className="absolute pointer-events-none"
                    style={{ left: heart.x, top: heart.y }}
                  >
                    <Heart className="w-8 h-8 text-[#FF69B4]" fill="#FF69B4" />
                  </motion.div>
                ))}

                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-8xl mb-4 cursor-pointer"
                    onClick={handleCakeClick}
                  >
                    🎂
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Blow the Candles!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Click the cake {3 - cakeClicks > 0 ? `${3 - cakeClicks} more time${3 - cakeClicks > 1 ? 's' : ''}` : '🎉'}
                  </p>
                  <div className="flex gap-2 justify-center">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          scale: i < cakeClicks ? [1, 1.3, 1] : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-4 h-4 rounded-full ${
                          i < cakeClicks ? 'bg-[#D4AF37]' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Music & Dance */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-[#D4AF37]"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-8xl mb-4"
                  >
                    🎵
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Party Time!
                  </h3>
                  <div className="space-y-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center justify-center gap-3 text-4xl"
                    >
                      <span>💃</span>
                      <span>🕺</span>
                      <span>🎉</span>
                    </motion.div>
                    <p className="text-gray-600 text-lg font-medium">
                      Dance like nobody's watching!
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Special Message */}
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-3xl p-8 shadow-2xl text-center mb-8"
              >
                <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  You Did It, {friendName}! 🎊
                </h2>
                <p className="text-xl text-white/90 mb-4">
                  Now let's look at some amazing memories! 📸✨
                </p>
              </motion.div>
            )}

            {/* Next Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-[#D4AF37]/50 transition-all"
              >
                <span>See Our Memories</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}