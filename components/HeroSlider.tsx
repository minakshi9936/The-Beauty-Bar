'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define slide type locally
type Slide = {
  id: number;
  image_url: string;
  title?: string;
};

// Dummy slides data
const slidesData: Slide[] = [
  {
    id: 1,
    image_url:
      'https://res.cloudinary.com/dh9uxczld/image/upload/v1760689037/Orange_Black_Minimalist_Promotion_Hair_Salon_Instagram_Post_snl7c2.png',
    title: 'Luxury Haircuts',
  },
  {
    id: 2,
    image_url:
      'https://res.cloudinary.com/dh9uxczld/image/upload/v1760689409/Purple_Gradient_Facial_Instagram_Post_fp1f5c.png',
    title: 'Facial Treatments',
  },
  {
    id: 3,
    image_url:
      'https://res.cloudinary.com/dh9uxczld/image/upload/v1760690196/Pink_and_White_Elegant_Nail_Art_Salon_Promotion_Instagram_Post_belkjc.png',
    title: 'Nails',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slidesData.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);

  if (slidesData.length === 0) {
    return (
      <div className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-pink-600">Welcome to The Beauty Bar</h2>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={slide.image_url} alt={slide.title || 'Slider image'} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            {slide.title && (
              <h2 className="text-4xl md:text-6xl font-bold text-white text-center px-4">{slide.title}</h2>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-black" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-black" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-pink-600 w-8' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
