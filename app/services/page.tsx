'use client';

import { useEffect, useState } from 'react';
import { supabase, Service, Category } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function ServicesPage() {
  const [services, setServices] = useState<(Service & { category?: Category })[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [servicesData, categoriesData] = await Promise.all([
      supabase.from('services').select('*').eq('is_active', true),
      supabase.from('categories').select('*'),
    ]);

    if (servicesData.data && categoriesData.data) {
      const servicesWithCategory = servicesData.data.map((service) => ({
        ...service,
        category: categoriesData.data.find((cat) => cat.id === service.category_id),
      }));
      setServices(servicesWithCategory);
      setCategories(categoriesData.data);
    }
  };

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((service) => service.category?.name.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Our Services</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            onClick={() => setSelectedCategory('all')}
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className={
              selectedCategory === 'all'
                ? 'bg-pink-600 hover:bg-pink-700'
                : 'border-pink-600 text-pink-600 hover:bg-pink-50'
            }
          >
            All Services
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.name.toLowerCase())}
              variant={
                selectedCategory === category.name.toLowerCase() ? 'default' : 'outline'
              }
              className={
                selectedCategory === category.name.toLowerCase()
                  ? 'bg-pink-600 hover:bg-pink-700'
                  : 'border-pink-600 text-pink-600 hover:bg-pink-50'
              }
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
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
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-black">{service.name}</h3>
                  {service.category && (
                    <span className="text-xs px-3 py-1 bg-pink-100 text-pink-600 rounded-full font-medium">
                      {service.category.name}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-pink-600">${service.price}</span>
                  <Button
                    onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
