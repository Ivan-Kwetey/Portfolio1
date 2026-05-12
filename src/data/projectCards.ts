import caseCardArrow from '../assets/case-study/card-arrow.svg'
import mergeCardPoster from '../assets/case-covers/merge homepage cover.png'
import aisledexHomecardVideo from '../assets/aisledex/aisledexhome.mp4'
import aisledexMetaVideo from '../assets/aisledex/meta-video.mp4'
import homecardVideo from '../assets/group-collection/homecard.mp4'
import groupCollectionDemoVideo from '../assets/group-collection/group-demo.mp4'
import groupCollectionHomeVideo from '../assets/group-collection/grouphomevideo.mp4'
import mergeHomecardVideo from '../assets/merge/homevideomerge-card.mp4'
import mergeHeroVideo from '../assets/merge/mergehero.mp4'
import mergeHomeVideo from '../assets/merge/newmergehome.mp4'
import type { ProjectCard, ProjectSlug } from '../types/projectCard'

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

const AISLEDEX_META_DETAILS = [
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
    title: 'Group Collections',
    headline: 'Adding a community layer to a video-first professional network',
    metaDescription:
      'Case study: Group Collections, a community and governance layer for a video-first professional network.',
    descriptionLines: ['Adding a community layer to a', 'video-first professional network'],
    heroVideoUrl: groupCollectionHomeVideo,
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
    title: 'Merge',
    headline: 'Designing a collaboration-first social platform for creatives',
    metaDescription: 'Case study: Merge, a collaboration-first social platform concept for creatives.',
    descriptionLines: ['Designing a collaboration-first', 'social platform for creatives'],
    heroVideoUrl: mergeHomeVideo,
    previewVideoUrl: mergeHomecardVideo,
    previewArrowUrl: caseCardArrow,
    mediaVideoUrl: mergeHeroVideo,
    mediaPosterUrl: mergeCardPoster,
    metaDetails: [...MERGE_META_DETAILS],
    metaVideoUrl: null,
  },
  {
    id: 'case-3',
    slug: 'aisledex',
    routeAliases: ['aisldex'],
    title: 'Aisledex',
    headline: 'Designed to reduce uncertainty while shopping',
    metaDescription:
      'Case study: Aisledex, a mobile shopping assistant designed to reduce uncertainty in-store.',
    descriptionLines: ['Designed to reduce uncertainty', 'while shopping'],
    previewVideoUrl: aisledexHomecardVideo,
    previewArrowUrl: caseCardArrow,
    mediaVideoUrl: aisledexMetaVideo,
    mediaPosterUrl: null,
    metaDetails: [...AISLEDEX_META_DETAILS],
    metaVideoUrl: null,
  },
] as const

export interface HomeHeroCard {
  descriptionLines: string[]
  id: string
  projectIndex: number
  title: string
  videoUrl: string
}

export function buildHomeHeroCards(projectOrder: readonly ProjectSlug[]): HomeHeroCard[] {
  return projectOrder.flatMap((slug) => {
    const projectIndex = PROJECT_CARDS.findIndex((projectCard) => projectCard.slug === slug)
    const card = projectIndex >= 0 ? PROJECT_CARDS[projectIndex] : null

    if (!card) {
      return []
    }

    return [
      {
        descriptionLines: card.descriptionLines,
        id: card.id,
        projectIndex,
        title: card.title,
        videoUrl: card.heroVideoUrl ?? card.previewVideoUrl,
      },
    ]
  })
}

export const SECTION_COUNT = 1 + PROJECT_CARDS.length
