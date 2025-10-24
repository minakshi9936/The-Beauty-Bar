'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Type Definitions ---
type SliderImage = {
  id: number;
  image_url: string;
  title: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
};

// --- Dummy Data ---
const slidesData: SliderImage[] = [
  {
    id: 1,
    image_url:
      'https://res.cloudinary.com/dh9uxczld/image/upload/v1760689037/Orange_Black_Minimalist_Promotion_Hair_Salon_Instagram_Post_snl7c2.png',
    title: 'Luxury Haircuts',
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    image_url:
      'https://res.cloudinary.com/dh9uxczld/image/upload/v1760689409/Purple_Gradient_Facial_Instagram_Post_fp1f5c.png',
    title: 'Facial Treatments',
    order_index: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    image_url:
      'https://res.cloudinary.com/dh9uxczld/image/upload/v1760690196/Pink_and_White_Elegant_Nail_Art_Salon_Promotion_Instagram_Post_belkjc.png',
    title: 'Nails',
    order_index: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

// --- Categories ---
const categoriesData = [
  {
    id: 1,
    name: 'Men',
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPQPcCiwI-zg16kt4PSI-UQT3wAq1vl1z5Ng&s',
  },
  {
    id: 2,
    name: 'Women',
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdxrXoDwjgC2h9IlKod9xe3EzYTbwLSqrz0Q&s',
  },
];

// --- Services ---
const servicesData = [
  { id: 1, name: 'Haircut', description: 'Get a stylish, professional haircut tailored to your look.', price: 499, discount: 399, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/haircut_nddk9k.jpg' },
  { id: 2, name: 'Facial Glow', description: 'Rejuvenate your skin with our premium facial treatments for a glowing look.', price: 899, discount: 749, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/facial_svz4wz.jpg' },
  { id: 3, name: 'Manicure', description: 'Pamper your hands with our luxurious manicure session.', price: 649, discount: 549, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184312/mani_pmfxbe.jpg' },
  { id: 4, name: 'Makeup', description: 'Professional makeup for weddings, parties, or special occasions.', price: 1499, discount: 1299, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184311/bridal_qrnmdn.jpg' },
  { id: 5, name: 'Massage', description: 'Relax and unwind with our soothing full body massage.', price: 1299, discount: 1099, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184309/bodymassage_d9j8u8.jpg' },
  { id: 6, name: 'Pedicure', description: 'Get soft, beautiful feet with our rejuvenating pedicure service.', price: 699, discount: 599, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184311/foot_w7jfbq.jpg' },
];

// --- Products ---
const productsData = [
  { id: 1, name: 'Shampoo', description: 'Premium hair shampoo for smooth, shiny hair.', price: 299, discount: 249, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1761288808/shampoo_smwofu.jpg' },
  { id: 2, name: 'Face Cream', description: 'Hydrating cream for radiant skin.', price: 499, discount: 399, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1761288808/Face_cream_igbdlc.jpg' },
  { id: 3, name: 'Nail Polish', description: 'Long-lasting nail color for every mood.', price: 199, discount: 149, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1761288808/Nail_polish_otwza0.jpg' },
  { id: 4, name: 'Lipstick', description: 'Vibrant shades that last all day.', price: 299, discount: 249, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1761288808/Lipstick_qkv3ay.jpg' },
  { id: 5, name: 'Perfume', description: 'Refreshing fragrance for every occasion.', price: 899, discount: 749, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1761288808/perfume_hoq4wa.jpg' },
  { id: 6, name: 'Body Lotion', description: 'Keeps your skin soft and hydrated.', price: 399, discount: 349, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1761288808/bodylotion_aqdrim.jpg' },
];

export default function Home() {
  const [slides] = useState(slidesData);
  const [categories] = useState(categoriesData);
  const [featuredServices] = useState(servicesData);
  const [products] = useState(productsData);

  const scrollServices = (direction: 'left' | 'right') => {
    const container = document.getElementById('services-container');
    if (!container) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleWhatsApp = (itemName: string, type: string) => {
    const phoneNumber = '916391421660'; 
    const message = `Hello! I’d like to book a ${type}: ${itemName}. Can you share more details?`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div>
      {/* --- HERO --- */}
      <div className="pt-15">
        <HeroSlider slides={slides} />
      </div>

      {/* --- CATEGORY SECTION --- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-black mb-4">Choose Your Category</h2>
          <p className="text-gray-600 mb-12">Select your preferred service category</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.name.toLowerCase()}`} className="group">
                <div className="relative overflow-hidden rounded-full aspect-square max-w-xs w-full mx-auto shadow-xl hover:scale-105 transition">
                  <img src={category.image_url} alt={category.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="mt-4 text-3xl font-semibold text-black group-hover:text-pink-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED SERVICES --- */}
      <section className="py-16 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-black">Featured Services</h2>
          </div>

          {/* Navigation Buttons */}
          <button onClick={() => scrollServices('left')} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-pink-50 border">
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button onClick={() => scrollServices('right')} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-pink-50 border">
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          <div id="services-container" className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {featuredServices.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.03 }}
                className="flex-shrink-0 w-80 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img src={service.image_url} alt={service.name} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-gray-400 line-through mr-2">₹{service.price}</span>
                      <span className="text-2xl font-bold text-pink-600">₹{service.discount}</span>
                    </div>
                    <Link href={`/service/${service.id}`} className="border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition">
                      View
                    </Link>
                  </div>
                  <button
                    onClick={() => handleWhatsApp(service.name, 'service')}
                    className="bg-pink-600 hover:bg-pink-700 text-white w-full py-2 rounded-lg transition text-sm font-medium"
                  >
                    Book now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION --- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-black mb-8">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div key={product.id} whileHover={{ scale: 1.03 }} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <img src={product.image_url} alt={product.name} className="h-56 w-full object-cover" />
                <div className="p-5 text-left">
                  <h3 className="text-lg font-semibold text-black mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-gray-400 line-through mr-2">₹{product.price}</span>
                      <span className="text-lg font-bold text-pink-600">₹{product.discount}</span>
                    </div>
                    <Link href={`/product/${product.id}`} className="border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition">
                      View
                    </Link>
                  </div>
                  <button
                    onClick={() => handleWhatsApp(product.name, 'product')}
                    className="bg-pink-600 hover:bg-pink-700 text-white w-full py-2 rounded-lg transition text-sm font-medium"
                  >
                    Order now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-16 bg-gradient-to-br from-pink-600 to-pink-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Look?</h2>
          <p className="text-xl mb-8 text-pink-100">Book your appointment today and experience luxury beauty services</p>
          <button
            onClick={() => handleWhatsApp('appointment', 'salon')}
            className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition"
          >
            Book Appointment Now
          </button>
        </div>
      </section>
    </div>
  );
}
