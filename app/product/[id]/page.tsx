'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, Tag } from 'lucide-react';

const productsData = [
  { id: 1, name: 'Shampoo', description: 'Premium hair shampoo for smooth, shiny hair.', price: 299, discount: 10, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1761288808/shampoo_smwofu.jpg' },
  { id: 2, name: 'Face Cream', description: 'Hydrating cream for radiant skin.', price: 499, discount: 15, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1761288808/Face_cream_igbdlc.jpg' },
  { id: 3, name: 'Nail Polish', description: 'Long-lasting nail color for every mood.', price: 199, discount: 5, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1761288808/Nail_polish_otwza0.jpg' },
  { id: 4, name: 'Lipstick', description: 'Vibrant shades that last all day.', price: 299, discount: 12, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1761288808/Lipstick_qkv3ay.jpg' },
  { id: 5, name: 'Perfume', description: 'Refreshing fragrance for every occasion.', price: 899, discount: 20, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1761288808/perfume_hoq4wa.jpg' },
  { id: 6, name: 'Body Lotion', description: 'Keeps your skin soft and hydrated.', price: 399, discount: 8, image_url: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1761288808/bodylotion_aqdrim.jpg' },
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === Number(id));

  if (!product)
    return <div className="text-center mt-32 text-xl">Product not found</div>;

  const discountedPrice = Math.round(
    product.price - (product.price * product.discount) / 100
  );

  const relatedProducts = productsData.filter((p) => p.id !== product.id).slice(0, 3);

  // ✅ WhatsApp link
  const whatsappNumber = '919876543210';
  const whatsappMessage = encodeURIComponent(
    `Hello! I would like to order the product: ${product.name}.`
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
          src={product.image_url}
          alt={product.name}
          className="w-full md:w-1/2 rounded-2xl shadow-xl object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />

        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Tag className="text-pink-600" /> {product.name}
          </h1>
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">{product.description}</p>

          {/* --- Price Section --- */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold text-pink-600">₹{discountedPrice}</span>
              <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">{product.discount}% OFF</span>
            </div>
          </div>

          {/* --- Buttons --- */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => window.open(whatsappLink, '_blank')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-medium shadow-md"
            >
              Order Now on WhatsApp
            </button>
            <Link
              href="/products"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              <ArrowLeft className="inline-block w-4 h-4 mr-2" /> Back to Products
            </Link>
          </div>
        </div>
      </motion.div>

      {/* --- Related Products --- */}
      <motion.div className="mt-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">You may also like</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {relatedProducts.map((item) => {
            const itemDiscounted = Math.round(item.price - (item.price * item.discount) / 100);
            return (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-pink-600 font-medium">₹{itemDiscounted}</span>
                    <span className="text-gray-400 text-sm line-through">₹{item.price}</span>
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
