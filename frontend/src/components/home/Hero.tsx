import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { SITE_TAGLINE } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      <Container className="grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-700">
            Your Technology Partner
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {SITE_TAGLINE}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-slate-600">
            InstaBizWeb helps businesses grow through technology, automation,
            and digital solutions — websites, software, CRM/ERP, AI automation,
            and digital marketing, all under one roof.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" size="lg">
              Book a Consultation
            </Button>
            <Button href="/services" size="lg" variant="outline">
              Explore Services
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            ['🌐', 'Websites'],
            ['🛠️', 'Software'],
            ['🤝', 'CRM / ERP'],
            ['🤖', 'AI & Automation'],
          ].map(([icon, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
            >
              <div className="text-3xl">{icon}</div>
              <p className="mt-3 font-semibold text-slate-900">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
