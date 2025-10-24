'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

// Define types locally
type Category = {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
};

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<(Service & { category?: Category })[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Hardcoded categories data
    const categoriesData: Category[] = [
      {
        id: '1',
        name: 'Men',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPQPcCiwI-zg16kt4PSI-UQT3wAq1vl1z5Ng&s',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Women',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdxrXoDwjgC2h9IlKod9xe3EzYTbwLSqrz0Q&s',
        created_at: new Date().toISOString(),
      },
    ];

    // Hardcoded services data with category_id
    const servicesData: Service[] = [
      { id: '1', name: 'Haircut', description: 'Get a stylish, professional haircut tailored to your look.', price: 499, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/haircut_nddk9k.jpg', category_id: '1', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: '5', name: 'Massage', description: 'Relax and unwind with our soothing full body massage.', price: 1299, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184309/bodymassage_d9j8u8.jpg', category_id: '1', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: '2', name: 'Facial Glow', description: 'Rejuvenate your skin with our premium facial treatments for a glowing look.', price: 899, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/facial_svz4wz.jpg', category_id: '2', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: '3', name: 'Manicure', description: 'Pamper your hands with our luxurious manicure session.', price: 649, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184312/mani_pmfxbe.jpg', category_id: '2', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: '4', name: 'Makeup', description: 'Professional makeup for weddings, parties, or special occasions.', price: 1499, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184311/bridal_qrnmdn.jpg', category_id: '2', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: '6', name: 'Pedicure', description: 'Get soft, beautiful feet with our rejuvenating pedicure service.', price: 699, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184311/foot_w7jfbq.jpg', category_id: '2', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    ];

    const servicesWithCategory = servicesData.map((service) => ({
      ...service,
      category: categoriesData.find((cat) => cat.id === service.category_id),
    }));
    setServices(servicesWithCategory);
    setCategories(categoriesData);
  };

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((service) => service.category?.name.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-64 animated-gradient"
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
                  <span className="text-3xl font-bold text-pink-600">₹{service.price}</span>
                  <Button
                    onClick={() => window.open('https://wa.me/916391421660', '_blank')}
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
