'use client';
import { createContext, useContext, ReactNode } from 'react';

type UserType = { name: string; email: string; role: 'admin' | 'user' };

type AuthContextType = {
  user: UserType;
  login: () => true;
  logout: () => void;
  signup: () => void;
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
        login: () => true,
        logout: () => {},   // Does nothing
        signup: () => {},   // Does nothing
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
