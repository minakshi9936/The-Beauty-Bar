'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
  discount: number;
  image_url: string;
  category_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

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

// Hardcoded services data with category_id and discount
const servicesData: Service[] = [
  { id: '1', name: 'Haircut', description: 'Get a stylish, professional haircut tailored to your look.', price: 499, discount: 399, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/haircut_nddk9k.jpg', category_id: '1', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '5', name: 'Massage', description: 'Relax and unwind with our soothing full body massage.', price: 1299, discount: 1099, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184309/bodymassage_d9j8u8.jpg', category_id: '1', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '2', name: 'Facial Glow', description: 'Rejuvenate your skin with our premium facial treatments for a glowing look.', price: 899, discount: 749, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/facial_svz4wz.jpg', category_id: '2', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '3', name: 'Manicure', description: 'Pamper your hands with our luxurious manicure session.', price: 649, discount: 549, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184312/mani_pmfxbe.jpg', category_id: '2', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '4', name: 'Makeup', description: 'Professional makeup for weddings, parties, or special occasions.', price: 1499, discount: 1299, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184311/bridal_qrnmdn.jpg', category_id: '2', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '6', name: 'Pedicure', description: 'Get soft, beautiful feet with our rejuvenating pedicure service.', price: 699, discount: 599, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184311/foot_w7jfbq.jpg', category_id: '2', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [services, setServices] = useState<Service[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [categories] = useState<Category[]>(categoriesData);

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = () => {
    const currentCategory = categoriesData.find(
      (cat) => cat.name.toLowerCase() === slug.toLowerCase()
    );

    if (currentCategory) {
      setCategory(currentCategory);
      const filteredServices = servicesData.filter(
        (service) => service.category_id === currentCategory.id && service.is_active
      );
      setServices(filteredServices);
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
        className="relative h-80 animated-gradient"
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
            <motion.div
              key={service.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
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
                <p className="text-gray-600 mb-4 truncate">{service.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-pink-600">₹{service.discount}</span>
                    <span className="text-lg text-gray-400 line-through">₹{service.price}</span>
                  </div>
                  <Link href={`/service/${service.id}`}>
                    <Button className="bg-pink-600 hover:bg-pink-700">View</Button>
                  </Link>
                </div>
                <Button
                  onClick={() => window.open(`https://wa.me/916391421660?text=Hello! I would like to book a ${service.name} service.`, '_blank')}
                  className="bg-green-500 hover:bg-green-600 w-full"
                >
                  Book Now on WhatsApp
                </Button>
              </div>
            </motion.div>
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
