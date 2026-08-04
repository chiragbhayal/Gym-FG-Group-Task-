import React from 'react';

const galleryImages = [
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
  'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=600',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600',
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-[#0b0f19] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-orange-500 font-extrabold text-sm uppercase tracking-widest">Our Gallery</h2>
          <p className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Take A Virtual Tour Of Our Premium Fitness Facility
          </p>
          <div className="w-16 h-1 bg-gradient-custom mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border border-gray-900 group aspect-video"
            >
              <img
                src={src}
                alt={`Gym Facility ${index + 1}`}
                className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
