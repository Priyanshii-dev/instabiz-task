import { AuthProvider } from '@/context/AuthContext';

export const metadata = { title: 'Admin — InstaBizWeb' };

/**
 * Admin route group is intentionally NOT wrapped by the public Navbar/Footer -
 * it's a separate application area under /admin, as required by the assignment.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50">{children}</div>
    </AuthProvider>
  );
}
