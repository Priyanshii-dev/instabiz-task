import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/home/CTASection';

export const metadata = { title: 'About — InstaBizWeb' };

export default function AboutPage() {
  return (
    <>
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="About Us"
            title="A Technology & Digital Solutions Partner"
            description="InstaBizWeb was built on a simple idea: technology should make business easier, not harder."
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 text-slate-600 md:grid-cols-2">
            <p>
              We work with businesses of every size to plan, build, and maintain
              the software that runs their operations — from customer-facing
              websites to internal automation. We see ourselves as a technology
              partner, not just a software vendor: we stick around after launch.
            </p>
            <p>
              Our team blends web and mobile development, CRM and ERP
              implementation, custom software, business process automation, AI
              tooling, and digital marketing — so you get one accountable
              partner instead of juggling five different vendors.
            </p>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
