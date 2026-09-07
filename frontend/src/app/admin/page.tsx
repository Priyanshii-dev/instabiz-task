import { redirect } from 'next/navigation';

// Visiting /admin directly opens the login screen, per the assignment spec.
export default function AdminRootPage() {
  redirect('/admin/login');
}
