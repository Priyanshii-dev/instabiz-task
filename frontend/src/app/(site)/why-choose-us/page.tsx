import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { CTASection } from '@/components/home/CTASection';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata = { title: 'Why Choose Us — InstaBizWeb' };

export default function WhyChooseUsPage() {
  return (
    <>
      <section className="pt-20">
        <Container>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Built Around Your Business, Not the Other Way Around"
          />
        </Container>
      </section>
      <WhyChooseUsSection />
      <CTASection />
    </>
  );
}
