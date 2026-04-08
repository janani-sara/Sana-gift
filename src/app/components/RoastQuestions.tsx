import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface RoastQuestionsProps {
  friendName: string;
  onNext: () => void;
  onBack: () => void;
}

const roastQuestions = [
  "Hey Sathana, remember when you said \"I'll be there in 5 minutes\"? Yeah, we're still waiting... ⏰😂",
  "Sathana, your selfie game is so strong, even your phone asks for a break! 📸💪",
  "If procrastination was an Olympic sport, Sathana would definitely... show up late to the competition! 🏅😴",
  "Sathana's cooking: Where smoke alarms go to fulfill their life's purpose! 🔥👨‍🍳",
  "Sathana has a special talent: Making 2 minutes into 2 hours when getting ready! ⏳✨",
];

export function RoastQuestions({ friendName, onNext, onBack }: RoastQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const questions = roastQuestions;

  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
    let currentIndex = 0;
    const text = questions[currentQuestion];

    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 50); // Typing speed

    return () => clearInterval(typeInterval);
  }, [currentQuestion, questions]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(0,255,159,0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(255,92,92,0.1) 0%, transparent 70%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
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

        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl w-full">
            {/* Progress indicator */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex justify-center gap-3">
                {questions.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentQuestion 
                        ? 'w-16 bg-[#00FF9F]' 
                        : idx < currentQuestion
                        ? 'w-12 bg-[#00FF9F]/50'
                        : 'w-8 bg-white/20'
                    }`}
                    animate={{
                      scale: idx === currentQuestion ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 1,
                      repeat: idx === currentQuestion ? Infinity : 0,
                    }}
                  />
                ))}
              </div>
              <p className="text-center text-white/60 mt-4 text-sm">
                Roast {currentQuestion + 1} of {questions.length}
              </p>
            </motion.div>

            {/* Roast Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-[#FF5C5C] rounded-3xl p-8 md:p-12 shadow-2xl shadow-[#FF5C5C]/20 mb-8"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-6"
                  >
                    🔥
                  </motion.div>

                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                    {displayedText}
                    {isTyping && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="ml-2"
                      >
                        |
                      </motion.span>
                    )}
                  </h2>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isTyping ? 0.5 : 1, y: 0 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: isTyping ? 1 : 1.1 }}
                whileTap={{ scale: isTyping ? 1 : 0.95 }}
                onClick={handleNext}
                disabled={isTyping}
                className={`group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-xl shadow-2xl transition-all ${
                  isTyping
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#FF5C5C] to-[#00FF9F] text-white hover:shadow-[#00FF9F]/50'
                }`}
              >
                <span>
                  {currentQuestion < questions.length - 1 ? 'Next Roast' : "Let's Move On"}
                </span>
                <ArrowRight className={`w-6 h-6 ${!isTyping && 'group-hover:translate-x-2'} transition-transform`} />
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center text-[#00FF9F] mt-8 text-lg"
            >
              Just kidding, {friendName}! You know we love you! 💚😘
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}