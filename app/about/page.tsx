'use client';

import { useEffect, useState } from 'react';
import { supabase, GalleryImage } from '@/lib/supabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AboutPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

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

  return (
    <div className="min-h-screen bg-white">
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
            <h2 className="text-4xl font-bold text-black mb-6">
              Welcome to The Beauty Bar
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The Beauty Bar is your premier destination for luxury beauty and grooming services.
                Since our establishment, we have been committed to providing exceptional service
                and creating unforgettable experiences for our clients.
              </p>
              <p>
                Our team of highly skilled and experienced professionals are dedicated to helping
                you look and feel your absolute best. We use only the finest products and the
                latest techniques to ensure outstanding results every time.
              </p>
              <p>
                Whether you're looking for a fresh haircut, a rejuvenating facial, professional
                styling, or a complete makeover, we offer a comprehensive range of services
                tailored to meet your unique needs.
              </p>
              <p>
                At The Beauty Bar, we believe that beauty is not just about appearance, but about
                confidence, self-expression, and feeling great in your own skin. Our welcoming
                atmosphere and personalized approach ensure that every visit is a special
                experience.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">500+</div>
                <div className="text-gray-600 text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">10+</div>
                <div className="text-gray-600 text-sm">Expert Stylists</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">5+</div>
                <div className="text-gray-600 text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold text-black mb-2">Our Gallery</h2>
                <p className="text-gray-600">See our work and beautiful salon space</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => scrollGallery('left')}
                  className="p-2 rounded-full bg-white hover:bg-pink-50 border border-gray-200 transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700" />
                </button>
                <button
                  onClick={() => scrollGallery('right')}
                  className="p-2 rounded-full bg-white hover:bg-pink-50 border border-gray-200 transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-6 w-6 text-gray-700" />
                </button>
              </div>
            </div>

            <div
              id="gallery-container"
              className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="flex-shrink-0 w-80 h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <img
                    src={image.image_url}
                    alt="Gallery image"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>

            {galleryImages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">Gallery images coming soon...</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 bg-gradient-to-br from-pink-600 to-pink-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Why Choose The Beauty Bar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-pink-100 text-sm">
                Highly trained professionals with years of experience in beauty and styling
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Products</h3>
              <p className="text-pink-100 text-sm">
                We use only the finest, professional-grade products for all our services
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
              <p className="text-pink-100 text-sm">
                Tailored treatments and consultations to match your unique style and needs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
