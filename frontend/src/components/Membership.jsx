import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter Plan',
    price: '$29',
    period: '/ month',
    description: 'Perfect for casual gym goers looking to stay healthy.',
    features: [
      'Access to gym floor & weights',
      'Free Locker room access',
      '1 Complimentary trainer session',
      'Standard workout routines guide'
    ],
    popular: false,
    cta: 'Select Starter'
  },
  {
    name: 'Elite Growth',
    price: '$49',
    period: '/ month',
    description: 'Our most popular plan for absolute builders.',
    features: [
      '24/7 Facility access',
      'Unlimited group fitness classes',
      'Personalized goal tracking',
      '10% Discount on supplements shop',
      'Locker room & Sauna access'
    ],
    popular: true,
    cta: 'Select Elite Growth'
  },
  {
    name: 'Pro Athlete',
    price: '$89',
    period: '/ month',
    description: 'All-inclusive training package for pro competitors.',
    features: [
      '24/7 Facility access + VIP rooms',
      'Dedicated personal trainer (2 sessions/week)',
      'Custom macro meal plans',
      'Unlimited sauna & massage sessions',
      '20% Discount on supplements shop',
      'Free energy shake per day'
    ],
    popular: false,
    cta: 'Select Pro Athlete'
  }
];

const Membership = () => {
  return (
    <section id="plans" className="py-24 bg-[#0b0f19] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-orange-500 font-extrabold text-sm uppercase tracking-widest">Membership Plans</h2>
          <p className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Flexible Packages Built For Every Level
          </p>
          <div className="w-16 h-1 bg-gradient-custom mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl border p-8 flex flex-col justify-between transition-all relative overflow-hidden ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#131a29] to-[#0b0f19] border-orange-500 shadow-xl shadow-orange-500/5 -translate-y-2'
                  : 'bg-[#070b12] border-gray-900'
              }`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 bg-orange-500 text-white font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
                  Popular
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide">{plan.name}</h3>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">{plan.description}</p>
                </div>

                <div className="flex items-baseline">
                  <span className="text-5xl font-black text-white">{plan.price}</span>
                  <span className="text-gray-500 text-sm ml-1 font-medium">{plan.period}</span>
                </div>

                <div className="border-t border-gray-900 pt-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm text-gray-300">
                        <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-auto">
                <Link
                  to="/inquiry"
                  className={`block w-full text-center py-3 rounded-xl font-bold transition-all ${
                    plan.popular
                      ? 'bg-gradient-custom hover-gradient text-white shadow-md shadow-orange-500/20'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;
