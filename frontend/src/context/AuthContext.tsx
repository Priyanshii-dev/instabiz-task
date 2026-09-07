'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { api, ApiRequestError } from '@/lib/api';
import { authStorage } from '@/lib/auth';
import { AdminProfile } from '@/lib/types';

interface AuthContextValue {
  admin: AdminProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Wraps the /admin section. Verifies the stored token against the API on
 * mount, exposes login/logout, and holds the current admin's profile.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadProfile = useCallback(async () => {
    const token = authStorage.getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const profile = await api.get<AdminProfile>('/auth/me', { auth: true });
      setAdmin(profile);
    } catch {
      authStorage.clearToken();
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await api.post<{ token: string; admin: AdminProfile }>(
        '/auth/login',
        { email, password },
      );
      authStorage.setToken(data.token);
      setAdmin(data.admin);
      router.push('/admin/dashboard');
    },
    [router],
  );

  const logout = useCallback(() => {
    authStorage.clearToken();
    setAdmin(null);
    router.push('/admin/login');
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ admin, isLoading, isAuthenticated: !!admin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export { ApiRequestError };
