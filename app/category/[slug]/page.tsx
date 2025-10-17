'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase, Service, Category } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [services, setServices] = useState<Service[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    const [categoriesData] = await Promise.all([
      supabase.from('categories').select('*'),
    ]);

    if (categoriesData.data) {
      setCategories(categoriesData.data);
      const currentCategory = categoriesData.data.find(
        (cat) => cat.name.toLowerCase() === slug.toLowerCase()
      );

      if (currentCategory) {
        setCategory(currentCategory);
        const { data: servicesData } = await supabase
          .from('services')
          .select('*')
          .eq('category_id', currentCategory.id)
          .eq('is_active', true);

        if (servicesData) setServices(servicesData);
      }
    }
  };

  const switchCategory = (categoryName: string) => {
    router.push(`/category/${categoryName.toLowerCase()}`);
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${category.image_url})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-white mb-4">{category.name} Services</h1>
          <p className="text-xl text-pink-200">Premium services tailored for you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <p className="text-gray-600 font-medium mr-2 flex items-center">Switch Category:</p>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => switchCategory(cat.name)}
              variant={cat.id === category.id ? 'default' : 'outline'}
              className={
                cat.id === category.id
                  ? 'bg-pink-600 hover:bg-pink-700'
                  : 'border-pink-600 text-pink-600 hover:bg-pink-50'
              }
            >
              {cat.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
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
                <h3 className="text-2xl font-bold text-black mb-2">{service.name}</h3>
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

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services available in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
