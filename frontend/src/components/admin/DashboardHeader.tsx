'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export function DashboardHeader() {
  const { admin, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 text-lg font-bold text-slate-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
            IB
          </span>
          Admin Panel
        </Link>

        <div className="flex items-center gap-4">
          {admin && (
            <span className="hidden text-sm text-slate-600 sm:inline">
              {admin.email}
            </span>
          )}
          <Button variant="outline" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </Container>
    </header>
  );
}
