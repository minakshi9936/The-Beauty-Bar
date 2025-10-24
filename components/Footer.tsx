import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile Layout: Logo left, Content right */}
        <div className="block md:hidden">
          <div className="flex flex-col space-y-8">
            {/* Logo Section */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-3">
                <Image
                  src="https://res.cloudinary.com/dh9uxczld/image/upload/v1761302651/bblogo_hgimdn.png"
                  alt="The Beauty Bar Logo"
                  width={120}
                  height={120}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 gap-8">
              <div>
                <p className="text-gray-400 text-sm text-center mb-8">
                  Your premier destination for beauty and grooming services. Experience luxury and style.
                </p>
              </div>

              {/* Quick Links and Policies side by side */}
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/services" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Policies</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                        Refund Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                        Booking Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Us */}
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-3">
                  <li className="flex items-start justify-center space-x-2">
                    <MapPin className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">
                      The Beauty Bar Salon, Vibhav Khand -4, Vibhav Khand, <br /> Gomti Nagar, Lucknow, Uttar Pradesh 226010
                    </span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <Phone className="h-5 w-5 text-pink-500 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">+1 (234) 567-890</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <Mail className="h-5 w-5 text-pink-500 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">info@thebeautybar.com</span>
                  </li>
                </ul>
                <div className="flex justify-center space-x-4 mt-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white hover:bg-pink-600 flex items-center justify-center transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white hover:bg-pink-600 flex items-center justify-center transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white hover:bg-pink-600 flex items-center justify-center transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="https://res.cloudinary.com/dh9uxczld/image/upload/v1761302651/bblogo_hgimdn.png"
                alt="The Beauty Bar Logo"
                width={140}
                height={140}
                className="object-cover"
              />

            </div>
            <p className="text-gray-400 text-sm">
              Your premier destination for beauty and grooming services. Experience luxury and style.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-pink-500 transition-colors text-sm">
                  Booking Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  123 Beauty Street, Fashion District, City, State 12345
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-pink-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+1 (234) 567-890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-pink-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@thebeautybar.com</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white hover:bg-pink-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white hover:bg-pink-600 flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white hover:bg-pink-600 flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} The Beauty Bar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
