import React from 'react';
import { Dumbbell, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/fg_group.webp';

const Footer = () => {
  return (
    <footer className="bg-[#070b12] border-t border-gray-900 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logoImg} alt="FG Group Logo" className="h-9 w-auto rounded object-contain border border-gray-900 bg-[#070b12]" />
              <span className="text-xl font-black text-white tracking-wider uppercase">Fitness With Gomzi</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium training Fitness With Gomzi, elite nutrition products, and expert coaches dedicated to helping you unlock your ultimate physical potential.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Supplement Shop</Link></li>
              <li><Link to="/inquiry" className="hover:text-white transition-colors">Inquiry Form</Link></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Opening Hours</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span>Mon - Fri: 5:00 AM - 10:00 PM</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span>Saturday: 6:00 AM - 8:00 PM</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span>Sunday: 8:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>FG Group, Ripple Mall, 2nd Floor, Above Croma,Dumas Road, Piplod,Surat – 395 007</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span>+91 98765-43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span>support@fg.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600">
          <p>© {new Date().getFullYear()} FlexFit. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
