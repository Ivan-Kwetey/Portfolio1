import type { ProjectSlug } from '../types/projectCard'

export const SITE_CONFIG = {
  contactLinks: {
    email: 'mailto:hello@example.com',
    phone: 'tel:+10000000000',
    linkedin: 'https://www.linkedin.com/in/your-handle',
  },
  defaultDescription:
    'Portfolio of Ivan Kwetey, a product designer focused on social, community, and consumer product systems.',
  defaultTitle: 'Ivan Kwetey | Product Designer',
  homeHeroProjectOrder: ['merge', 'group-collection', 'aisledex'] as const satisfies readonly ProjectSlug[],
  locationLabel: 'Willing to relocate',
  name: 'Ivan Kwetey',
  navName: 'IVAN K',
  roleLabel: 'Product Designer',
} as const
