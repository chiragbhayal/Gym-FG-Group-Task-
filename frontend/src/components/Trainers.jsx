import React from 'react';
import { Dumbbell, Instagram, Twitter } from 'lucide-react';

const trainers = [
  {
    name: 'Alex Rivera',
    role: 'Strength & Conditioning Specialist',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
    bio: 'Former competitive powerlifter with over 8 years experience helping clients build absolute raw power.'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Nutrition & Body Recomposition Coach',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600',
    bio: 'Specializes in fat loss, muscle gain dietary strategies, and high-intensity interval training (HIIT).'
  },
  {
    name: 'Marcus Chen',
    role: 'Mobility & Calisthenics Master',
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=600',
    bio: 'Dedicated to helping individuals achieve functional strength, flexibility, and core structural stability.'
  }
];

const Trainers = () => {
  return (
    <section id="trainers" className="py-24 bg-[#070b12] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-orange-500 font-extrabold text-sm uppercase tracking-widest">Our Trainers</h2>
          <p className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Meet Our Team of Elite Strength Coaches
          </p>
          <div className="w-16 h-1 bg-gradient-custom mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="bg-[#0b0f19] border border-gray-900 rounded-2xl overflow-hidden shadow-lg group hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="relative overflow-hidden h-[300px]">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent"></div>
              </div>

              <div className="p-6 space-y-3">
                <span className="inline-flex items-center space-x-1 bg-orange-500/15 border border-orange-500/20 text-orange-400 rounded-md px-2.5 py-0.5 text-xs font-bold uppercase">
                  <Dumbbell className="h-3 w-3" />
                  <span>{trainer.role}</span>
                </span>

                <h3 className="text-xl font-bold text-white uppercase tracking-wide mt-2">{trainer.name}</h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {trainer.bio}
                </p>

                <div className="flex space-x-4 pt-2 text-gray-500">
                  <span className="hover:text-orange-500 cursor-pointer transition-colors">
                    <Instagram className="h-5 w-5" />
                  </span>
                  <span className="hover:text-orange-500 cursor-pointer transition-colors">
                    <Twitter className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
