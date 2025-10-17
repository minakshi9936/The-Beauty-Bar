'use client';
import { createContext, useContext, ReactNode } from 'react';

type UserType = { name: string; email: string; role: 'admin' | 'user' };

type AuthContextType = {
  user: UserType | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, password: string) => void;
};

// 🔹 Always return a fake user (Awantika)
const fakeUser: UserType = {
  name: 'Awantika',
  email: 'awantika@example.com',
  role: 'user',          // 👉 Change to 'admin' if testing Admin UI
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        user: fakeUser,
        login: (email: string, password: string) => true,
        logout: () => {},   // Does nothing
        signup: (name: string, email: string, password: string) => {},   // Does nothing
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
