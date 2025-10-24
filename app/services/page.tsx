'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Define types
type Category = { id: string; name: string; image_url: string; created_at: string };
type Subcategory = { id: string; name: string; category_id: string };
type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  discounted_price?: number;
  image_url: string;
  category_id: string;
  subcategory_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<(Service & { category?: Category; subcategory?: Subcategory })[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const categoriesData: Category[] = [
      { id: '1', name: 'Men', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPQPcCiwI-zg16kt4PSI-UQT3wAq1vl1z5Ng&s', created_at: new Date().toISOString() },
      { id: '2', name: 'Women', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdxrXoDwjgC2h9IlKod9ezYTbwLSqrz0Q&s', created_at: new Date().toISOString() },
    ];

    const subcategoriesData: Subcategory[] = [
      { id: '1', name: 'Hair Cut', category_id: '1' },
      { id: '2', name: 'Men Facial', category_id: '1' },
      { id: '3', name: 'Shaving/Beard Shaping', category_id: '1' },
      { id: '4', name: 'Hair Coloring', category_id: '1' },
      { id: '5', name: 'Facial Glow', category_id: '2' },
      { id: '6', name: 'Manicure', category_id: '2' },
      { id: '7', name: 'Pedicure', category_id: '2' },
      { id: '8', name: 'Makeup', category_id: '2' },
    ];

    const servicesData: Service[] = [
      { id: '1', name: 'Classic Haircut', description: 'Get a stylish, professional haircut tailored to your look.', price: 499, discounted_price: 399, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/haircut_nddk9k.jpg', category_id: '1', subcategory_id: '1', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: '2', name: 'Premium Haircut', description: 'Advanced styling with premium products.', price: 699, discounted_price: 599, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/haircut_nddk9k.jpg', category_id: '1', subcategory_id: '1', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: '3', name: 'Men Facial Treatment', description: 'Rejuvenate your skin with our premium facial treatments.', price: 899, discounted_price: 799, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/facial_svz4wz.jpg', category_id: '1', subcategory_id: '2', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: '4', name: 'Bridal Makeup', description: 'Professional makeup for weddings.', price: 1499, discounted_price: 1299, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184311/bridal_qrnmdn.jpg', category_id: '2', subcategory_id: '8', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: '5', name: 'Facial Glow', description: 'Rejuvenate your skin with our premium facial treatments for a glowing look.', price: 899, discounted_price: 799, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/facial_svz4wz.jpg', category_id: '2', subcategory_id: '5', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    ];

    const servicesWithCategory = servicesData.map((service) => ({
      ...service,
      category: categoriesData.find((cat) => cat.id === service.category_id),
      subcategory: subcategoriesData.find((sub) => sub.id === service.subcategory_id),
    }));

    setServices(servicesWithCategory);
    setCategories(categoriesData);
    setSubcategories(subcategoriesData);
  };

  const filteredSubcategories = selectedCategory === 'all'
    ? []
    : subcategories.filter((sub) => sub.category_id === categories.find((cat) => cat.name.toLowerCase() === selectedCategory)?.id);

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : selectedSubcategory
      ? services.filter((service) => service.subcategory?.id === selectedSubcategory)
      : services.filter((service) => service.category?.name.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 bg-gradient-to-r from-pink-400 via-pink-600 to-pink-500">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Our Services</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            onClick={() => { setSelectedCategory('all'); setSelectedSubcategory(null); }}
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className={selectedCategory === 'all' ? 'bg-pink-600 hover:bg-pink-700' : 'border-pink-600 text-pink-600 hover:bg-pink-50'}
          >
            All Services
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => { setSelectedCategory(category.name.toLowerCase()); setSelectedSubcategory(null); }}
              variant={selectedCategory === category.name.toLowerCase() ? 'default' : 'outline'}
              className={selectedCategory === category.name.toLowerCase() ? 'bg-pink-600 hover:bg-pink-700' : 'border-pink-600 text-pink-600 hover:bg-pink-50'}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Subcategories Filter */}
        <AnimatePresence>
          {filteredSubcategories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {filteredSubcategories.map((sub) => (
                <Button
                  key={sub.id}
                  onClick={() => setSelectedSubcategory(sub.id)}
                  variant={selectedSubcategory === sub.id ? 'default' : 'outline'}
                  className={selectedSubcategory === sub.id ? 'bg-pink-400 hover:bg-pink-500' : 'border-pink-400 text-pink-400 hover:bg-pink-50'}
                >
                  {sub.name}
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Services Grid */}
        <AnimatePresence>
          <motion.div
            key={selectedCategory + selectedSubcategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: Math.random() * 0.2 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    {service.discounted_price ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-400 line-through">₹{service.price}</span>
                        <span className="text-pink-600 text-3xl font-bold">₹{service.discounted_price}</span>
                      </div>
                    ) : (
                      <span className="text-pink-600 text-3xl font-bold">₹{service.price}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/service/${service.id}`}>
                      <Button className="bg-pink-600 hover:bg-pink-700 w-full">View</Button>
                    </Link>
                    <Button
                      onClick={() => window.open(`https://wa.me/1234567890?text=Hello! I would like to book ${service.name} service.`, '_blank')}
                      className="bg-green-500 hover:bg-green-600 w-full"
                    >
                      Book Now on WhatsApp
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
