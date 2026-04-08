import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MemoryGallery() {
  const memories = [
    {
      image: 'https://images.unsplash.com/photo-1762325658255-04a9b1861b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcG9sYXJvaWQlMjBtZW1vcmllc3xlbnwxfHx8fDE3NzQ5NDA2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Main Character Energy',
      rotation: -2
    },
    {
      image: 'https://images.unsplash.com/photo-1622107795650-24e72a695404?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNlbGVicmF0aW9uJTIwc3BhcmtsZXN8ZW58MXx8fHwxNzc0OTQwNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Certified Icon',
      rotation: 3
    },
    {
      image: 'https://images.unsplash.com/photo-1669815581131-429ca54853e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBnb2xkZW4lMjBzdW5zZXR8ZW58MXx8fHwxNzc0OTQwNjYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Unforgettable Moments',
      rotation: -3
    },
    {
      image: 'https://images.unsplash.com/photo-1670659439205-e91d076e3d76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzQ5NDA2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Pure Excellence',
      rotation: 2
    }
  ];

  return (
    <section className="bg-gradient-to-b from-[#F8F5F2] to-[#FFE8D6] py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-bold text-[#2a1a1a] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Memory Gallery
          </h2>
          <p className="text-lg text-gray-600">
            A collection of legendary moments
          </p>
        </motion.div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {memories.map((memory, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: memory.rotation }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 0, 
                zIndex: 10,
                transition: { duration: 0.2 }
              }}
              className="relative group cursor-pointer"
            >
              {/* Polaroid frame */}
              <div className="bg-white p-4 pb-12 shadow-xl rounded-lg">
                <div className="relative overflow-hidden rounded-sm mb-4 aspect-square">
                  <ImageWithFallback
                    src={memory.image}
                    alt={memory.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center text-sm md:text-base font-medium text-gray-700" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {memory.caption}
                </p>
              </div>

              {/* Tape effect */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 backdrop-blur-sm border border-gray-200 rotate-[-5deg]" />
            </motion.div>
          ))}
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto pb-8 -mx-4 px-4">
          <div className="flex gap-6" style={{ width: 'max-content' }}>
            {memories.map((memory, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
                style={{ 
                  width: '280px',
                  transform: `rotate(${memory.rotation}deg)`
                }}
              >
                {/* Polaroid frame */}
                <div className="bg-white p-4 pb-12 shadow-xl rounded-lg">
                  <div className="relative overflow-hidden rounded-sm mb-4" style={{ height: '280px' }}>
                    <ImageWithFallback
                      src={memory.image}
                      alt={memory.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center text-sm font-medium text-gray-700" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {memory.caption}
                  </p>
                </div>

                {/* Tape effect */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 backdrop-blur-sm border border-gray-200 rotate-[-5deg]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
