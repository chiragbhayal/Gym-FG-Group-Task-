import React from 'react';
import { Award, Shield, Zap, Target } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#0b0f19] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-orange-500 font-extrabold text-sm uppercase tracking-widest">About Our Gym</h2>
          <p className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            We Are The Ultimate Arena For Your Body Transformation
          </p>
          <div className="w-16 h-1 bg-gradient-custom mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white leading-tight">
              Unlock Your Ultimate Potential With Premium Fitness Resources
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Founded in 2015, FlexFit has grown to become the premier training hub for fitness enthusiasts, powerlifters, bodybuilders, and everyday athletes. We believe that true fitness is not just about physical strength, but building a resilient mind.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our gym features certified master trainers, customized goal tracking, top-tier lifting rigs, and a comprehensive supplement dispensary. We do not just build workouts; we nurture lifestyles.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Goal-Oriented Plans</h4>
                  <p className="text-xs text-gray-500 mt-1">Workouts built directly to align with your personal body target.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Safe Environment</h4>
                  <p className="text-xs text-gray-500 mt-1">High hygiene standards and well-maintained equipment.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">High Energy Vibe</h4>
                  <p className="text-xs text-gray-500 mt-1">Pumping soundtracks and supportive, motivating community.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Certified Coaching</h4>
                  <p className="text-xs text-gray-500 mt-1">Guaranteed guidance from certified, champion personal trainers.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600"
                alt="Yoga Training"
                className="w-full h-64 object-cover rounded-xl border border-gray-800"
              />
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600"
                alt="Weightlifting Rig"
                className="w-full h-44 object-cover rounded-xl border border-gray-800"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600"
                alt="Gym Bench Press"
                className="w-full h-44 object-cover rounded-xl border border-gray-800"
              />
              <img
                src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=600"
                alt="Cardio Rowers"
                className="w-full h-64 object-cover rounded-xl border border-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
