'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, Sparkles, Tag } from 'lucide-react';

const servicesData = [
  { id: 1, name: 'Haircut', description: 'Stylish haircut tailored to your face shape and preferences. Includes wash, blow dry, and style.', price: 499, duration: '45 mins', rating: 4.7, discount: 15, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/haircut_nddk9k.jpg' },
  { id: 2, name: 'Facial Glow', description: 'Rejuvenate your skin with our premium glow facial that removes impurities and enhances your natural radiance.', price: 899, duration: '60 mins', rating: 4.9, discount: 20, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184310/facial_svz4wz.jpg' },
  { id: 3, name: 'Manicure', description: 'Pamper your hands and nails with our luxury manicure, including exfoliation, massage, and polish.', price: 649, duration: '40 mins', rating: 4.6, discount: 10, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184312/mani_pmfxbe.jpg' },
  { id: 4, name: 'Makeup', description: 'Professional makeup for weddings, parties, and special events — choose your preferred look.', price: 1499, duration: '90 mins', rating: 4.8, discount: 25, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184311/bridal_qrnmdn.jpg' },
  { id: 5, name: 'Massage', description: 'Relaxing full body massage to reduce stress and enhance wellness using aromatic oils.', price: 1299, duration: '75 mins', rating: 5.0, discount: 18, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184309/bodymassage_d9j8u8.jpg' },
  { id: 6, name: 'Pedicure', description: 'Rejuvenate your feet with a soothing pedicure that includes cleaning, scrubbing, and massage.', price: 699, duration: '50 mins', rating: 4.5, discount: 12, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1760184311/foot_w7jfbq.jpg' },
];

export default function ServiceDetails() {
  const { id } = useParams();
  const service = servicesData.find((s) => s.id === Number(id));

  if (!service)
    return <div className="text-center mt-32 text-xl">Service not found</div>;

  const discountedPrice = Math.round(
    service.price - (service.price * service.discount) / 100
  );

  const relatedServices = servicesData
    .filter((s) => s.id !== service.id)
    .slice(0, 3);

  // ✅ Replace with your WhatsApp number (without + or spaces)
  const whatsappNumber = '916391421660';
  const whatsappMessage = encodeURIComponent(
    `Hello! I would like to book a ${service.name} service.`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="max-w-6xl mx-auto py-24 px-6">
      {/* --- Main Section --- */}
      <motion.div
        className="flex flex-col md:flex-row gap-12 items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={service.image_url}
          alt={service.name}
          className="w-full md:w-1/2 rounded-2xl shadow-xl object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />

        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="text-pink-600" /> {service.name}
          </h1>
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            {service.description}
          </p>

          {/* --- Rating --- */}
          <div className="flex items-center gap-2 text-yellow-500 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                fill={i < Math.round(service.rating) ? '#facc15' : 'none'}
                className="w-5 h-5"
              />
            ))}
            <span className="text-gray-600 text-sm ml-1">
              ({service.rating} / 5)
            </span>
          </div>

          {/* --- Price Section --- */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold text-pink-600">
                ₹{discountedPrice}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ₹{service.price}
              </span>
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                {service.discount}% OFF
              </span>
            </div>
            <span className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full mt-3 sm:mt-0">
              ⏱ {service.duration}
            </span>
          </div>

          {/* --- Offer Badge --- */}
          <div className="flex items-center gap-2 text-pink-700 mb-4">
            <Tag className="w-4 h-4" />
            <p className="text-sm font-medium">
              Limited Time Offer! Grab it before it ends 🎀
            </p>
          </div>

          {/* --- Buttons --- */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => window.open(whatsappLink, '_blank')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-medium shadow-md"
            >
              Book Now 
            </button>
            <Link
              href="/services"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              <ArrowLeft className="inline-block w-4 h-4 mr-2" /> Back to
              Services
            </Link>
          </div>
        </div>
      </motion.div>

      {/* --- Reviews Section --- */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: 'Aditi Sharma',
              comment: 'Amazing service! My hair has never looked better.',
              rating: 5,
            },
            {
              name: 'Neha Verma',
              comment:
                'The staff is friendly and the salon ambience is relaxing.',
              rating: 4,
            },
          ].map((review, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">{review.name}</h3>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill={i < review.rating ? '#facc15' : 'none'}
                      className="w-4 h-4"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- Related Services --- */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          You may also like
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {relatedServices.map((item) => {
            const itemDiscounted = Math.round(
              item.price - (item.price * item.discount) / 100
            );
            return (
              <Link
                key={item.id}
                href={`/service/${item.id}`}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-pink-600 font-medium">
                      ₹{itemDiscounted}
                    </span>
                    <span className="text-gray-400 text-sm line-through">
                      ₹{item.price}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
