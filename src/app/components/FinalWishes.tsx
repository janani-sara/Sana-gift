import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, Star, Heart, Gift, Cake, PartyPopper } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import confetti from 'canvas-confetti';

interface FinalWishesProps {
  onBack: () => void;
}

const wishImages = [
  '/data/wishes/IMG-20250831-WA0006.jpg',
  '/data/wishes/IMG-20250912-WA0048 - Copy.jpg',
];

const wishes = [
  "May your birthday be as amazing as you are! 🎂",
  "Here's to another year of incredible adventures! 🌟",
  "Wishing you endless joy, laughter, and love! 💕",
  "May all your dreams come true this year! ✨",
  "You deserve all the happiness in the world! 🌈",
  "Cheers to the most wonderful person I know! 🥳",
  "May your year be filled with magical moments! 🎪",
  "Here's to your brightest year yet! 💫",
];

const quotes = [
  {
    text: "Age is merely the number of years the world has been enjoying you.",
    author: "Abdul Raheem K"
  },
  {
    text: "Count your life by smiles, not tears. Count your age by friends, not years.",
    author: "Abdul Raheem K"
  },
  {
    text: "The more you praise and celebrate your life, the more there is in life to celebrate.",
    author: "Abdul Raheem K"
  },
  {
    text: "Today you are you! That is truer than true! There is no one alive who is you-er than you!",
    author: "Abdul Raheem K"
  },
];

export function FinalWishes({ onBack }: FinalWishesProps) {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentWishImage, setCurrentWishImage] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const wishInterval = setInterval(() => {
      setCurrentWishImage((prev) => (prev + 1) % wishImages.length);
    }, 6000);

    return () => clearInterval(wishInterval);
  }, []);

  useEffect(() => {
    // Epic confetti on load
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#FFD700', '#FFA500', '#FF69B4', '#D4AF37', '#FF1493'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#FFD700', '#FFA500', '#FF69B4', '#D4AF37', '#FF1493'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Change quotes periodically
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);

    // Random confetti bursts
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: ['#FFD700', '#FFA500', '#FF69B4', '#D4AF37'],
      });
    }, 5000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(confettiInterval);
    };
  }, []);

  const triggerFireworks = () => {
    setShowFireworks(true);
    setClickCount(prev => prev + 1);

    // Multiple firework bursts
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 160,
          origin: { x: Math.random(), y: Math.random() * 0.5 },
          colors: ['#FFD700', '#FFA500', '#FF69B4', '#D4AF37', '#FF1493', '#00FF9F'],
        });
      }, i * 300);
    }

    setTimeout(() => setShowFireworks(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Star className="w-4 h-4 text-[#FFD700]" fill="#FFD700" />
          </motion.div>
        ))}
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[Gift, Heart, Sparkles, Cake, PartyPopper].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: ['100%', '-20%'],
              rotate: [0, 360],
              x: [0, Math.sin(i * 2) * 100],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
            style={{
              left: `${(i * 20) % 100}%`,
            }}
          >
            <Icon className="w-12 h-12 text-[#FFD700] opacity-20" />
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
          className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border-2 border-[#FFD700] text-[#FFD700] rounded-full hover:bg-[#FFD700] hover:text-black transition-colors z-20"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back</span>
        </motion.button>

        <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
          {/* Main Title */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1.5, bounce: 0.5 }}
            className="text-center mb-12"
          >
            <motion.h1
              animate={{
                scale: [1, 1.1, 1],
                textShadow: [
                  '0 0 20px #FFD700',
                  '0 0 60px #FFD700, 0 0 80px #FF69B4',
                  '0 0 20px #FFD700',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF69B4] to-[#FFD700] mb-6"
            >
              Happy Birthday
            </motion.h1>
            <motion.h2
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-5xl md:text-7xl font-black text-white"
            >
              SATHANA! 🎉
            </motion.h2>
          </motion.div>

          {/* Animated wish background */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative mb-12 max-w-5xl w-full h-[420px] rounded-[2.5rem] overflow-hidden border-4 border-[#FFD700] shadow-2xl"
          >
            {wishImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  opacity: currentWishImage === idx ? 1 : 0,
                  scale: currentWishImage === idx ? 1.05 : 1,
                  filter: currentWishImage === idx ? 'blur(0px)' : 'blur(2px)',
                }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${encodeURI(img)}")` } }
              />
            ))}

            <motion.div
              animate={{ opacity: [0.5, 0.75, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-black/35"
            />

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="max-w-3xl"
              >
                <p className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.6)] mb-4">
                  Wishes with a magical background
                </p>
                <p className="text-lg md:text-xl text-[#FFD700] font-semibold">
                  The pictures behind you will shift every few seconds,
                  creating a lively birthday atmosphere.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Wishes Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl w-full mb-12"
          >
            {wishes.map((wish, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
                className="bg-gradient-to-br from-[#FFD700]/20 to-[#FF69B4]/20 backdrop-blur-xl border-2 border-[#FFD700] rounded-2xl p-6 shadow-xl"
              >
                <motion.p
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  className="text-white text-lg font-semibold text-center"
                >
                  {wish}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="max-w-3xl w-full mb-12"
          >
            <div className="bg-white/10 backdrop-blur-xl border-2 border-[#FFD700] rounded-3xl p-8 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <Sparkles className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
                  <p className="text-2xl md:text-3xl font-bold text-white mb-4 italic">
                    "{quotes[currentQuote].text}"
                  </p>
                  <p className="text-lg text-[#FFD700] font-semibold">
                    - {quotes[currentQuote].author}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Interactive Celebration Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: 'spring', bounce: 0.6 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  '0 0 20px #FFD700',
                  '0 0 60px #FFD700, 0 0 80px #FF69B4',
                  '0 0 20px #FFD700',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={triggerFireworks}
              className="px-12 py-6 bg-gradient-to-r from-[#FFD700] via-[#FF69B4] to-[#FFD700] text-white font-black text-2xl rounded-full shadow-2xl"
            >
              🎆 Celebrate! 🎆
            </motion.button>
            
            {clickCount > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#FFD700] mt-4 font-semibold"
              >
                You've celebrated {clickCount} time{clickCount > 1 ? 's' : ''}! 🎉
              </motion.p>
            )}
          </motion.div>

          {/* Final Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-16 text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block"
            >
              <p className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF69B4] to-[#FFD700]">
                Have the Most Amazing Birthday Ever! 💖✨🎂
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Fireworks overlay */}
      <AnimatePresence>
        {showFireworks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  scale: 0,
                  x: '50vw',
                  y: '50vh',
                }}
                animate={{
                  opacity: [1, 0],
                  scale: [0, 2],
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  backgroundColor: ['#FFD700', '#FF69B4', '#00FF9F', '#FFA500'][
                    Math.floor(Math.random() * 4)
                  ],
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
