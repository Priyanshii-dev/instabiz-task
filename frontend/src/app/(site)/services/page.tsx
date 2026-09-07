import { ServicesGrid } from '@/components/home/ServicesGrid';
import { CTASection } from '@/components/home/CTASection';

export const metadata = { title: 'Services — InstaBizWeb' };

export default function ServicesPage() {
  return (
    <>
      <ServicesGrid />
      <CTASection />
    </>
  );
}
