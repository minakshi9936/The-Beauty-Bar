'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import { useAuth } from '@/contexts/AuthContext';

import { ChevronLeft, ChevronRight } from 'lucide-react';

// Type Definition
type SliderImage = {
  id: number;
  image_url: string;
  title: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
};

// Dummy Data
const slidesData: SliderImage[] = [
  {
    id: 1,
    image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760689037/Orange_Black_Minimalist_Promotion_Hair_Salon_Instagram_Post_snl7c2.png',
    title: 'Luxury Haircuts',
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760689409/Purple_Gradient_Facial_Instagram_Post_fp1f5c.png',
    title: 'Facial Treatments',
    order_index: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760690196/Pink_and_White_Elegant_Nail_Art_Salon_Promotion_Instagram_Post_belkjc.png',
    title: 'Nails',
    order_index: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];


const categoriesData = [
  { id: 1, name: 'Men', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPQPcCiwI-zg16kt4PSI-UQT3wAq1vl1z5Ng&s' },
  { id: 2, name: 'Women', image_url: 'data:image/jpeg;base64,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' },

];

const servicesData = [
  { id: 1, name: 'Haircut', description: 'Professional haircut service', price: 25, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/haircut_nddk9k.jpg' },
  { id: 2, name: 'Facial', description: 'Refreshing facial treatments', price: 40, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/facial_svz4wz.jpg' },
  { id: 3, name: 'Manicure', description: 'Perfect nails every time', price: 20, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184312/mani_pmfxbe.jpg' },
  { id: 4, name: 'Makeup', description: 'Glamorous makeup session', price: 50, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184311/bridal_qrnmdn.jpg' },
  { id: 5, name: 'Massage', description: 'Relaxing full body massage', price: 60, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184309/bodymassage_d9j8u8.jpg' },
  { id: 6, name: 'Pedicure', description: 'Pampering foot care', price: 25, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184311/foot_w7jfbq.jpg' },
];

const productsData = [
  { id: 1, name: 'Shampoo', description: 'Premium hair shampoo', price: 15, image_url: '/products/shampoo.jpg' },
  { id: 2, name: 'Face Cream', description: 'Hydrating facial cream', price: 20, image_url: '/products/facecream.jpg' },
  { id: 3, name: 'Nail Polish', description: 'Long-lasting nail polish', price: 10, image_url: '/products/nailpolish.jpg' },
  { id: 4, name: 'Lipstick', description: 'Vibrant lipstick colors', price: 12, image_url: '/products/lipstick.jpg' },
  { id: 5, name: 'Perfume', description: 'Refreshing fragrance', price: 30, image_url: '/products/perfume.jpg' },
  { id: 6, name: 'Body Lotion', description: 'Soft and smooth skin', price: 18, image_url: '/products/bodylotion.jpg' },
];

export default function Home() {
  const [slides] = useState(slidesData);
  const [categories] = useState(categoriesData);
  const [featuredServices] = useState(servicesData);
  const [products] = useState(productsData);
  const [serviceScrollPosition, setServiceScrollPosition] = useState(0);
  const [productScrollPosition, setProductScrollPosition] = useState(0);

  const scrollServices = (direction: 'left' | 'right') => {
    const container = document.getElementById('services-container');
    if (!container) return;

    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setServiceScrollPosition(container.scrollLeft + scrollAmount);
  };

  const scrollProducts = (direction: 'left' | 'right') => {
    const container = document.getElementById('products-container');
    if (!container) return;

    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setProductScrollPosition(container.scrollLeft + scrollAmount);
  };

  return (
    <div>
      <HeroSlider slides={slides} />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-black mb-4">Choose Your Category</h2>
          <p className="text-center text-gray-600 mb-12">Select your preferred service category</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.name.toLowerCase()}`} className="group">
                <div className="relative overflow-hidden rounded-full aspect-square max-w-xs mx-auto shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <img src={category.image_url} alt={category.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-4xl font-bold text-white">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2">Featured Services</h2>
              <p className="text-gray-600">Discover our most popular treatments</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => scrollServices('left')}
                className="p-2 rounded-full bg-white hover:bg-pink-50 border border-gray-200 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
              <button
                onClick={() => scrollServices('right')}
                className="p-2 rounded-full bg-white hover:bg-pink-50 border border-gray-200 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>

          <div id="services-container" className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="flex-shrink-0 w-80 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-600">${service.price}</span>
                    <Link
                      href="/services"
                      className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-block bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg transition-colors font-medium"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2">Beauty Products</h2>
              <p className="text-gray-600">Premium products for your beauty routine</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => scrollProducts('left')}
                className="p-2 rounded-full bg-white hover:bg-pink-50 border border-gray-200 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
              <button
                onClick={() => scrollProducts('right')}
                className="p-2 rounded-full bg-white hover:bg-pink-50 border border-gray-200 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>

          <div id="products-container" className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-80 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-600">${product.price}</span>
                    <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-pink-600 to-pink-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Look?</h2>
          <p className="text-xl mb-8 text-pink-100">
            Book your appointment today and experience luxury beauty services
          </p>
          <button
            onClick={() => window.open('https://wa.me/1234567890', '_blank')}
            className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Book Appointment Now
          </button>
        </div>
      </section>
    </div>
  );
}
