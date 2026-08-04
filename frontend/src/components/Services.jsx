import React from 'react';
import { Dumbbell, Zap, Activity, ShieldAlert, Sparkles, Eye } from 'lucide-react';

const servicesData = [
  {
    title: 'Strength Training',
    description: 'Build robust skeletal muscle mass and functional power with specialized free-weight, machine, and powerlifting coaching sessions.',
    icon: Dumbbell
  },
  {
    title: 'Cardiovascular Conditioning',
    description: 'Boost endurance and dynamic calorie burning with advanced treadmill routines, rowing machines, and high-intensity interval training (HIIT).',
    icon: Zap
  },
  {
    title: 'Personal Coaching',
    description: 'Work one-on-one with professional trainers who customize meal guides, monitor alignment, and design periodic gym schedules.',
    icon: Activity
  },
  {
    title: 'Yoga & Flexibility',
    description: 'Align mental stress, core muscle balance, and skeletal flexibility with our relaxing, professional yoga classes.',
    icon: Sparkles
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-[#070b12] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-orange-500 font-extrabold text-sm uppercase tracking-widest">Our Services</h2>
          <p className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Comprehensive Programs Tailored To Your Needs
          </p>
          <div className="w-16 h-1 bg-gradient-custom mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-[#0b0f19] border border-gray-900 p-8 rounded-2xl hover:border-orange-500/30 transition-all hover:-translate-y-2 group"
              >
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
