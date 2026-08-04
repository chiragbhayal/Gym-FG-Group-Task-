import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'David Miller',
    role: 'Member since 2022',
    text: 'This gym completely changed my perspective on fitness. The master trainers are extremely professional, and the supplements they offer in the shop are top notch!',
    stars: 5,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100'
  },
  {
    name: 'Jessica Vance',
    role: 'Member since 2023',
    text: 'I love the clean environment, the heavy weight rigs, and the positive vibe. The inquiry form was really simple to submit, and the response was quick.',
    stars: 5,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100'
  },
  {
    name: 'Robert Stark',
    role: 'Member since 2024',
    text: 'The best equipment in town! The staff is friendly, and the recovery sauna room is exactly what I need after a brutal leg day session.',
    stars: 5,
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=100'
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#070b12] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-orange-500 font-extrabold text-sm uppercase tracking-widest">Testimonials</h2>
          <p className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            What Our Active Members Say About Us
          </p>
          <div className="w-16 h-1 bg-gradient-custom mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#0b0f19] border border-gray-900 p-8 rounded-2xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex space-x-1">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-orange-500 fill-orange-500" />
                  ))}
                </div>
                <p className="text-gray-400 text-sm italic leading-relaxed">
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-6 border-t border-gray-900 mt-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-800"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{review.name}</h4>
                  <p className="text-gray-500 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
