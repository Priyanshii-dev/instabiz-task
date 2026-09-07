import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

export const metadata = { title: 'Contact — InstaBizWeb' };

export default function ContactPage() {
  return (
    <section className="py-20">
      <Container className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading
            align="left"
            eyebrow="Get in Touch"
            title="Let's talk about your project"
            description="Fill out the form and our team will get back to you shortly."
          />

          <div className="mt-8 space-y-4 text-sm text-slate-600">
            <p>📞 6355312073</p>
            <p>✉️ info@instabizweb.com</p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <EnquiryForm />
          </Card>
        </div>
      </Container>
    </section>
  );
}
