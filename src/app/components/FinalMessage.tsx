import { motion } from 'motion/react';
import { Heart, Star, Sparkles } from 'lucide-react';

interface FinalMessageProps {
  friendName: string;
}

export function FinalMessage({ friendName }: FinalMessageProps) {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F8F5F2] via-[#FFE8D6] to-[#D4AF37]/20 relative overflow-hidden flex items-center justify-center py-16 px-4">
      {/* Floating sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        >
          {i % 3 === 0 ? (
            <Star className="text-[#D4AF37]" size={20 + Math.random() * 20} fill="currentColor" />
          ) : i % 3 === 1 ? (
            <Sparkles className="text-[#FFD700]" size={20 + Math.random() * 20} />
          ) : (
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
          )}
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Decorative top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="inline-block">
              <div className="flex items-center gap-3">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <Sparkles className="text-[#D4AF37]" size={32} />
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Main message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#2a1a1a] mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              From chaos to charm,<br />
              <span className="text-[#D4AF37]">you've always been</span><br />
              unforgettable
            </h2>

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className="text-6xl md:text-8xl my-8"
            >
              💫
            </motion.div>

            <p className="text-2xl md:text-3xl text-[#2a1a1a] font-medium mb-4">
              Happy Birthday, {friendName}!
            </p>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Here's to another year of being absolutely legendary.
              May your day be as extraordinary as you are. 🎉
            </p>
          </motion.div>

          {/* Decorative hearts */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4 mb-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                <Heart 
                  className="text-[#D4AF37]" 
                  size={24 + i * 4} 
                  fill={i % 2 === 0 ? "currentColor" : "none"}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Date stamp */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            viewport={{ once: true }}
            className="inline-block bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-[#D4AF37] shadow-lg"
          >
            <p className="text-sm text-gray-700 font-medium">
              March 31, 2026 • A Day to Remember
            </p>
          </motion.div>

          {/* Bottom decorative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-12"
          >
            <div className="inline-block">
              <div className="flex items-center gap-3">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <span className="text-3xl">✨</span>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Small signature */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            viewport={{ once: true }}
            className="mt-8 text-sm text-gray-500 italic"
          >
            Made with ♥ for someone truly special
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#D4AF37]/10 to-transparent pointer-events-none" />
    </section>
  );
}
