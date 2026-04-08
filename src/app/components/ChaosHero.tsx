import { motion } from 'motion/react';
import { AlertTriangle, Zap, TrendingDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChaosHeroProps {
  friendName: string;
  onScrollToNext: () => void;
}

export function ChaosHero({ friendName, onScrollToNext }: ChaosHeroProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1a0a0a] to-[#0D0D0D] relative overflow-hidden">
      {/* Noise overlay */}
      <div className="absolute inset-0 noise opacity-30 pointer-events-none" />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#00FF9F 1px, transparent 1px), linear-gradient(90deg, #00FF9F 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 px-4 py-8 md:py-16 max-w-7xl mx-auto">
        {/* Warning Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#FF5C5C]/20 border-2 border-[#FF5C5C] px-4 py-2 rounded-lg mb-4">
            <AlertTriangle className="text-[#FF5C5C]" size={24} />
            <span className="text-[#FF5C5C] font-bold tracking-wider">SYSTEM ALERT</span>
          </div>
          
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 glitch"
            data-text="⚠ WARNING: ACCESSING CENSORED DATA"
          >
            ⚠ WARNING: ACCESSING CENSORED DATA
          </h1>
          
          <div className="space-y-2 text-gray-400 text-sm md:text-base">
            <p>Subject: <span className="text-[#00FF9F]">{friendName}</span> | Status: <span className="text-[#FF5C5C]">Highly Unstable</span></p>
            <p className="font-mono">Analyzing personality matrix... ERROR 404</p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-12">
          {/* Large featured image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-2 row-span-2 relative group"
          >
            <div className="relative overflow-hidden rounded-2xl border-2 border-[#00FF9F] h-full min-h-[300px] md:min-h-[400px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1765445665844-5d317051b664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGl0Y2glMjBlcnJvciUyMHNjcmVlbnxlbnwxfHx8fDE3NzQ5NDA2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Chaos moment"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                style={{ filter: 'contrast(1.2) saturate(1.5)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-[#FF5C5C] text-white px-3 py-1 rounded-full text-xs font-bold">
                404: Grace Not Found
              </div>
            </div>
          </motion.div>

          {/* Smaller grid items */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-xl border border-[#00FF9F]/50 h-full min-h-[140px] md:min-h-[195px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1669815581131-429ca54853e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBnb2xkZW4lMjBzdW5zZXR8ZW58MXx8fHwxNzc0OTQwNjYyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Moment 2"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                style={{ filter: 'grayscale(0.5) contrast(1.3)' }}
              />
              <div className="absolute top-2 right-2">
                <TrendingDown className="text-[#FF5C5C]" size={20} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-xl border border-[#FF5C5C]/50 h-full min-h-[140px] md:min-h-[195px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1670659439205-e91d076e3d76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzQ5NDA2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Moment 3"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                style={{ filter: 'hue-rotate(290deg) saturate(2)' }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-2 md:col-span-1 relative"
          >
            <div className="bg-[#0D0D0D] border-2 border-[#00FF9F] rounded-xl p-4 h-full flex flex-col justify-center items-center space-y-2">
              <Zap className="text-[#00FF9F] mb-2" size={32} />
              <p className="text-white font-bold text-center">Aura Level</p>
              <p className="text-[#FF5C5C] text-3xl md:text-4xl font-black">0%</p>
              <p className="text-gray-500 text-xs text-center">System Lag Detected</p>
            </div>
          </motion.div>
        </div>

        {/* More roast tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12"
        >
          {['⚡ Battery: 3%', '🎯 Accuracy: Questionable', '🔥 Vibe Check: Failed', '⏰ Late Mode: ON'].map((tag, i) => (
            <span
              key={i}
              className="bg-[#1a0a0a] border border-[#00FF9F]/30 text-[#00FF9F] px-4 py-2 rounded-full text-xs md:text-sm font-mono"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center"
        >
          <button
            onClick={onScrollToNext}
            className="glow bg-[#00FF9F] text-black px-8 py-4 rounded-full font-bold text-base md:text-lg uppercase tracking-wider hover:bg-[#00FF9F]/90 transition-all pulse"
          >
            🚀 Emergency System Upgrade
          </button>
        </motion.div>
      </div>
    </section>
  );
}
