import { motion } from 'motion/react';
import { Music, Play } from 'lucide-react';

export function SoundtrackSection() {
  return (
    <section className="bg-gradient-to-b from-[#FFE8D6] to-[#F8F5F2] py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2
            className="text-3xl md:text-5xl font-bold text-[#2a1a1a] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Every masterpiece needs a theme song 🎵
          </h2>
          <p className="text-gray-600">Your birthday anthem awaits</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Spotify-style card */}
          <div className="bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-3xl p-8 md:p-12 shadow-2xl glass border-2 border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* Album art placeholder */}
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                <Music className="text-white" size={60} />
              </div>

              {/* Track info */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-white/80 text-sm mb-2">NOW PLAYING</p>
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                  Birthday Celebration Mix
                </h3>
                <p className="text-white/70 text-sm md:text-base mb-4">
                  Curated just for you ✨
                </p>

                {/* Player controls */}
                <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                    <Play className="text-[#1DB954] ml-1" size={20} fill="currentColor" />
                  </button>
                  
                  {/* Progress bar */}
                  <div className="flex-1 max-w-xs">
                    <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>
                    <div className="flex justify-between text-white/60 text-xs mt-1">
                      <span>1:23</span>
                      <span>3:45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-white/80 text-sm text-center md:text-left">
                💡 <span className="italic">Replace this with your actual Spotify playlist embed or favorite song</span>
              </p>
            </div>
          </div>

          {/* Floating music notes */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-6 -right-6 text-6xl"
          >
            🎵
          </motion.div>

          <motion.div
            animate={{
              y: [10, -10, 10],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -bottom-6 -left-6 text-5xl"
          >
            🎶
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
