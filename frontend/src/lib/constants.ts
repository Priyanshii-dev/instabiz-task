export const SITE_NAME = 'InstaBizWeb';
export const SITE_TAGLINE = 'Digital Solutions for Business Growth';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Why Choose Us', href: '/why-choose-us' },
  { label: 'Contact', href: '/contact' },
] as const;

export interface ServiceInfo {
  name: string;
  description: string;
  icon: string; // simple emoji/icon key kept dependency-free
}

export const SERVICES: ServiceInfo[] = [
  {
    name: 'Website Development',
    description:
      'Fast, modern, responsive websites built to convert visitors into customers.',
    icon: '🌐',
  },
  {
    name: 'Web & Mobile App Development',
    description:
      'Custom web and mobile applications tailored to your business workflows.',
    icon: '📱',
  },
  {
    name: 'CRM Solutions',
    description:
      'Track leads, manage customers, and grow relationships with the right CRM setup.',
    icon: '🤝',
  },
  {
    name: 'ERP & Odoo Solutions',
    description:
      'Streamline operations across departments with ERP and Odoo implementations.',
    icon: '🏗️',
  },
  {
    name: 'Custom Software Development',
    description:
      'Bespoke software built around exactly how your business operates.',
    icon: '🛠️',
  },
  {
    name: 'Business Process Automation',
    description:
      'Automate repetitive tasks so your team can focus on what matters.',
    icon: '⚙️',
  },
  {
    name: 'AI Automation',
    description:
      'Practical AI tools and workflows that save time and reduce manual work.',
    icon: '🤖',
  },
  {
    name: 'API & System Integration',
    description:
      'Connect your tools and platforms into one seamless, reliable system.',
    icon: '🔗',
  },
  {
    name: 'Digital Marketing',
    description:
      "Reach the right audience and grow your brand's presence online.",
    icon: '📈',
  },
];

// Dropdown options for the enquiry form (kept in sync with backend validators/enquiry.validator.ts)
export const ENQUIRY_SERVICE_OPTIONS = [
  'Website Development',
  'Web/Mobile App Development',
  'CRM',
  'ERP/Odoo',
  'Custom Software',
  'Business Automation',
  'AI Automation',
  'API Integration',
  'Digital Marketing',
  'Other',
] as const;

export const ENQUIRY_STATUS_OPTIONS = [
  'new',
  'in_progress',
  'resolved',
] as const;

export const WHY_CHOOSE_US = [
  {
    title: 'Customized Solutions',
    description:
      'Every engagement is scoped around your specific goals, not a one-size-fits-all template.',
    icon: '🎯',
  },
  {
    title: 'Business-Focused Development',
    description:
      'We build technology that serves business outcomes first, features second.',
    icon: '💼',
  },
  {
    title: 'Modern Technology',
    description:
      'We use current, well-supported tools and frameworks — not legacy tech that slows you down.',
    icon: '⚡',
  },
  {
    title: 'Automation-First Thinking',
    description:
      'Wherever a manual process can be automated, we design for it from day one.',
    icon: '🔁',
  },
  {
    title: 'Built to Scale',
    description:
      'Solutions are architected to grow with your business, not to be rebuilt in a year.',
    icon: '📊',
  },
  {
    title: 'End-to-End Support',
    description:
      'From the first conversation through to post-launch support, we stay involved.',
    icon: '🛟',
  },
];
