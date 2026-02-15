'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { z } from 'zod';
import { loginSchema, passwordSchema } from '@/lib/validations';

export interface User {
  id: string;
  email: string;
  name?: string;
  password?: string; // Only for local storage simulation
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('auth_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to restore auth state:', err);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Helper to get users from storage
  const getStoredUsers = (): User[] => {
    try {
      const users = localStorage.getItem('app_users');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Failed to parse users:', error);
      return [];
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate input using Zod schema
      loginSchema.parse({ email, password });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Verify credentials against local storage
      const users = getStoredUsers();
      // In a real app, we would hash the password. Here we compare directly for simulation.
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Create session (simulate JWT)
      const { password: _, ...userWithoutPassword } = user; // Exclude password from session
      setUser(userWithoutPassword);
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
    } catch (err) {
      if (err instanceof z.ZodError) {
        const message = err.errors[0].message;
        setError(message);
        throw new Error(message);
      }
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate input
      const backendSignupSchema = z.object({
        email: loginSchema.shape.email,
        password: passwordSchema,
      });
      backendSignupSchema.parse({ email, password });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check for existing user
      const users = getStoredUsers();
      if (users.some(u => u.email === email)) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        password, // Storing password locally for simulation validation
      };

      // Save to "database"
      users.push(newUser);
      localStorage.setItem('app_users', JSON.stringify(users));

      // Create session
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
    } catch (err) {
      if (err instanceof z.ZodError) {
        const message = err.errors[0].message;
        setError(message);
        throw new Error(message);
      }
      const message = err instanceof Error ? err.message : 'Signup failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400));

      setUser(null);
      localStorage.removeItem('auth_user');
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isInitialized,
    isAuthenticated: user !== null,
    login,
    signup,
    logout,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
