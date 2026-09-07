import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { WHY_CHOOSE_US } from '@/lib/constants';

export function WhyChooseUsSection() {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <SectionHeading
          eyebrow="Why InstaBizWeb"
          title="A Partner, Not Just a Vendor"
          description="Here's what makes working with us different."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-card"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
