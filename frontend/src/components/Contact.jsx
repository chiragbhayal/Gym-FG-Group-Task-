import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-[#0b0f19] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-orange-500 font-extrabold text-sm uppercase tracking-widest">Contact Us</h2>
          <p className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Have Questions? Get In Touch With Us
          </p>
          <div className="w-16 h-1 bg-gradient-custom mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Info Card */}
          <div className="bg-[#070b12] border border-gray-900 p-8 rounded-2xl flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white uppercase tracking-wide">FLEXFIT HEADQUARTERS</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Whether you want to learn about memberships, consult on custom personal trainer bookings, or have corporate inquiry questions, we are ready to assist.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Location</h4>
                  <p className="text-gray-400 text-xs mt-0.5">123 Muscle Street, Fitness City, FC 90812</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Phone</h4>
                  <p className="text-gray-400 text-xs mt-0.5">+1 (555) 019-2834</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Email</h4>
                  <p className="text-gray-400 text-xs mt-0.5">support@flexfit.com</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-900 pt-6">
              <p className="text-xs text-gray-500">
                Response time for email inquiries is generally under 24 hours.
              </p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-[#070b12] border border-gray-900 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-6">Send A Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              {success && (
                <div className="bg-green-600/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg text-sm text-center">
                  Message sent successfully!
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-custom hover-gradient text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/20"
              >
                <span>Send Message</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
