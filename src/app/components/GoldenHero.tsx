import { motion } from 'motion/react';
import { Sparkles, Crown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GoldenHeroProps {
  friendName: string;
}

export function GoldenHero({ friendName }: GoldenHeroProps) {
  return (
    <section className="min-h-screen bg-[#F8F5F2] relative overflow-hidden py-12 md:py-20 px-4">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-[#D4AF37]/20 float">
        <Sparkles size={60} />
      </div>
      <div className="absolute bottom-20 right-10 text-[#D4AF37]/20 float" style={{ animationDelay: '1s' }}>
        <Crown size={60} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-white px-6 py-2 rounded-full text-sm font-semibold">
              ✨ Now Loading: Excellence
            </div>
          </motion.div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 text-[#2a1a1a]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {friendName}:<br />
            <span className="text-[#D4AF37]">The Masterpiece</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Some upgrades are truly worth it.
          </p>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto mb-12"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1670659439205-e91d076e3d76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzQ5NDA2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt={`${friendName} - Golden era`}
              className="w-full h-[400px] md:h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 to-transparent" />
            
            {/* Floating badges */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
            >
              <span className="text-sm font-bold text-[#D4AF37]">✨ Main Character Energy</span>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
            >
              <span className="text-sm font-bold text-[#D4AF37]">👑 Certified Icon</span>
            </motion.div>
          </div>

          {/* Decorative frame corners */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-[#D4AF37] rounded-tl-lg" />
          <div className="absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-[#D4AF37] rounded-tr-lg" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 border-[#D4AF37] rounded-bl-lg" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-[#D4AF37] rounded-br-lg" />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto"
        >
          {[
            { label: 'Aura Level', value: '100%', icon: '✨' },
            { label: 'Vibe Status', value: 'Elite', icon: '🔥' },
            { label: 'Icon Rank', value: 'S-Tier', icon: '👑' }
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 md:p-6 shadow-lg text-center border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all hover:scale-105"
            >
              <div className="text-3xl md:text-4xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
