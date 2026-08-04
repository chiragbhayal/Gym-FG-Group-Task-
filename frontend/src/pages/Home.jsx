import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Membership from '../components/Membership';
import Trainers from '../components/Trainers';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import LatestBlogs from '../components/LatestBlogs';
import Supplements from '../components/Supplements';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="space-y-0 animate-fadeIn">
      <Hero />
      <About />
      <Services />
      <Membership />
      <Trainers />
      <Gallery />
      <Testimonials />
      <LatestBlogs />
      <Supplements />
      <Contact />
    </div>
  );
};

export default Home;
