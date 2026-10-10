export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  features: string[];
  gallery: { view: 'overview' | 'detail'; title: string }[];
  demo?: string;
  github?: string;
  // Replace with an approved screenshot to override the system diagram.
  image?: { src: string; caption: string; cropPublicPreview?: boolean };
}

export const projects: Project[] = [
  {
    slug: 'tookbaht',
    title: 'Tookbaht',
    gallery: [{ view: 'overview', title: 'A clear view of everyday spending' }, { view: 'detail', title: 'Small steps toward a savings goal' }],
    image: { src: '/tookbaht-preview.jpg?v=public-en', caption: 'Tookbaht / public app preview', cropPublicPreview: true },
    category: 'Personal finance · Offline-capable PWA',
    description: 'A personal finance PWA for tracking income, expenses, budgets, subscriptions, installments, and savings goals. Install it on your phone and record transactions offline, with synchronization when you reconnect.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Supabase', 'tesseract.js'],
    features: ['Income, expenses, transfers, budgets, and savings goals', 'Offline logging with synchronization when reconnected', 'On-device OCR for bank transfer slips', 'Subscriptions, installments, shared bills, and Web Push reminders'],
    demo: 'https://tookbaht.gawstxn.dev/',
    github: 'https://github.com/gawstxn/tookbaht-app',
  },
  {
    slug: 'loyalty',
    title: 'Loyalty Platform',
    gallery: [{ view: 'overview', title: 'Rewards worth coming back for' }, { view: 'detail', title: 'Campaigns and customer activity' }],
    category: 'Customer engagement · LINE OA',
    description: 'A loyalty platform integrated with LINE Official Account. Customers earn points, join campaigns, and redeem rewards, while the business manages activities and customer engagement.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'LINE OA'],
    features: ['Point accumulation and reward redemption', 'Configurable activity campaigns', 'LINE Official Account integration'],
  },
  {
    slug: 'court',
    title: 'Court Booking',
    gallery: [{ view: 'overview', title: 'Find a time to play' }, { view: 'detail', title: 'A booking, from slot to confirmation' }],
    category: 'Reservations · Workflow automation',
    description: 'A court reservation platform integrated with LINE Official Account, with flexible time slots, optional add-ons, and automated booking notifications.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'LINE OA'],
    features: ['Flexible time-slot reservations', 'Optional booking add-ons', 'Automated customer notifications'],
  },
];
