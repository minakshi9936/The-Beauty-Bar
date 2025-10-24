'use client';

import { useEffect, useState } from 'react';
import { supabase, GalleryImage } from '@/lib/supabase';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Animated Count Component
const CountUp = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5s
    const increment = end / (duration / 30);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(counter);
  }, [end]);

  return <span className="text-4xl font-bold text-pink-600 mb-2">{count}+</span>;
};

// Sparkles Component
const Sparkles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-white rounded-full"
        initial={{ opacity: 0, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
        animate={{ opacity: [0, 1, 0], x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
        transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, delay: Math.random() }}
      />
    ))}
  </div>
);

export default function AboutPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('order_index');

    if (data) setGalleryImages(data);
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const prevImage = () => setSelectedIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  const nextImage = () => setSelectedIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">About Us</h1>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <img
              src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="The Beauty Bar salon interior"
              className="rounded-lg shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold text-black mb-6">Welcome to The Beauty Bar</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>The Beauty Bar is your premier destination for luxury beauty and grooming services...</p>
              <p>Our team of highly skilled and experienced professionals are dedicated to helping you look and feel your absolute best...</p>
              <p>Whether you're looking for a fresh haircut, a rejuvenating facial, professional styling, or a complete makeover...</p>
              <p>At The Beauty Bar, we believe that beauty is not just about appearance, but about confidence...</p>
            </div>

            {/* Animated Stats with Sparkles */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[{ end: 500, label: 'Happy Clients' }, { end: 10, label: 'Expert Stylists' }, { end: 5, label: 'Years Experience' }].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center relative flex flex-col items-center justify-center p-4 rounded-xl bg-pink-50 overflow-hidden"
                >
                  <CountUp end={item.end} />
                  <div className="text-gray-600 text-sm">{item.label}</div>
                  <Sparkles />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="py-12 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-black mb-2">Our Gallery</h2>
            <p className="text-gray-600 mb-6">See our work and beautiful salon space</p>

            <div
              id="gallery-container"
              className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide relative group"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => openModal(index)}
                  className="flex-shrink-0 w-80 h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <img
                    src={image.image_url}
                    alt="Gallery image"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ))}

              {/* Left/Right Scroll Arrows */}
              <button
                onClick={() => scrollGallery('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white bg-opacity-70 hover:bg-pink-600 hover:text-white transition-opacity opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scrollGallery('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white bg-opacity-70 hover:bg-pink-600 hover:text-white transition-opacity opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {galleryImages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">Gallery images coming soon...</p>
              </div>
            )}
          </div>

          {/* Modal with Navigation */}
          <AnimatePresence>
            {modalOpen && galleryImages[selectedIndex] && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 text-white p-2 rounded-full hover:bg-gray-700 transition"
                >
                  <X className="w-6 h-6" />
                </button>

                <button
                  onClick={prevImage}
                  className="absolute left-4 text-white p-2 rounded-full hover:bg-gray-700 transition"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <img
                  src={galleryImages[selectedIndex].image_url}
                  alt="Gallery enlarged"
                  className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl object-contain"
                />
                <button
                  onClick={nextImage}
                  className="absolute right-4 text-white p-2 rounded-full hover:bg-gray-700 transition"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Final Book Appointment CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Ready to Transform Your Look?</h2>
          <button
            onClick={() => window.open('https://wa.me/1234567890', '_blank')}
            className="bg-gradient-to-br from-pink-600 to-pink-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition"
          >
            Book Appointment Now
          </button>
        </div>
      </div>
    </div>
  );
}
