'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '../ui/Spinner';

/**
 * Wraps any /admin/dashboard page. Redirects to /admin/login if there is no
 * authenticated admin once the initial auth check has finished loading.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-primary-600">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return <>{children}</>;
}
