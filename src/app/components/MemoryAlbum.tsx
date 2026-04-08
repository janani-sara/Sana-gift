import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import confetti from 'canvas-confetti';

interface MemoryAlbumProps {
  onNext: () => void;
  onBack: () => void;
}

// Convert local Data folder paths to public URLs
const albumImages = [
  '/data/albums/IMG_20240629_105927.jpg',
  '/data/albums/IMG_20240629_114123.jpg',
  '/data/albums/IMG_20240921_133439.jpg',
  '/data/albums/IMG_20240921_141936.jpg',
  '/data/albums/IMG_20240921_142144.jpg',
  '/data/albums/IMG_20240921_143152.jpg',
  '/data/albums/IMG_20240921_143305.jpg',
  '/data/albums/IMG_20240921_143314.jpg',
  '/data/albums/IMG_20250423_105127.jpg',
  '/data/albums/IMG_20250424_104551.jpg',
  '/data/albums/IMG_20250424_104552.jpg',
  '/data/albums/IMG_20250424_104554.jpg',
  '/data/albums/IMG_20250928_141624.jpg',
  '/data/albums/IMG-20240629-WA0001.jpg',
  '/data/albums/IMG-20241213-WA0026.jpg',
  '/data/albums/IMG-20241213-WA0032.jpg',
  '/data/albums/IMG-20241213-WA0035.jpg',
  '/data/albums/IMG-20241213-WA0040 (1).jpg',
  '/data/albums/IMG-20241213-WA0048.jpg',
  '/data/albums/IMG-20250510-WA0005.jpg',
  '/data/albums/IMG-20250510-WA0015.jpg',
  '/data/albums/IMG-20250510-WA0017 - Copy.jpg',
  '/data/albums/IMG-20250510-WA0017.jpg',
  '/data/albums/IMG-20250510-WA0019.jpg',
  '/data/albums/IMG-20250831-WA0008.jpg',
  '/data/albums/IMG-20250912-WA0048 - Copy.jpg',
  '/data/albums/IMG-20250831-WA0006.jpg',
  '/data/albums/IMG-20251005-WA0006 - Copy.jpg',
  '/data/albums/IMG-20260330-WA0016.jpg',
  '/data/albums/IMG-20260330-WA0019.jpg',
  '/data/albums/Snapchat-1434696045.jpg',
  '/data/albums/Snapchat-1677613299.jpg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.09 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.11 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.12 AM (1).jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.13 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.14 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.16 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.17 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.18 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.20 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.21 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.23 AM (1).jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.23 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.25 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.26 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.28 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.31 AM (1).jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.31 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.32 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.33 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.34 AM (1).jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.34 AM (2).jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.34 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.35 AM (1).jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.35 AM (2).jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.35 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.36 AM (1).jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.36 AM (2).jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.36 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.37 AM (1).jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.37 AM (2).jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.37 AM.jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.38 AM (1).jpeg',
  '/data/albums/WhatsApp Image 2026-04-02 at 11.46.38 AM.jpeg',
];

const memories = [
  "Every moment with you is a treasure 💎",
  "The laughter we share is priceless 😄",
  "Adventures together, memories forever 🌟",
  "Through thick and thin, always together 🤝",
  "Creating beautiful moments, one day at a time ✨",
  "Life is better with you in it 💕",
  "Cherishing every second we spend together 🥰",
  "The best times are with you 🌈",
];

export function MemoryAlbum({ onNext, onBack }: MemoryAlbumProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const imagesPerSlide = 6;
  const totalSlides = Math.ceil(albumImages.length / imagesPerSlide);

  useEffect(() => {
    // Gentle confetti on page load
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF69B4', '#D4AF37'],
    });
  }, []);

  const handleLike = (index: number) => {
    const newLiked = new Set(likedImages);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FF69B4', '#FFD700'],
      });
    }
    setLikedImages(newLiked);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideImages = () => {
    const start = currentSlide * imagesPerSlide;
    return albumImages.slice(start, start + imagesPerSlide);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FFF5E1] via-[#FFE4E1] to-[#FFF0F5] overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            animate={{
              y: ['100%', '-20%'],
              x: [0, Math.sin(i) * 100],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          >
            💝
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
          className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border-2 border-[#FF69B4] text-[#FF69B4] rounded-full hover:bg-[#FF69B4] hover:text-white transition-colors z-20"
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
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl md:text-7xl font-black bg-gradient-to-r from-[#FF69B4] via-[#FFD700] to-[#FF69B4] bg-clip-text text-transparent mb-4"
            >
              Our Beautiful Memories 📸
            </motion.h1>
            <p className="text-2xl md:text-3xl font-bold text-[#FF1493]">
              Sathana, reliving the best moments together! ✨
            </p>
          </motion.div>

          {/* Memory Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-[#FFD700]">
              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xl md:text-2xl text-center font-semibold text-gray-700 italic"
              >
                "{memories[currentSlide % memories.length]}"
              </motion.p>
            </div>
          </motion.div>

          {/* Photo Gallery Slider */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="relative">
              {/* Navigation buttons */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white/90 p-3 rounded-full shadow-xl hover:bg-[#FFD700] hover:scale-110 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#FF69B4]" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white/90 p-3 rounded-full shadow-xl hover:bg-[#FFD700] hover:scale-110 transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-[#FF69B4]" />
                  </button>
                </>
              )}

              {/* Photo Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {getCurrentSlideImages().map((img, idx) => {
                    const globalIdx = currentSlide * imagesPerSlide + idx;
                    return (
                      <motion.div
                        key={globalIdx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative group"
                      >
                        <div
                          onClick={() => setSelectedImage(globalIdx)}
                          className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-[#FFD700] cursor-pointer transform transition-all hover:scale-105 hover:rotate-2"
                        >
                          <ImageWithFallback
                            src={img}
                            alt={`Memory ${globalIdx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Like button */}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(globalIdx);
                          }}
                          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-lg z-10"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              likedImages.has(globalIdx)
                                ? 'fill-[#FF69B4] text-[#FF69B4]'
                                : 'text-gray-400'
                            }`}
                          />
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Slide indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {[...Array(totalSlides)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-3 rounded-full transition-all ${
                      idx === currentSlide
                        ? 'w-12 bg-[#FF69B4]'
                        : 'w-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-[#FF69B4] to-[#FF1493] rounded-2xl p-6 text-center text-white shadow-xl">
                <div className="text-4xl font-black">{albumImages.length}</div>
                <div className="text-sm font-semibold mt-2">Memories</div>
              </div>
              <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl p-6 text-center text-white shadow-xl">
                <div className="text-4xl font-black">{likedImages.size}</div>
                <div className="text-sm font-semibold mt-2">Favorites</div>
              </div>
              <div className="bg-gradient-to-br from-[#9D00FF] to-[#C955FF] rounded-2xl p-6 text-center text-white shadow-xl">
                <div className="text-4xl font-black">∞</div>
                <div className="text-sm font-semibold mt-2">More to Come</div>
              </div>
            </div>
          </motion.div>

          {/* Next button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FF69B4] to-[#FFD700] text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-[#FF69B4]/50 transition-all"
            >
              <span>Time for Final Wishes</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
              onClick={() => setSelectedImage(null)}
            />
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-4xl"
            >
              <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-[#FF69B4] rounded-full flex items-center justify-center hover:bg-[#FF1493] transition-colors shadow-xl"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <ImageWithFallback
                  src={albumImages[selectedImage]}
                  alt={`Memory ${selectedImage + 1}`}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                />
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold text-gray-700">
                    Memory {selectedImage + 1} of {albumImages.length}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
