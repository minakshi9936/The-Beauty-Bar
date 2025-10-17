'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type UserType = { name: string; email: string; role: 'admin' | 'user' };

type AuthContextType = {
  user: UserType | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, password: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  // Dummy users
  const [users, setUsers] = useState<
    { name: string; email: string; password: string; role: 'admin' | 'user' }[]
  >([
    { name: 'Awantika', email: 'awantika@example.com', password: '123456', role: 'user' },
    { name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  ]);

  const login = (email: string, password: string) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser({ name: found.name, email: found.email, role: found.role });
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string) => {
    if (users.some((u) => u.email === email)) return;
    setUsers((prev) => [...prev, { name, email, password, role: 'user' }]);
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout, signup }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
