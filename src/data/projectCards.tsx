import caseCardArrow from '../assets/case-study/card-arrow.svg'
import mergeCardPoster from '../assets/case-covers/merge homepage cover.png'
import aisledexHomecardVideo from '../assets/aisledex/aisledexhome.mp4'
import aisledexMetaVideo from '../assets/aisledex/meta-video.mp4'
import homecardVideo from '../assets/group-collection/homecard.mp4'
import groupCollectionDemoVideo from '../assets/group-collection/group-demo.mp4'
import mergeHomecardVideo from '../assets/merge/homevideomerge-card.mp4'
import mergeHeroVideo from '../assets/merge/mergehero.mp4'
import type { ProjectCard } from '../types/projectCard'

const GROUP_COLLECTIONS_META_DETAILS = [
  {
    label: 'Role',
    value: 'Product Designer (Solo, End-to-End)',
    support: 'Product Strategy, UX Design, Information Architecture, Interaction Design',
  },
  {
    label: 'Platform',
    value: 'Superstars (Network Tab)',
  },
  {
    label: 'Duration',
    value: '8 Weeks',
  },
  {
    label: 'Project type',
    value: 'Community Discovery & Governance System',
  },
] as const

const MERGE_META_DETAILS = [
  {
    label: 'Role',
    value: 'Product Designer (Solo, End-to-End)',
    support: 'Product Strategy, UX Design, Information Architecture, Interaction Design',
  },
  {
    label: 'Platform',
    value: 'Merge (iOS & Android)',
  },
  {
    label: 'Duration',
    value: '6 Weeks',
  },
  {
    label: 'Project type',
    value: 'Independent Product (In Development)',
  },
] as const

const AISLDEX_META_DETAILS = [
  {
    label: 'Role',
    value: 'Product Designer (Solo, End-to-End)',
    support: 'Product Strategy, UX Design, Information Architecture, Interaction Design',
  },
  {
    label: 'Platform',
    value: 'Mobile, iOS, Android',
  },
  {
    label: 'Duration',
    value: '6 Weeks',
  },
  {
    label: 'Project type',
    value: 'In Development (E-Commerce)',
  },
] as const

export const PROJECT_CARDS: ProjectCard[] = [
  {
    id: 'case-1',
    slug: 'group-collection',
    headline: 'Adding a community layer to a video-first professional network',
    description: (
      <>
        Adding a community layer to a
        <br />
        video-first professional network
      </>
    ),
    metaDetails: [...GROUP_COLLECTIONS_META_DETAILS],
    previewVideoUrl: homecardVideo,
    previewArrowUrl: caseCardArrow,
    mediaVideoUrl: groupCollectionDemoVideo,
    mediaPosterUrl: null,
    metaVideoUrl: null,
  },
  {
    id: 'case-2',
    slug: 'merge',
    headline: 'Designing a collaboration-first social platform for creatives',
    description: (
      <>
        Designing a collaboration-first
        <br />
        social platform for creatives
      </>
    ),
    previewVideoUrl: mergeHomecardVideo,
    previewArrowUrl: caseCardArrow,
    mediaVideoUrl: mergeHeroVideo,
    mediaPosterUrl: mergeCardPoster,
    metaDetails: [...MERGE_META_DETAILS],
    metaVideoUrl: null,
  },
  {
    id: 'case-3',
    slug: 'aisldex',
    headline: 'Designed to reduce uncertainty while shopping',
    description: (
      <>
        Designed to reduce uncertainty
        <br />
        while shopping
      </>
    ),
    previewVideoUrl: aisledexHomecardVideo,
    previewArrowUrl: caseCardArrow,
    mediaVideoUrl: aisledexMetaVideo,
    mediaPosterUrl: null,
    metaDetails: [...AISLDEX_META_DETAILS],
    metaVideoUrl: null,
  },
]

export const SECTION_COUNT = 1 + PROJECT_CARDS.length
