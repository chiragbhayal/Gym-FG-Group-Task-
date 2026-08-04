import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Lock, Send, CheckCircle, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const Inquiry = () => {
  const { user, token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    age: '',
    goal: 'Weight Loss',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Inquiry submission failed');
      }

      setSuccess(true);
      setFormData({
        name: user.name || '',
        phone: '',
        age: '',
        goal: 'Weight Loss',
        message: ''
      });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#070b12] relative">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="max-w-md w-full space-y-6 glass p-8 rounded-2xl border border-gray-800 text-center relative z-10">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center">
              <Lock className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Login Required</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            The Gym Inquiry form is only accessible to registered FlexFit members. Please login or register to send an inquiry.
          </p>
          <div className="flex flex-col gap-3 pt-4">
            <Link
              to="/login"
              className="bg-gradient-custom hover-gradient text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-orange-500/10"
            >
              Sign In to Your Account
            </Link>
            <Link
              to="/register"
              className="bg-gray-900 border border-gray-800 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-all"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-[#070b12] relative">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3.5 py-1 text-xs font-extrabold text-orange-500 uppercase tracking-widest">
            <Flame className="h-3 w-3 animate-pulse" />
            <span>TRANSFORMATION HUB</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            GYM INQUIRY FORM
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Tell us about your physical fitness goals, health history, and desired coaching package so our trainers can curate your program.
          </p>
          <div className="w-16 h-1 bg-gradient-custom mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Info Card */}
          <div className="bg-[#0b0f19] border border-gray-900 p-6 rounded-2xl space-y-6 md:col-span-1">
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">Guidelines</h3>
            <ul className="space-y-4 text-xs text-gray-400 leading-relaxed">
              <li>
                <strong className="text-white block mb-1">1. Age requirement:</strong>
                Members must be at least 16 years old to engage in advanced compound lifting programs.
              </li>
              <li>
                <strong className="text-white block mb-1">2. Custom plans:</strong>
                Based on your selected Goal, we assign a custom trainer within 24 hours of submission.
              </li>
              <li>
                <strong className="text-white block mb-1">3. Physical health:</strong>
                Please list any past orthopedic injuries or chronic medical conditions in the message box.
              </li>
            </ul>
          </div>

          {/* Form Card */}
          <div className="bg-[#0b0f19] border border-gray-900 p-8 rounded-2xl md:col-span-2">
            {success ? (
              <div className="text-center py-8 space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 animate-bounce" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white uppercase">Inquiry Received!</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
                  Thank you for submitting your profile. An elite FlexFit coach will review your goals and reach out to you via phone within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all text-sm mt-4"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-600/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm text-center">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-[#070b12] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 012-3456"
                      className="w-full bg-[#070b12] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Age</label>
                    <input
                      type="number"
                      required
                      min={10}
                      max={100}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="e.g. 24"
                      className="w-full bg-[#070b12] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Primary Goal</label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full bg-[#070b12] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Weight Loss">Weight Loss / Fat Burn</option>
                      <option value="Muscle Hypertrophy">Muscle Gain / Hypertrophy</option>
                      <option value="Strength Power">Powerlifting / Strength</option>
                      <option value="Flexibility Yoga">Flexibility / Calisthenics</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your health conditions, past trainer experience, and desired gym routine..."
                    className="w-full bg-[#070b12] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-custom hover-gradient text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/20 disabled:opacity-50"
                >
                  <span>{loading ? 'Submitting Form...' : 'Submit Inquiry'}</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
