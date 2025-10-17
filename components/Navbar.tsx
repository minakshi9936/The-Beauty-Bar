'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Image from 'next/image';


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showUserSignup, setShowUserSignup] = useState(false);

  const { user, login, logout, signup } = useAuth();

  const [adminEmail, setAdminEmail] = useState('admin@example.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [userEmail, setUserEmail] = useState('awantika@example.com');
  const [userPassword, setUserPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(adminEmail, adminPassword);
    if (success) {
      toast.success('Admin Login Successful!');
      setShowAdminLogin(false);
    } else {
      toast.error('Invalid admin credentials!');
    }
  };

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(userEmail, userPassword);
    if (success) {
      toast.success('User Login Successful!');
      setShowUserLogin(false);
    } else {
      toast.error('Invalid user credentials!');
    }
  };

  const handleUserSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup(signupName, signupEmail, signupPassword);
    toast.success('Account created! Please login.');
    setShowUserSignup(false);
    setShowUserLogin(true);
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
  };

  const handleBookAppointment = () => {
    window.open('https://wa.me/1234567890', '_blank');
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
                  width={56}   // match w-14
                  height={56}  // match h-14
                  className="object-cover"
                />
              </div>
              <span className="text-2xl font-bold text-black">The Beauty Bar</span>
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

              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-pink-600" />
                    </div>
                    <span className="font-medium text-black">{user.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={logout} className="text-black hover:text-pink-600">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <button onClick={() => setLoginDropdownOpen(!loginDropdownOpen)} className="flex items-center space-x-1 text-black hover:text-pink-600 transition-colors font-medium">
                    <span>Login</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {loginDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                      <button onClick={() => { setShowAdminLogin(true); setLoginDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-black hover:bg-pink-50 transition-colors">
                        Admin Login
                      </button>
                      <button onClick={() => { setShowUserLogin(true); setLoginDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-black hover:bg-pink-50 transition-colors">
                        User Login
                      </button>
                      <button onClick={() => { setShowUserSignup(true); setLoginDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-black hover:bg-pink-50 transition-colors">
                        User Signup
                      </button>
                    </div>
                  )}
                </div>
              )}
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
                <Link key={link.href} href={link.href} className="block text-black hover:text-pink-600 transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Button onClick={handleBookAppointment} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                Book Appointment
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Admin Login Modal */}
      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <Label htmlFor="admin-email">Email</Label>
              <Input id="admin-email" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="admin-password">Password</Label>
              <Input id="admin-password" type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">Login</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* User Login Modal */}
      <Dialog open={showUserLogin} onOpenChange={setShowUserLogin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Login</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUserLogin} className="space-y-4">
            <div>
              <Label htmlFor="user-email">Email</Label>
              <Input id="user-email" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="user-password">Password</Label>
              <Input id="user-password" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">Login</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* User Signup Modal */}
      <Dialog open={showUserSignup} onOpenChange={setShowUserSignup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Signup</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUserSignup} className="space-y-4">
            <div>
              <Label htmlFor="signup-name">Name</Label>
              <Input id="signup-name" type="text" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">Sign Up</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

