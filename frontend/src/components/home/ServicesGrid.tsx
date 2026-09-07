import Link from 'next/link';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { SERVICES } from '@/lib/constants';

export function ServicesGrid({ limit }: { limit?: number }) {
  const services = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Services Built Around Your Growth"
          description="From your first website to full business automation — we cover the whole stack."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-transform hover:-translate-y-1"
            >
              <div className="text-3xl">{service.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {limit && (
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View all services →
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
