import Link from 'next/link';
import { Container } from '../ui/Container';
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              IB
            </span>
            {SITE_NAME}
          </div>
          <p className="mt-3 max-w-xs text-sm text-slate-600">{SITE_TAGLINE}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Navigate
          </h3>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 hover:text-primary-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>📞 6355312073</li>
            <li>✉️ info@instabizweb.com</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-slate-200 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <Link href="/admin/login" className="hover:text-primary-600">
            Admin Login
          </Link>
        </Container>
      </div>
    </footer>
  );
}
