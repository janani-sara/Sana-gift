import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft } from 'lucide-react';

interface Question2Props {
  onNext: () => void;
  onBack: () => void;
}

export function Question2({ onNext, onBack }: Question2Props) {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const wrongAnswers = [
    "❌ ERROR 404: Correct Answer Not Found! 😂",
    "⚠️ SYSTEM ALERT: Bad Choice Detected! 🚨",
    "💥 WRONG! Try again, genius! 😜",
    "🔥 NOPE! That ain't it! 🤦",
  ];

  const handleWrongAnswer = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
  };

  const closeError = () => {
    setShowError(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1a0a2e] via-[#00FF9F]/20 to-[#1a0a2e] overflow-hidden">
      {/* Floating emojis */}
      <div className="absolute inset-0 pointer-events-none">
        {['🎂', '🎉', '🎊', '🔥', '😈', '😂'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {emoji}
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
          className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-[#00FF9F] text-[#00FF9F] rounded-full hover:bg-[#00FF9F]/20 transition-colors z-20"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back</span>
        </motion.button>

        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-3xl w-full">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white mb-6 text-center"
            >
              Question 2
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-4xl text-[#00FF9F] mb-12 font-bold leading-relaxed text-center"
            >
              What's Sathana's BEST quality? 🤔
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWrongAnswer(wrongAnswers[0])}
                className="p-6 bg-gradient-to-r from-[#FF5C5C] to-[#FF8C8C] text-white font-bold text-lg rounded-2xl shadow-lg border-2 border-white/20 hover:shadow-2xl transition-all"
              >
                Her Punctuality ⏰
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWrongAnswer(wrongAnswers[1])}
                className="p-6 bg-gradient-to-r from-[#00FF9F] to-[#00FFCC] text-black font-bold text-lg rounded-2xl shadow-lg border-2 border-white/20 hover:shadow-2xl transition-all"
              >
                Her Cooking Skills 👨‍🍳
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWrongAnswer(wrongAnswers[2])}
                className="p-6 bg-gradient-to-r from-[#9D00FF] to-[#C955FF] text-white font-bold text-lg rounded-2xl shadow-lg border-2 border-white/20 hover:shadow-2xl transition-all"
              >
                Her Organization 📋
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="p-6 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold text-lg rounded-2xl shadow-lg border-2 border-white/20 hover:shadow-2xl transition-all"
              >
                Her Amazing Energy! ⚡✨
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-400 mt-8 text-center text-sm"
            >
              Choose wisely... or face the consequences! 😈
            </motion.p>
          </div>
        </div>
      </div>

      {/* Error Popup */}
      <AnimatePresence>
        {showError && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={closeError}
            />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
            >
              <div className="bg-gradient-to-br from-[#FF5C5C] to-[#FF1744] p-8 rounded-3xl shadow-2xl border-4 border-white relative">
                <button
                  onClick={closeError}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="text-6xl mb-4 text-center"
                >
                  ⚠️
                </motion.div>

                <h3 className="text-3xl font-black text-white mb-4 text-center">
                  {errorMessage}
                </h3>

                <p className="text-white/90 text-center text-lg mb-6">
                  That's not it! Try again, bestie! 😜
                </p>

                <button
                  onClick={closeError}
                  className="w-full py-4 bg-white text-[#FF5C5C] font-bold text-xl rounded-full hover:bg-gray-100 transition-colors"
                >
                  OK, I'll Try Again! 🎯
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}