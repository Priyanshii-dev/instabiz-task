import { Hero } from '@/components/home/Hero';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid limit={6} />
      <WhyChooseUsSection />
      <CTASection />
    </>
  );
}
