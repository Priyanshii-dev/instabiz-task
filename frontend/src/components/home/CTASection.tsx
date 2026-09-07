import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export function CTASection() {
  return (
    <section className="bg-primary-700 py-16">
      <Container className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to grow your business?
          </h2>
          <p className="mt-2 max-w-lg text-primary-100">
            Tell us what you're working on and we'll get back to you with next
            steps.
          </p>
        </div>
        <Button href="/contact" size="lg" variant="secondary">
          Get in Touch
        </Button>
      </Container>
    </section>
  );
}
