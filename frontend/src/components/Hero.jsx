import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-[#070b12] overflow-hidden min-h-[85vh] flex items-center">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-[120px] opacity-15"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/25 rounded-full px-3 py-1 text-sm font-semibold text-orange-400">
            <Activity className="h-4 w-4" />
            <span>NO PAIN, NO GAIN</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight uppercase">
            Build Your <br />
            <span className="text-gradient">Ultimate Body</span> <br />
            Transform Life
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-xl leading-relaxed">
            FlexFit offers state-of-the-art training Fitness With Gomzi, customized fitness plans, elite coaching, and premium supplements to help you smash your physical goals.
            Start your fitness transformation today.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/inquiry"
              className="bg-gradient-custom hover-gradient text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center space-x-2"
            >
              <span>Start Gym Inquiry</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <a
              href="#plans"
              className="bg-gray-900 border border-gray-800 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-xl transition-all"
            >
              View Membership Plans
            </a>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-lg md:max-w-none">
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800"
              alt="Gym Athlete Training"
              className="w-full h-[400px] object-cover scale-105 hover:scale-100 transition-all duration-700"
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-transparent"></div>
            
            {/* Quick stats floating badge */}
            <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-xl flex justify-around text-center">
              <div>
                <p className="text-orange-500 text-2xl font-black">10k+</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Members</p>
              </div>
              <div className="border-r border-gray-800"></div>
              <div>
                <p className="text-orange-500 text-2xl font-black">50+</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Elite Trainers</p>
              </div>
              <div className="border-r border-gray-800"></div>
              <div>
                <p className="text-orange-500 text-2xl font-black">150+</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Equipments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
