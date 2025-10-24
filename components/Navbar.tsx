'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Image from 'next/image';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { login, signup } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleBookAppointment = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      const success = login(email, password);
      if (success) {
        toast.success('Login Successful!');
        closeModal();
      } else {
        toast.error('Invalid credentials!');
      }
    }

    if (mode === 'signup') {
      signup(name, email, password);
      toast.success('Account created! Please login.');
      setMode('login');
      resetForm();
    }

    if (mode === 'forgot') {
      toast.success('Password reset link sent to your email!');
      setMode('login');
      resetForm();
    }
  };

  const closeModal = () => {
    setAuthModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/category/men', label: 'Category' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="https://res.cloudinary.com/dlifnml9x/image/upload/v1760617052/logos/logo_1760617052125.jpg"
                  alt="The Beauty Bar Logo"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-black hover:text-pink-600 transition-colors font-medium">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <Button onClick={handleBookAppointment} className="bg-pink-600 hover:bg-pink-700 text-white">
                Book Appointment
              </Button>

              <Button
                variant="outline"
                className="border-pink-600 text-pink-600 hover:bg-pink-50"
                onClick={() => setAuthModalOpen(true)}
              >
                Login
              </Button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-black">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-black hover:text-pink-600 transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button onClick={handleBookAppointment} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                Book Appointment
              </Button>
              <Button
                variant="outline"
                className="w-full border-pink-600 text-pink-600 hover:bg-pink-50"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalOpen(true);
                }}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Forgot Password'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAuth} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            {mode !== 'forgot' && (
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            )}

            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white">
              {mode === 'login'
                ? 'Login'
                : mode === 'signup'
                ? 'Sign Up'
                : 'Send Reset Link'}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-4">
            {mode === 'login' && (
              <>
                Don't have an account?{' '}
                <button className="text-pink-600 underline" onClick={() => setMode('signup')}>
                  Sign Up
                </button>
                <br />
                <button className="text-pink-600 underline mt-2" onClick={() => setMode('forgot')}>
                  Forgot Password?
                </button>
              </>
            )}
            {mode === 'signup' && (
              <>
                Already have an account?{' '}
                <button className="text-pink-600 underline" onClick={() => setMode('login')}>
                  Login
                </button>
              </>
            )}
            {mode === 'forgot' && (
              <>
                Remembered your password?{' '}
                <button className="text-pink-600 underline" onClick={() => setMode('login')}>
                  Login
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
