import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Navbar from './components/Navbar'
import ContentArea from './components/ContentArea'
import IntroSplash from './components/IntroSplash'
import Footer from './components/Footer'
import groupCollectionAvatars from './assets/group-collection/UserAvatars.png'
import groupCollectionPhoneBezel from './assets/phone bezle.png'
import groupCollectionIpadBezel from './assets/ipad bezle.png'
import groupCollectionDesignIntentVideo from './assets/group-collection/design-intent.mp4'
import groupCollectionCuratedRecGroupsVideo from './assets/group-collection/curated-rec-groups.mp4'
import groupCollectionCentralizedRequestsVideo from './assets/group-collection/centralized-requests.mp4'
import groupCollectionBoundariesVideo from './assets/group-collection/boundaries.mp4'
import groupCollectionGroupPageVideo from './assets/group-collection/group-page.mp4'
import groupCollectionJoinRequestVideo from './assets/group-collection/join-request.mp4'
import groupCollectionCreateGroupVideo from './assets/group-collection/create-group.mp4'
import groupCollectionEditGroupVideo from './assets/group-collection/edit-group.mp4'
import groupCollectionViewGroupVideo from './assets/group-collection/viewgroup.mp4'
import groupCollectionDemoVideo from './assets/group-collection/group-demo.mp4'
import groupCollectionDemoPoster from './assets/group-collection/group-demo-poster.jpg'
import homecardVideo from './assets/group-collection/homecard.mp4'
import groupCollectionSystemScopeImage from './assets/group-collection/System scope image.png'
import communityLayerCardImage from './assets/case-covers/community-layer-card.png'
import mergeCardPoster from './assets/case-covers/merge homepage cover.png'
import mergeHomecardVideo from './assets/merge/homevideomerge-card.mp4'
import mergeHeroVideo from './assets/merge/mergehero.mp4'
import mergeSolutionVideo from './assets/merge/solution.mp4'
import mergeHifi1Video from './assets/merge/hifi1.mp4'
import mergeHifi2Video from './assets/merge/hifi2.mp4'
import mergeHifi3Video from './assets/merge/hifi3.mp4'
import mergeResearchCard from './assets/merge/Research.png'
import mergeSendingImage from './assets/merge/sending.png'
import mergeReviewingImage from './assets/merge/reviewing.png'
import mergeLofi1Image from './assets/merge/lofi1.png'
import mergeLofi2Image from './assets/merge/lofi2.png'
import mergeLofi3Image from './assets/merge/lofi3.png'
import mergeInstagramIcon from './assets/merge/instagram.svg'
import mergeTiktokIcon from './assets/merge/tiktok.svg'
import mergeSnapchatIcon from './assets/merge/snapchat.svg'
import mergeFigmaIcon from './assets/merge/figma.svg'
import mergeLightroomIcon from './assets/merge/lightroom.png'
import caseCardArrow from './assets/case-study/card-arrow.svg'
import closeIcon from './assets/close.svg'
import introLogo from './assets/man-logo.svg'
import './App.css'

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
    value: 'Pre-launch',
  },
  {
    label: 'Project type',
    value: 'Community Layer for Video-First Networking',
  },
]

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
]

const GROUP_COLLECTIONS_OPPORTUNITY = {
  label: 'The Opportunity',
  title: 'Networking needed a shared space, not just individual profiles',
  description:
    'Superstars already supported individual visibility through video resumes and professional content. Group Collection adds the missing community layer for shared professional identity and collaboration.',
}

const GROUP_COLLECTIONS_PROBLEM = {
  label: 'The Problem',
  title: 'Community discovery and community governance were both missing',
  description:
    'The challenge was broader than browse UX. The product needed one end-to-end system for discovery, trust, moderation, and ownership.',
}

const MERGE_PROBLEM = {
  label: 'The Problem',
  title: 'Most creative platforms are built for publishing, not co-creation',
  description:
    'Creative work is collaborative, but social platforms treat it like a finished artifact. When creators want to build on someone else’s work, they usually leave the app, download the asset, edit elsewhere, and repost manually. Merge removes that break by making contribution, review, and shared authorship happen inside the product.',
  visual: {
    current: {
      label: 'Current workflow',
      steps: ['Download asset', 'Edit elsewhere', 'Repost manually'],
    },
    merge: {
      label: 'Merge workflow',
      steps: ['Contribute in-app', 'Review request', 'Shared authorship'],
    },
  },
}

const MERGE_RESEARCH = {
  label: 'Research',
  title: 'Collaboration is possible today but it is slow, fragmented, and hard to control',
  description: 'Conversations with creatives surfaced friction in both participation and ownership.',
  imageUrl: mergeResearchCard,
  imageAlt: 'Research quotes from creatives about manual contribution workflows and ownership control.',
}

const MERGE_OPPORTUNITY = {
  label: 'Opportunity',
  title: 'Creative version control meets social discovery',
  description: 'The gap was not a missing feature. It was a missing model.',
  columns: [
    {
      title: 'Social platforms',
      description:
        'Social apps make discovery frictionless, but collaboration is informal and hard to trace.',
      icons: [
        { src: mergeInstagramIcon, alt: 'Instagram' },
        { src: mergeTiktokIcon, alt: 'TikTok' },
        { src: mergeSnapchatIcon, alt: 'Snapchat' },
      ],
    },
    {
      title: 'Creative tooling',
      description:
        'Collaboration tools support branching, review, and version history, but they are not designed for creator-friendly participation at social scale.',
      icons: [
        { src: mergeFigmaIcon, alt: 'Figma' },
        { src: mergeLightroomIcon, alt: 'Lightroom' },
      ],
    },
  ],
}

const MERGE_SOLUTION = {
  label: 'Merge',
  title:
    'Merge sits between those worlds by letting creatives contribute, review, and merge work directly inside the product.',
  description: 'Collaboration no longer depends on disconnected, off-platform workflows.',
  videoUrl: mergeSolutionVideo,
  leftCallout: (
    <>
      Start from a live post
      <br />
      <span>request to contribute without leaving the feed</span>
    </>
  ),
  rightCallout: (
    <>
      Merge with clear authorship
      <br />
      <span>review, approve, and credit contributions in one flow</span>
    </>
  ),
}

const MERGE_CORE_EXPERIENCE = {
  label: 'Core experience',
  title: 'A piece does not end at publishing, it can evolve',
  description: 'Merge turns viewers into contributors through one native in-app flow.',
  items: [
    {
      title: 'Sending Merge Request',
      imageUrl: mergeSendingImage,
      imageAlt: 'Flow diagram showing how a creator sends a merge request.',
    },
    {
      title: 'Reviewing Merge Request',
      imageUrl: mergeReviewingImage,
      imageAlt: 'Flow diagram showing how a creator reviews a merge request.',
    },
  ],
  body:
    'A creator publishes a piece and chooses whether it is open to outside contribution. If it is, another creative contributes in-app, submits a merge request in context, explains what changed, and defines credit. The original creator reviews and accepts or declines; accepted requests become a new version with visible attribution.',
}

const MERGE_FINAL_DESIGN = {
  label: 'Final design',
  title: 'The interface reveals the process of creation',
  description: 'Every key screen was designed to make collaboration visible, legible, and easy to join.',
  videos: [
    {
      title: 'Collaborative feed',
      description: 'The feed shows openness, versioning, and participation at a glance.',
      videoUrl: mergeHifi1Video,
    },
    {
      title: 'Participation-ready detail',
      description: 'The detail view combines the work, contributors, status, and next action in one place.',
      videoUrl: mergeHifi2Video,
    },
    {
      title: 'Visible evolution',
      description: "Composer, review, and timeline make a piece's evolution easy to follow.",
      videoUrl: mergeHifi3Video,
    },
  ],
}

const MERGE_DESIGN_DECISIONS = {
  label: 'Designs decisions',
  title: 'Make contribution visible, structured, and trustworthy',
  description: 'The product works because participation is not left to vague social behavior.',
  visibility: {
    title: 'Visibility',
    description: 'Make contribution visible so the final output does not hide the process.',
    imageUrl: mergeLofi1Image,
    imageAlt: 'Low-fidelity screen showing visible contribution history.',
    caption: 'Every creative gets credit with transparency and trust',
  },
  permissions: {
    title: 'Controlled permissions',
    description: 'Make merge requests the primary interaction, so collaboration is reviewable.',
    items: [
      {
        imageUrl: mergeLofi2Image,
        imageAlt: 'Low-fidelity screen showing work permission settings.',
        caption: 'Setting permissions of a work to Open, Request or closed',
      },
      {
        imageUrl: mergeLofi3Image,
        imageAlt: 'Low-fidelity screen showing merge request review actions.',
        caption: 'Accepting, decline, or respond to a request',
      },
    ],
  },
}

const MERGE_TRUST = {
  label: 'Trust',
  title: 'The hardest problem was ownership',
  description: 'Collaboration only works when contribution feels safe.',
  body:
    'Users needed clarity on permissions, authorship, conflicts, and rejected contributions. Clear permissions, visible contributors, version history, review states, and explicit credit became core trust-building mechanisms.',
}

const MERGE_OUTCOME = {
  label: 'Outcome',
  title: 'Early signal shows demand for in-app co-creation with ownership controls',
  description:
    'Merge is still in development, so impact is tracked through a beta scorecard, not live growth metrics.',
  items: [
    {
      icon: 'instrumented',
      title: 'End-to-end flow instrumented',
      description:
        'Beta metric: merge-request completion from intent to submission, including step-level drop-off.',
    },
    {
      icon: 'feedback',
      title: 'Feedback confidence measured',
      description:
        'Beta metric: contributor confidence after tasks involving permissions, authorship, and credit.',
    },
    {
      icon: 'handoff',
      title: 'Handoff readiness tracked',
      description: 'Beta metric: median turnaround from request submission to final decision.',
    },
  ],
}

const MERGE_USABILITY_TESTING = {
  label: 'Testing',
  title: 'Usability testing surfaced two capabilities needed for deeper creative work',
  description:
    'Testers validated the core merge flow, then asked for recording and cross-device continuity.',
  items: [
    {
      title: 'Native audio capture in merge flow',
      body: 'Creators wanted to record audio directly in Merge, not rely only on imported samples.',
      implicationLabel: 'Design implication:',
      implication:
        'add in-app recording with take management so audio-first workflows stay native.',
    },
    {
      title: 'Continue on iPad for precision work',
      body: 'Creators asked for a "Continue on iPad" handoff to move from phone to a larger stylus-friendly canvas.',
      implicationLabel: 'Design implication:',
      implication:
        'add cross-device session continuity with state-preserving handoff across screen sizes.',
    },
  ],
}

const MERGE_REFLECTION = {
  label: 'Reflection',
  title: 'Building Merge taught me that collaboration UX is a systems problem',
  description:
    'The biggest lesson: participation breaks down when ownership and permissions are unclear.',
  items: [
    {
      title: 'Trust precedes participation',
      body: 'Creators engage more when permissions, credit, and decision history are explicit.',
    },
    {
      title: 'Collaboration is state-driven',
      body: 'Clear request, review, and merge states turned a vague social action into a reliable workflow.',
    },
    {
      title: 'Design-dev pairing de-risked the concept',
      body: 'Designing alongside implementation constraints produced a stronger, ship-ready system.',
    },
  ],
}

const GROUP_COLLECTIONS_DESIGN_INTENT = {
  label: 'Design Intent',
  title: 'Make groups easy to discover and run',
  description:
    'The core goal was dual-sided: members should quickly find credible communities, while admins should manage access and governance without heavy operational overhead.',
  bezelUrl: groupCollectionPhoneBezel,
  videoUrl: groupCollectionDesignIntentVideo,
}

const GROUP_COLLECTIONS_SYSTEM_SCOPE = {
  label: 'The System / Scope',
  title: 'Group Collection was designed as one connected product system',
  description:
    'The entry point stays lightweight while operational work moves into dedicated, role-specific flows.',
  caption: 'Information Architecture',
}

const GROUP_COLLECTIONS_PRINCIPLES = {
  label: 'Design Principles',
  title: 'Top principles that shaped Group Collection',
  description:
    'These principles guided discovery behavior, moderation operations, and role clarity across the full system.',
  cards: [
    {
      title: 'Progressive discovery',
      description:
        'Start with a small, curated entry point and expand only when users ask for deeper browsing.',
      align: 'left',
      videoUrl: groupCollectionCuratedRecGroupsVideo,
    },
    {
      title: 'Workflow moderation',
      description:
        'Centralize join-request handling so moderation feels operational and scalable, not scattered.',
      align: 'right',
      videoUrl: groupCollectionCentralizedRequestsVideo,
    },
    {
      title: 'Authority boundaries',
      description:
        'Make Primary vs Second Admin responsibilities explicit in the UI to prevent permission ambiguity.',
      align: 'left',
      videoUrl: groupCollectionBoundariesVideo,
    },
  ],
}

const GROUP_COLLECTIONS_FINAL_DESIGN = {
  label: 'Final Design',
  title: 'Group Collection was shaped as a connected experience across three moments.',
  description:
    'How a community is found, how it is entered, and how it is sustained. Together, these flows position groups as a more intentional layer of professional networking inside Superstars.',
  steps: [
    {
      title: 'Entering the Network',
      description:
        'Discovery starts focused, then expands as intent becomes clearer. Users see relevance early before exploring further.',
      align: 'left',
      layout: 'wide',
      mediaItems: [
        {
          videoUrl: groupCollectionViewGroupVideo,
          bezelUrl: groupCollectionIpadBezel,
          device: 'ipad',
          caption: 'Groups Hub + View All Groups',
        },
      ],
    },
    {
      title: 'Crossing the Threshold',
      description:
        'Participation balances member trust with admin clarity in one flow. Users assess fit while admins manage access with clearer context.',
      align: 'right',
      layout: 'dual',
      mediaItems: [
        {
          videoUrl: groupCollectionGroupPageVideo,
          bezelUrl: groupCollectionPhoneBezel,
          caption: 'Group Page',
        },
        {
          videoUrl: groupCollectionJoinRequestVideo,
          bezelUrl: groupCollectionPhoneBezel,
          caption: 'Join Requests',
        },
      ],
    },
    {
      title: 'Holding the Structure',
      description:
        'Governance stays lightweight to start, with clear authority boundaries. Creation and settings support continuity without ambiguity.',
      align: 'left',
      layout: 'dual',
      mediaItems: [
        {
          videoUrl: groupCollectionCreateGroupVideo,
          bezelUrl: groupCollectionPhoneBezel,
          caption: 'Create Group',
        },
        {
          videoUrl: groupCollectionEditGroupVideo,
          bezelUrl: groupCollectionPhoneBezel,
          caption: 'Edit Group',
        },
      ],
    },
  ],
}

const GROUP_COLLECTIONS_EDGE_CASES = {
  label: 'Edge Cases / System Thinking',
  title: 'The experience had to work beyond the ideal path',
  description:
    'Pre-launch quality depended on handling ambiguity, scale, and empty states clearly.',
  cards: [
    {
      index: '1',
      text: 'If a group has no Second Admin, that state should be visible and easy to resolve.',
    },
    {
      index: '2',
      text: 'If request volume grows, sorting and future bulk actions should reduce triage cost.',
    },
    {
      index: '3',
      text: 'If a Second Admin reaches ownership-level controls, boundaries should be explained in context.',
    },
    {
      index: '4',
      text: 'If requests are empty or membership is sparse, empty states should still guide next actions.',
    },
    {
      index: '5',
      text: 'If requests are empty or membership is sparse, empty states should still guide next actions.',
    },
  ],
}

const GROUP_COLLECTIONS_EXPECTED_IMPACT = {
  label: 'Expected Impact',
  title: 'Because Group Collection is pre-launch, success is framed as measurable hypotheses.',
  description:
    'Higher group discovery and group-page visits, stronger request-to-approval conversion, lower review time for join requests, reduced admin effort per approved member, and fewer permission-related mistakes.',
}

const GROUP_COLLECTIONS_REFLECTION = {
  label: 'Reflection',
  title: 'The hardest part was not the interface. It was the authority model.',
  description:
    'Community features succeed when member experience and admin operations are designed together.',
  support:
    'Designing Group Collection reinforced that product coherence comes from linking discovery, moderation, and governance as one system. Once ownership boundaries were explicit, the product felt safer, more scalable, and more trustworthy for both members and operators.',
}

const GROUP_COLLECTIONS_THANK_YOU = {
  title: 'Thank you!',
}

const PROJECT_CARDS = [
  {
    id: 'case-1',
    headline: 'Adding a community layer to a video-first professional network',
    description: (
      <>
        Adding a community layer to a
        <br />
        video-first professional network
      </>
    ),
    metaDetails: GROUP_COLLECTIONS_META_DETAILS,
    previewImageUrl: communityLayerCardImage,
    previewVideoUrl: homecardVideo,
    previewArrowUrl: caseCardArrow,
    mediaVideoUrl: groupCollectionDemoVideo,
    mediaPosterUrl: groupCollectionDemoPoster,
    opportunity: GROUP_COLLECTIONS_OPPORTUNITY,
    problem: GROUP_COLLECTIONS_PROBLEM,
    designIntent: GROUP_COLLECTIONS_DESIGN_INTENT,
    systemScope: GROUP_COLLECTIONS_SYSTEM_SCOPE,
    principles: GROUP_COLLECTIONS_PRINCIPLES,
    finalDesign: GROUP_COLLECTIONS_FINAL_DESIGN,
    edgeCases: GROUP_COLLECTIONS_EDGE_CASES,
    expectedImpact: GROUP_COLLECTIONS_EXPECTED_IMPACT,
    reflection: GROUP_COLLECTIONS_REFLECTION,
    thankYou: GROUP_COLLECTIONS_THANK_YOU,
  },
  {
    id: 'case-2',
    headline: 'Designing a collaboration-first social platform for creatives',
    description: (
      <>
        Designing a collaboration-first
        <br />
        social platform for creatives
      </>
    ),
    previewImageUrl: mergeCardPoster,
    previewVideoUrl: mergeHomecardVideo,
    previewArrowUrl: caseCardArrow,
    mediaVideoUrl: mergeHeroVideo,
    mediaPosterUrl: mergeCardPoster,
    metaDetails: MERGE_META_DETAILS,
    opportunity: null,
    problem: MERGE_PROBLEM,
    research: MERGE_RESEARCH,
    mergeOpportunity: MERGE_OPPORTUNITY,
    mergeSolution: MERGE_SOLUTION,
    mergeCoreExperience: MERGE_CORE_EXPERIENCE,
    mergeFinalDesign: MERGE_FINAL_DESIGN,
    mergeDesignDecisions: MERGE_DESIGN_DECISIONS,
    mergeTrust: MERGE_TRUST,
    mergeOutcome: MERGE_OUTCOME,
    mergeUsabilityTesting: MERGE_USABILITY_TESTING,
    mergeReflection: MERGE_REFLECTION,
    designIntent: null,
    systemScope: null,
    principles: null,
    finalDesign: null,
    edgeCases: null,
    expectedImpact: null,
    reflection: null,
    thankYou: null,
  },
]

const SECTION_COUNT = 1 + PROJECT_CARDS.length
const WHEEL_TRIGGER_THRESHOLD = 7
const WHEEL_RESET_MS = 180
const WHEEL_GESTURE_IDLE_MS = 180
const SWIPE_TRIGGER_THRESHOLD = 36
const INPUT_DEBOUNCE_MS = 160
const INTRO_DISPLAY_MS = 1600
const INTRO_NAME_FADE_MS = 620
const INTRO_STAGGER_MS = 520
const INTRO_META_FADE_MS = 620
const INTRO_POST_FADE_HOLD_MS = 620
const INTRO_LOGO_FADE_MS = 1200
const INTRO_HERO_TEXT_WINDOW_MS = 3200
const CURSOR_FOLLOW_LERP = 0.28
const CURSOR_SNAP_DISTANCE = 0.35
const CURSOR_INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, label, [role="button"], [data-cursor-hover]'
const VIEW_STATE_STORAGE_KEY = 'portfolio1.groupCollectionsViewState'
const CONTACT_CONTAINER_VIEWPORT_PADDING = 16
const CONTACT_LINKS = {
  email: 'mailto:hello@example.com',
  phone: 'tel:+10000000000',
  linkedin: 'https://www.linkedin.com/in/your-handle',
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getContactContainerRect(node) {
  if (!node || typeof window === 'undefined') {
    return null
  }

  const rect = node.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const maxWidth = viewportWidth - CONTACT_CONTAINER_VIEWPORT_PADDING * 2
  const maxHeight = viewportHeight - CONTACT_CONTAINER_VIEWPORT_PADDING * 2

  if (rect.width <= 0 || rect.height <= 0 || maxWidth <= 0 || maxHeight <= 0) {
    return null
  }

  const isOffscreenHorizontally =
    rect.right <= CONTACT_CONTAINER_VIEWPORT_PADDING ||
    rect.left >= viewportWidth - CONTACT_CONTAINER_VIEWPORT_PADDING
  const isOffscreenVertically =
    rect.bottom <= CONTACT_CONTAINER_VIEWPORT_PADDING ||
    rect.top >= viewportHeight - CONTACT_CONTAINER_VIEWPORT_PADDING

  if (isOffscreenHorizontally || isOffscreenVertically) {
    return null
  }

  const width = Math.min(rect.width, maxWidth)
  const height = Math.min(rect.height, maxHeight)

  return {
    top: clamp(
      rect.top,
      CONTACT_CONTAINER_VIEWPORT_PADDING,
      viewportHeight - CONTACT_CONTAINER_VIEWPORT_PADDING - height
    ),
    left: clamp(
      rect.left,
      CONTACT_CONTAINER_VIEWPORT_PADDING,
      viewportWidth - CONTACT_CONTAINER_VIEWPORT_PADDING - width
    ),
    width,
    height,
  }
}

function MergeOutcomeIcon({ kind }) {
  if (kind === 'instrumented') {
    return (
      <svg viewBox="0 0 40 40" className="merge-outcome-icon-svg" aria-hidden="true">
        <rect x="9" y="8" width="22" height="24" rx="3.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="M14 18L18 22L26 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 27H26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (kind === 'feedback') {
    return (
      <svg viewBox="0 0 40 40" className="merge-outcome-icon-svg" aria-hidden="true">
        <circle cx="16" cy="14" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="26" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="M10.5 28C11.6 23.8 15 21 19 21C23.5 21 27.2 24.3 27.9 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.5 25.5C24.3 23.5 26 22.2 28.1 22.2C30.5 22.2 32.5 23.9 33 26.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 40 40" className="merge-outcome-icon-svg" aria-hidden="true">
      <path
        d="M20 30V10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 17.5L20 10L27.5 17.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 31H29"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function App() {
  const parseInitialViewState = useCallback(() => {
    const fallbackState = {
      showIntro: true,
      sectionIndex: 0,
      openProjectIndex: null,
      caseScrollTop: 0,
    }

    if (typeof window === 'undefined') {
      return fallbackState
    }

    let parsedState = null

    try {
      const rawStoredState = window.sessionStorage.getItem(VIEW_STATE_STORAGE_KEY)
      if (rawStoredState) {
        const maybeState = JSON.parse(rawStoredState)
        if (maybeState && typeof maybeState === 'object') {
          parsedState = maybeState
        }
      }
    } catch {
      parsedState = null
    }

    let sectionIndex = Number.isInteger(parsedState?.sectionIndex)
      ? parsedState.sectionIndex
      : fallbackState.sectionIndex
    sectionIndex = Math.max(0, Math.min(SECTION_COUNT - 1, sectionIndex))

    let openProjectIndex = Number.isInteger(parsedState?.openProjectIndex)
      ? parsedState.openProjectIndex
      : fallbackState.openProjectIndex
    if (!Number.isInteger(openProjectIndex) || openProjectIndex < 0 || openProjectIndex >= PROJECT_CARDS.length) {
      openProjectIndex = null
    }

    let caseScrollTop = Number.isFinite(parsedState?.caseScrollTop) ? parsedState.caseScrollTop : 0
    if (caseScrollTop < 0) {
      caseScrollTop = 0
    }

    const hashValue = window.location.hash.replace('#', '').trim()
    const projectMatch = hashValue.match(/^project-(\d+)$/)
    const sectionMatch = hashValue.match(/^section-(\d+)$/)

    if (projectMatch) {
      const projectNumber = Number.parseInt(projectMatch[1], 10) - 1
      if (Number.isInteger(projectNumber) && projectNumber >= 0 && projectNumber < PROJECT_CARDS.length) {
        openProjectIndex = projectNumber
      }
    } else if (sectionMatch) {
      const sectionNumber = Number.parseInt(sectionMatch[1], 10)
      if (Number.isInteger(sectionNumber)) {
        sectionIndex = Math.max(0, Math.min(SECTION_COUNT - 1, sectionNumber))
      }
      openProjectIndex = null
      caseScrollTop = 0
    }

    const shouldSkipIntro = Boolean(parsedState?.showIntro === false || openProjectIndex !== null || sectionIndex > 0)

    return {
      showIntro: !shouldSkipIntro,
      sectionIndex,
      openProjectIndex,
      caseScrollTop,
    }
  }, [])

  const [initialViewState] = useState(() => parseInitialViewState())
  const [isCaseDescriptionVisible, setCaseDescriptionVisible] = useState(
    !initialViewState.showIntro &&
      initialViewState.openProjectIndex === null &&
      initialViewState.sectionIndex > 0
  )
  const [isContactModalOpen, setContactModalOpen] = useState(false)
  const [isSystemScopeZoomOpen, setSystemScopeZoomOpen] = useState(false)
  const [isIntroVisible, setIntroVisible] = useState(initialViewState.showIntro)
  const [isIntroNameFading, setIntroNameFading] = useState(false)
  const [isIntroMetaFading, setIntroMetaFading] = useState(false)
  const [isIntroLogoFading, setIntroLogoFading] = useState(false)
  const [isIntroHeroTextVisible, setIntroHeroTextVisible] = useState(false)
  const [isHeroReady, setHeroReady] = useState(!initialViewState.showIntro)
  const [heroAnimationSeed, setHeroAnimationSeed] = useState(0)
  const [openProjectIndex, setOpenProjectIndex] = useState(initialViewState.openProjectIndex)
  const [outgoingHomePreviewIndex, setOutgoingHomePreviewIndex] = useState(null)
  const activeSectionRef = useRef(initialViewState.sectionIndex)
  const [caseStripeMode, setCaseStripeMode] = useState(() =>
    !initialViewState.showIntro &&
      initialViewState.openProjectIndex === null &&
      initialViewState.sectionIndex > 0
      ? 'fixed'
      : 'hidden'
  )
  const isTransitioningRef = useRef(false)
  const mainRef = useRef(null)
  const trackRef = useRef(null)
  const trackTweenRef = useRef(null)
  const accumulatedWheelDeltaRef = useRef(0)
  const wheelResetTimeoutRef = useRef(null)
  const wheelGestureIdleTimeoutRef = useRef(null)
  const wheelGestureConsumedRef = useRef(false)
  const touchStartYRef = useRef(null)
  const touchGestureConsumedRef = useRef(false)
  const lastInputAtRef = useRef(0)
  const caseMediaRefs = useRef([])
  const fixedSkillsOverlayRef = useRef(null)
  const [contactContainerRect, setContactContainerRect] = useState(null)
  const [isCustomCursorEnabled] = useState(true)
  const [isCursorVisible, setCursorVisible] = useState(false)
  const [isCursorExpanded, setCursorExpanded] = useState(false)
  const cursorRef = useRef(null)
  const cursorIsVisibleRef = useRef(false)
  const cursorIsExpandedRef = useRef(false)
  const cursorTargetPositionRef = useRef({ x: 0, y: 0 })
  const cursorCurrentPositionRef = useRef({ x: 0, y: 0 })
  const cursorHasPositionRef = useRef(false)
  const isProjectOpen = openProjectIndex !== null
  const isProjectContentVisible = isProjectOpen
  const hydratedCaseScrollTopRef = useRef(initialViewState.caseScrollTop)

  const persistViewState = useCallback(
    (overrides = {}) => {
      if (typeof window === 'undefined') {
        return
      }

      const mainNode = mainRef.current
      const nextState = {
        showIntro: false,
        sectionIndex: activeSectionRef.current,
        openProjectIndex,
        caseScrollTop: openProjectIndex !== null ? Math.round(mainNode?.scrollTop ?? 0) : 0,
        ...overrides,
      }

      try {
        window.sessionStorage.setItem(VIEW_STATE_STORAGE_KEY, JSON.stringify(nextState))
      } catch {
        return
      }
    },
    [openProjectIndex]
  )

  const syncLocationHash = useCallback(() => {
    if (typeof window === 'undefined') {
      return
    }

    const nextHash = openProjectIndex !== null ? `project-${openProjectIndex + 1}` : `section-${activeSectionRef.current}`
    const currentHash = window.location.hash.replace('#', '')
    if (currentHash === nextHash) {
      return
    }

    window.history.replaceState(null, '', `#${nextHash}`)
  }, [openProjectIndex])

  const handleOpenCaseProject = useCallback(
    (index) => {
      if (openProjectIndex !== null) {
        return
      }

      if (trackTweenRef.current) {
        trackTweenRef.current.kill()
        trackTweenRef.current = null
      }

      isTransitioningRef.current = false
      setCaseDescriptionVisible(false)
      setCaseStripeMode('hidden')
      setOutgoingHomePreviewIndex(null)
      setOpenProjectIndex(index)
      wheelGestureConsumedRef.current = false
      touchGestureConsumedRef.current = false
      accumulatedWheelDeltaRef.current = 0

      if (wheelResetTimeoutRef.current) {
        window.clearTimeout(wheelResetTimeoutRef.current)
      }
      if (wheelGestureIdleTimeoutRef.current) {
        window.clearTimeout(wheelGestureIdleTimeoutRef.current)
      }

      if (mainRef.current) {
        mainRef.current.scrollTop = 0
      }

      if (trackRef.current) {
        gsap.set(trackRef.current, { yPercent: 0 })
      }

      persistViewState({
        showIntro: false,
        openProjectIndex: index,
        sectionIndex: activeSectionRef.current,
        caseScrollTop: 0,
      })
    },
    [openProjectIndex, persistViewState]
  )

  const measureContactContainerRect = useCallback(() => {
    if (openProjectIndex !== null) {
      const mediaNode = caseMediaRefs.current[openProjectIndex] ?? null
      setContactContainerRect(getContactContainerRect(mediaNode))
      return
    }

    const activeMediaIndex = Math.max(activeSectionRef.current - 1, 0)
    const mediaNode = caseMediaRefs.current[activeMediaIndex] ?? caseMediaRefs.current[0] ?? null

    setContactContainerRect(getContactContainerRect(mediaNode))
  }, [openProjectIndex])

  const goToSection = useCallback(
    (targetIndex) => {
      if (isProjectOpen) {
        return
      }

      const clampedIndex = Math.max(0, Math.min(SECTION_COUNT - 1, targetIndex))
      if (clampedIndex === activeSectionRef.current || isTransitioningRef.current) {
        return
      }

      const previousIndex = activeSectionRef.current
      const isEnteringCaseCanvas = previousIndex === 0 && clampedIndex > 0
      const isLeavingCaseCanvas = previousIndex > 0 && clampedIndex === 0

      isTransitioningRef.current = true
      activeSectionRef.current = clampedIndex
      if (isEnteringCaseCanvas || isLeavingCaseCanvas) {
        setCaseStripeMode('section')
      } else {
        setCaseStripeMode(clampedIndex > 0 ? 'fixed' : 'hidden')
      }
      setOutgoingHomePreviewIndex(previousIndex > 0 ? previousIndex - 1 : null)
      setCaseDescriptionVisible(false)
      persistViewState({
        showIntro: false,
        openProjectIndex: null,
        sectionIndex: clampedIndex,
        caseScrollTop: 0,
      })
      syncLocationHash()

      if (!trackRef.current) {
        return
      }

      if (trackTweenRef.current) {
        trackTweenRef.current.kill()
      }

      trackTweenRef.current = gsap.to(trackRef.current, {
        yPercent: -clampedIndex * 100,
        duration: 1.9,
        ease: 'power1.inOut',
        overwrite: 'auto',
        force3D: true,
        onComplete: () => {
          isTransitioningRef.current = false
          setCaseStripeMode(activeSectionRef.current > 0 ? 'fixed' : 'hidden')
          setOutgoingHomePreviewIndex(null)
          setCaseDescriptionVisible(activeSectionRef.current > 0)
          if (activeSectionRef.current === 0) {
            setHeroAnimationSeed((seed) => seed + 1)
          }
          trackTweenRef.current = null
        },
      })
    },
    [isProjectOpen, persistViewState, syncLocationHash]
  )

  const scheduleWheelGestureReset = useCallback(() => {
    if (wheelGestureIdleTimeoutRef.current) {
      window.clearTimeout(wheelGestureIdleTimeoutRef.current)
    }

    wheelGestureIdleTimeoutRef.current = window.setTimeout(() => {
      wheelGestureConsumedRef.current = false
      accumulatedWheelDeltaRef.current = 0
    }, WHEEL_GESTURE_IDLE_MS)
  }, [])

  const handleMainWheel = useCallback(
    (event) => {
      if (isProjectOpen) {
        return
      }

      if (isContactModalOpen) {
        event.preventDefault()
        return
      }

      const { deltaX, deltaY } = event
      if (Math.abs(deltaY) <= Math.abs(deltaX)) {
        return
      }

      scheduleWheelGestureReset()

      if (wheelGestureConsumedRef.current || isTransitioningRef.current) {
        event.preventDefault()
        return
      }

      accumulatedWheelDeltaRef.current += deltaY

      if (wheelResetTimeoutRef.current) {
        window.clearTimeout(wheelResetTimeoutRef.current)
      }

      wheelResetTimeoutRef.current = window.setTimeout(() => {
        accumulatedWheelDeltaRef.current = 0
      }, WHEEL_RESET_MS)

      if (Math.abs(accumulatedWheelDeltaRef.current) < WHEEL_TRIGGER_THRESHOLD) {
        return
      }

      const now = Date.now()
      if (now - lastInputAtRef.current < INPUT_DEBOUNCE_MS) {
        return
      }
      lastInputAtRef.current = now

      const direction = accumulatedWheelDeltaRef.current > 0 ? 1 : -1
      accumulatedWheelDeltaRef.current = 0
      wheelGestureConsumedRef.current = true
      event.preventDefault()
      goToSection(activeSectionRef.current + direction)
    },
    [goToSection, isContactModalOpen, isProjectOpen, scheduleWheelGestureReset]
  )

  const handleTouchStart = useCallback(
    (event) => {
      if (isProjectOpen) {
        return
      }

      touchStartYRef.current = event.touches[0]?.clientY ?? null
      touchGestureConsumedRef.current = false
    },
    [isProjectOpen]
  )

  const handleTouchMove = useCallback(
    (event) => {
      if (isProjectOpen) {
        return
      }

      if (isContactModalOpen) {
        event.preventDefault()
        return
      }

      const startY = touchStartYRef.current
      const currentY = event.touches[0]?.clientY
      if (startY === null || typeof currentY !== 'number') {
        return
      }

      const deltaY = startY - currentY
      if (Math.abs(deltaY) < SWIPE_TRIGGER_THRESHOLD) {
        return
      }

      if (touchGestureConsumedRef.current || isTransitioningRef.current) {
        event.preventDefault()
        return
      }

      const now = Date.now()
      if (now - lastInputAtRef.current < INPUT_DEBOUNCE_MS) {
        return
      }
      lastInputAtRef.current = now

      touchGestureConsumedRef.current = true
      event.preventDefault()
      goToSection(activeSectionRef.current + (deltaY > 0 ? 1 : -1))
    },
    [goToSection, isContactModalOpen, isProjectOpen]
  )

  const handleTouchEnd = useCallback(() => {
    touchStartYRef.current = null
    touchGestureConsumedRef.current = false
  }, [])

  const handleContactClick = useCallback(() => {
    setContactModalOpen((isOpen) => {
      if (!isOpen) {
        measureContactContainerRect()
      }
      return !isOpen
    })
  }, [measureContactContainerRect])

  const closeContactModal = useCallback(() => {
    setContactModalOpen(false)
  }, [])

  const handleHomeClick = useCallback(() => {
    closeContactModal()
    setSystemScopeZoomOpen(false)

    if (trackTweenRef.current) {
      trackTweenRef.current.kill()
      trackTweenRef.current = null
    }

    isTransitioningRef.current = false
    setOutgoingHomePreviewIndex(null)
    wheelGestureConsumedRef.current = false
    touchGestureConsumedRef.current = false
    accumulatedWheelDeltaRef.current = 0

    if (wheelResetTimeoutRef.current) {
      window.clearTimeout(wheelResetTimeoutRef.current)
    }
    if (wheelGestureIdleTimeoutRef.current) {
      window.clearTimeout(wheelGestureIdleTimeoutRef.current)
    }

    if (mainRef.current) {
      mainRef.current.scrollTop = 0
    }

    if (openProjectIndex !== null) {
      setOpenProjectIndex(null)
      setCaseDescriptionVisible(false)
      setCaseStripeMode('hidden')
      setHeroAnimationSeed((seed) => seed + 1)

      if (trackRef.current) {
        gsap.set(trackRef.current, { yPercent: 0 })
      }

      activeSectionRef.current = 0

      persistViewState({
        showIntro: false,
        openProjectIndex: null,
        sectionIndex: 0,
        caseScrollTop: 0,
      })

      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', '#section-0')
      }

      return
    }

    if (activeSectionRef.current === 0) {
      persistViewState({
        showIntro: false,
        openProjectIndex: null,
        sectionIndex: 0,
        caseScrollTop: 0,
      })

      if (typeof window !== 'undefined' && window.location.hash.replace('#', '') !== 'section-0') {
        window.history.replaceState(null, '', '#section-0')
      }

      return
    }

    goToSection(0)
  }, [closeContactModal, goToSection, openProjectIndex, persistViewState])

  useEffect(() => {
    if (!isIntroVisible) {
      return undefined
    }

    const nameFadeStartMs = INTRO_DISPLAY_MS
    const metaFadeStartMs = INTRO_DISPLAY_MS + INTRO_NAME_FADE_MS + INTRO_STAGGER_MS
    const logoFadeStartMs = metaFadeStartMs + INTRO_META_FADE_MS + INTRO_STAGGER_MS
    const heroTextStartMs = logoFadeStartMs + INTRO_LOGO_FADE_MS + INTRO_STAGGER_MS
    const hideSplashMs = heroTextStartMs + INTRO_HERO_TEXT_WINDOW_MS + INTRO_POST_FADE_HOLD_MS
    const timeouts = []

    const nameFadeTimeout = window.setTimeout(() => {
      setIntroNameFading(true)
    }, nameFadeStartMs)
    timeouts.push(nameFadeTimeout)

    const metaFadeTimeout = window.setTimeout(() => {
      setIntroMetaFading(true)
    }, metaFadeStartMs)
    timeouts.push(metaFadeTimeout)

    const logoFadeTimeout = window.setTimeout(() => {
      setIntroLogoFading(true)
    }, logoFadeStartMs)
    timeouts.push(logoFadeTimeout)

    const introHeroTextTimeout = window.setTimeout(() => {
      setIntroHeroTextVisible(true)
    }, heroTextStartMs)
    timeouts.push(introHeroTextTimeout)

    const hideTimeout = window.setTimeout(() => {
      const introExitSectionIndex = SECTION_COUNT > 1 ? 1 : 0
      setIntroVisible(false)
      setHeroReady(true)
      activeSectionRef.current = introExitSectionIndex
      setCaseStripeMode(introExitSectionIndex > 0 ? 'fixed' : 'hidden')
      setCaseDescriptionVisible(introExitSectionIndex > 0)

      if (trackTweenRef.current) {
        trackTweenRef.current.kill()
        trackTweenRef.current = null
      }

      if (trackRef.current) {
        gsap.set(trackRef.current, { yPercent: -introExitSectionIndex * 100 })
      }

      persistViewState({
        showIntro: false,
        openProjectIndex: null,
        sectionIndex: introExitSectionIndex,
        caseScrollTop: 0,
      })
    }, hideSplashMs)
    timeouts.push(hideTimeout)

    return () => {
      timeouts.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
    }
  }, [isIntroVisible, persistViewState])

  useEffect(() => {
    const trackNode = trackRef.current

    if (trackNode) {
      const initialYPercent =
        !initialViewState.showIntro && initialViewState.openProjectIndex === null
          ? -initialViewState.sectionIndex * 100
          : 0

      gsap.set(trackNode, { yPercent: initialYPercent })
    }

    return () => {
      if (wheelResetTimeoutRef.current) {
        window.clearTimeout(wheelResetTimeoutRef.current)
      }
      if (wheelGestureIdleTimeoutRef.current) {
        window.clearTimeout(wheelGestureIdleTimeoutRef.current)
      }
      if (trackTweenRef.current) {
        trackTweenRef.current.kill()
      } else if (trackNode) {
        gsap.killTweensOf(trackNode)
      }
    }
  }, [initialViewState.openProjectIndex, initialViewState.sectionIndex, initialViewState.showIntro])

  useEffect(() => {
    syncLocationHash()
  }, [syncLocationHash])

  useEffect(() => {
    if (!isProjectOpen) {
      return undefined
    }

    const mainNode = mainRef.current
    if (!mainNode) {
      return undefined
    }

    if (hydratedCaseScrollTopRef.current > 0) {
      const scrollTopToRestore = hydratedCaseScrollTopRef.current
      window.requestAnimationFrame(() => {
        if (mainRef.current) {
          mainRef.current.scrollTop = scrollTopToRestore
        }
      })
      hydratedCaseScrollTopRef.current = 0
    }

    const handleProjectScroll = () => {
      persistViewState({
        showIntro: false,
        openProjectIndex,
        sectionIndex: activeSectionRef.current,
        caseScrollTop: Math.round(mainNode.scrollTop),
      })
    }

    mainNode.addEventListener('scroll', handleProjectScroll, { passive: true })

    return () => {
      mainNode.removeEventListener('scroll', handleProjectScroll)
    }
  }, [isProjectOpen, openProjectIndex, persistViewState])

  useEffect(() => {
    const handlePageHide = () => {
      persistViewState()
    }

    window.addEventListener('pagehide', handlePageHide)
    return () => {
      window.removeEventListener('pagehide', handlePageHide)
    }
  }, [persistViewState])

  useEffect(() => {
    if (!isContactModalOpen) {
      return undefined
    }

    const updateContactContainerRect = () => {
      measureContactContainerRect()
    }

    updateContactContainerRect()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeContactModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', updateContactContainerRect)
    window.addEventListener('orientationchange', updateContactContainerRect)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', updateContactContainerRect)
      window.removeEventListener('orientationchange', updateContactContainerRect)
    }
  }, [closeContactModal, isContactModalOpen, measureContactContainerRect])

  useEffect(() => {
    if (!isSystemScopeZoomOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSystemScopeZoomOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSystemScopeZoomOpen])

  useEffect(() => {
    if (!isCustomCursorEnabled) {
      cursorIsVisibleRef.current = false
      cursorIsExpandedRef.current = false
      cursorHasPositionRef.current = false
      return undefined
    }

    const root = document.documentElement
    const cursorNode = cursorRef.current
    if (!cursorNode) {
      return undefined
    }

    root.classList.add('has-custom-cursor')

    let rafId = null

    const animateCursor = () => {
      const target = cursorTargetPositionRef.current
      const current = cursorCurrentPositionRef.current

      current.x += (target.x - current.x) * CURSOR_FOLLOW_LERP
      current.y += (target.y - current.y) * CURSOR_FOLLOW_LERP

      if (Math.abs(target.x - current.x) < CURSOR_SNAP_DISTANCE) {
        current.x = target.x
      }
      if (Math.abs(target.y - current.y) < CURSOR_SNAP_DISTANCE) {
        current.y = target.y
      }

      cursorNode.style.left = `${current.x}px`
      cursorNode.style.top = `${current.y}px`

      if (current.x === target.x && current.y === target.y) {
        rafId = null
        return
      }

      rafId = window.requestAnimationFrame(animateCursor)
    }

    const ensureCursorAnimation = () => {
      if (rafId !== null) {
        return
      }
      rafId = window.requestAnimationFrame(animateCursor)
    }

    const updateHoverState = (target) => {
      const isInteractive =
        target instanceof Element && Boolean(target.closest(CURSOR_INTERACTIVE_SELECTOR))

      if (cursorIsExpandedRef.current !== isInteractive) {
        cursorIsExpandedRef.current = isInteractive
        setCursorExpanded(isInteractive)
      }

      const shouldCursorBeVisible = !isInteractive
      if (cursorIsVisibleRef.current !== shouldCursorBeVisible) {
        cursorIsVisibleRef.current = shouldCursorBeVisible
        setCursorVisible(shouldCursorBeVisible)
      }
    }

    const handleMouseMove = (event) => {
      const x = event.clientX
      const y = event.clientY
      cursorTargetPositionRef.current.x = x
      cursorTargetPositionRef.current.y = y

      if (!cursorHasPositionRef.current) {
        cursorHasPositionRef.current = true
        cursorCurrentPositionRef.current.x = x
        cursorCurrentPositionRef.current.y = y
        cursorNode.style.left = `${x}px`
        cursorNode.style.top = `${y}px`
      }

      ensureCursorAnimation()
      updateHoverState(event.target)
    }

    const handleWindowMouseOut = (event) => {
      if (event.relatedTarget !== null) {
        return
      }

      cursorIsVisibleRef.current = false
      setCursorVisible(false)
      if (cursorIsExpandedRef.current) {
        cursorIsExpandedRef.current = false
        setCursorExpanded(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleWindowMouseOut)

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleWindowMouseOut)
      root.classList.remove('has-custom-cursor')
    }
  }, [isCustomCursorEnabled])

  return (
    <div className="landing-page">
      <Navbar
        isContactModalOpen={isContactModalOpen}
        onContactClick={handleContactClick}
        onHomeClick={handleHomeClick}
      />
      <main
        ref={mainRef}
        className={`landing-main case-redesign-main ${isProjectOpen ? 'is-project-open' : ''} ${
          caseStripeMode ? `is-case-stripe-${caseStripeMode}` : ''
        }`.trim()}
        onWheel={handleMainWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label="Portfolio sections"
      >
        <div className={`sections-viewport ${isProjectOpen ? 'is-project-open' : ''}`.trim()}>
          <div ref={trackRef} className={`sections-track ${isProjectOpen ? 'is-project-open' : ''}`.trim()}>
            <section
              className={`section-panel section-panel-hero ${isProjectOpen ? 'is-hidden-project-panel' : ''}`.trim()}
              aria-label="Hero section"
            >
              {isHeroReady ? <ContentArea key={heroAnimationSeed} onNext={() => goToSection(1)} /> : null}
            </section>

            {PROJECT_CARDS.map((card, index) => {
              const isOpenProjectPanel = openProjectIndex === index
              const isPreviewChromeVisible = isCaseDescriptionVisible && !isProjectOpen
              const isOutgoingHomePreview = outgoingHomePreviewIndex === index
              const caseMediaStyle = card.mediaPosterUrl
                ? { '--case-media-poster': `url(${card.mediaPosterUrl})` }
                : undefined
              const shouldRenderHomePreview = !isProjectOpen
              const shouldRenderProjectHero = isOpenProjectPanel
              const isProjectStageActive = isOpenProjectPanel

              return (
                <section
                  key={card.id}
                  className={`section-panel section-panel-case-redesign ${
                    isProjectOpen
                      ? isOpenProjectPanel
                        ? `is-open-project-panel ${isProjectContentVisible ? 'is-project-content-visible' : ''}`
                        : 'is-hidden-project-panel'
                      : ''
                  }`.trim()}
                  aria-label="Case section"
                >
                  <section
                    className={`case-redesign-stage ${isProjectStageActive ? 'is-project-open' : ''}`.trim()}
                    aria-label="Project section"
                  >
                    {shouldRenderHomePreview ? (
                      <div
                        className={`case-home-preview ${isPreviewChromeVisible ? 'is-chrome-visible' : ''} ${
                          isOutgoingHomePreview ? 'is-outgoing-case' : ''
                        }`.trim()}
                        data-node-id="1012:2829"
                      >
                        <div className="case-home-preview-card-container" data-node-id="1027:1581">
                          <div className="case-home-preview-inner-card" data-node-id="1012:2839">
                            <div className="case-home-preview-image-container" data-node-id="1012:2823">
                              {card.previewVideoUrl ? (
                                <video
                                  src={card.previewVideoUrl}
                                  className="case-home-preview-image"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  preload="metadata"
                                  poster={card.previewImageUrl}
                                  aria-hidden="true"
                                />
                              ) : (
                                <img
                                  src={card.previewImageUrl}
                                  alt=""
                                  className="case-home-preview-image"
                                  loading="lazy"
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                          </div>

                          <div className="case-home-preview-description-container" data-node-id="1012:2826">
                            <p className="case-home-preview-title" data-node-id="1012:2827">
                              {card.description}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`case-home-preview-arrow-button ${
                            isPreviewChromeVisible ? 'is-chrome-visible' : ''
                          }`.trim()}
                          aria-label="Open project details"
                          onClick={() => handleOpenCaseProject(index)}
                          data-node-id="1012:2840"
                        >
                          <img src={card.previewArrowUrl} alt="" className="case-home-preview-arrow-icon" />
                        </button>
                      </div>
                    ) : null}

                    {shouldRenderProjectHero ? (
                      <div className="case-redesign-card-container is-project-open">
                        <div className="case-redesign-media-shell">
                          <div
                            className={`case-redesign-project-header ${
                              isOpenProjectPanel && isProjectContentVisible ? 'is-visible' : ''
                            }`.trim()}
                          >
                            <h1 className="case-redesign-project-title">{card.headline}</h1>
                          </div>

                          <div
                            className="case-redesign-media is-project-open"
                            style={caseMediaStyle}
                            ref={(node) => {
                              caseMediaRefs.current[index] = node
                            }}
                            role="img"
                            aria-label="Project media cover"
                          >
                            {card.mediaVideoUrl ? (
                              <video
                                src={card.mediaVideoUrl}
                                className="case-redesign-media-video"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                poster={card.mediaPosterUrl}
                                aria-hidden="true"
                              />
                            ) : null}
                          </div>

                          {card.metaDetails ? (
                            <div
                              className={`case-redesign-meta ${
                                isOpenProjectPanel && isProjectContentVisible ? 'is-visible' : ''
                              }`.trim()}
                              aria-label="Project meta details"
                            >
                              {card.metaDetails.map((detail) => (
                                <article key={detail.label} className="case-redesign-meta-item">
                                  <p className="case-redesign-meta-label">{detail.label}</p>
                                  <p className="case-redesign-meta-value">{detail.value}</p>
                                  {detail.support ? (
                                    <p className="case-redesign-meta-support">{detail.support}</p>
                                  ) : null}
                                </article>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </section>

                  {isOpenProjectPanel && card.opportunity ? (
                    <section
                      className="case-redesign-content-section case-redesign-opportunity"
                      aria-label="Opportunity section"
                    >
                      <div className="case-redesign-opportunity-inner">
                        <p className="case-redesign-opportunity-label">{card.opportunity.label}</p>
                        <h2 className="case-redesign-opportunity-title">{card.opportunity.title}</h2>
                        <p className="case-redesign-opportunity-description">{card.opportunity.description}</p>

                        <img
                          src={groupCollectionAvatars}
                          alt=""
                          className="case-redesign-opportunity-avatars-image"
                          loading="lazy"
                          aria-hidden="true"
                        />
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.problem ? (
                    <section
                      className="case-redesign-content-section case-redesign-problem"
                      aria-label="Problem section"
                    >
                      <div className="case-redesign-problem-inner">
                        <p className="case-redesign-problem-label">{card.problem.label}</p>
                        <h2 className="case-redesign-problem-title">{card.problem.title}</h2>
                        <p className="case-redesign-problem-description">{card.problem.description}</p>
                        {card.problem.visual ? (
                          <div className="merge-problem-graphic" aria-label="Creative collaboration workflow comparison">
                            <article className="merge-problem-flow merge-problem-flow-current">
                              <p className="merge-problem-flow-label">{card.problem.visual.current.label}</p>
                              <div className="merge-problem-flow-steps">
                                {card.problem.visual.current.steps.map((step) => (
                                  <div key={step} className="merge-problem-flow-step">
                                    <span className="merge-problem-flow-dot" aria-hidden="true" />
                                    <span>{step}</span>
                                  </div>
                                ))}
                              </div>
                            </article>

                            <div className="merge-problem-graphic-divider" aria-hidden="true">
                              <span />
                            </div>

                            <article className="merge-problem-flow merge-problem-flow-merge">
                              <p className="merge-problem-flow-label">{card.problem.visual.merge.label}</p>
                              <div className="merge-problem-flow-steps">
                                {card.problem.visual.merge.steps.map((step) => (
                                  <div key={step} className="merge-problem-flow-step">
                                    <span className="merge-problem-flow-dot" aria-hidden="true" />
                                    <span>{step}</span>
                                  </div>
                                ))}
                              </div>
                            </article>
                          </div>
                        ) : null}
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.research ? (
                    <section className="case-redesign-content-section merge-research-section" aria-label="Research section">
                      <div className="merge-research-inner">
                        <div className="merge-research-heading">
                          <p className="merge-research-label">{card.research.label}</p>
                          <h2 className="merge-research-title">{card.research.title}</h2>
                          <p className="merge-research-description">{card.research.description}</p>
                        </div>

                        <div className="merge-research-card-wrap">
                          <img
                            src={card.research.imageUrl}
                            alt={card.research.imageAlt}
                            className="merge-research-card-image"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.mergeOpportunity ? (
                    <section
                      className="case-redesign-content-section merge-opportunity-section"
                      aria-label="Opportunity section"
                    >
                      <div className="merge-opportunity-inner">
                        <div className="merge-opportunity-heading">
                          <p className="merge-opportunity-label">{card.mergeOpportunity.label}</p>
                          <h2 className="merge-opportunity-title">{card.mergeOpportunity.title}</h2>
                          <p className="merge-opportunity-description">{card.mergeOpportunity.description}</p>
                        </div>

                        <div className="merge-opportunity-grid">
                          {card.mergeOpportunity.columns.map((column) => (
                            <article key={column.title} className="merge-opportunity-card">
                              <div className="merge-opportunity-card-copy">
                                <h3 className="merge-opportunity-card-title">{column.title}</h3>
                                <p className="merge-opportunity-card-description">{column.description}</p>
                              </div>

                              <div className="merge-opportunity-icons" aria-label={`${column.title} examples`}>
                                {column.icons.map((icon) => (
                                  <img
                                    key={icon.alt}
                                    src={icon.src}
                                    alt={icon.alt}
                                    className="merge-opportunity-icon"
                                    loading="lazy"
                                  />
                                ))}
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.mergeSolution ? (
                    <section
                      className="case-redesign-content-section merge-solution-section"
                      aria-label="Merge solution section"
                    >
                      <div className="merge-solution-inner">
                        <div className="merge-solution-heading">
                          <p className="merge-solution-label">{card.mergeSolution.label}</p>
                          <h2 className="merge-solution-title">{card.mergeSolution.title}</h2>
                          <p className="merge-solution-description">{card.mergeSolution.description}</p>
                        </div>

                        <div className="merge-solution-media-stage">
                          <video
                            src={card.mergeSolution.videoUrl}
                            className="merge-solution-video"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            aria-label="Merge solution prototype preview"
                          />

                          <div className="merge-solution-footer-texts">
                            <p className="merge-solution-callout merge-solution-callout-left">
                              {card.mergeSolution.leftCallout}
                            </p>

                            <p className="merge-solution-callout merge-solution-callout-right">
                              {card.mergeSolution.rightCallout}
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.mergeCoreExperience ? (
                    <section
                      className="case-redesign-content-section merge-core-section"
                      aria-label="Core experience section"
                    >
                      <div className="merge-core-inner">
                        <div className="merge-core-heading">
                          <p className="merge-core-label">{card.mergeCoreExperience.label}</p>
                          <div className="merge-core-heading-copy">
                            <h2 className="merge-core-title">{card.mergeCoreExperience.title}</h2>
                            <p className="merge-core-description">{card.mergeCoreExperience.description}</p>
                          </div>
                        </div>

                        <div className="merge-core-image-panel">
                          {card.mergeCoreExperience.items.map((item) => (
                            <figure key={item.title} className="merge-core-figure">
                              <img
                                src={item.imageUrl}
                                alt={item.imageAlt}
                                className="merge-core-image"
                                loading="lazy"
                              />
                              <figcaption className="merge-core-caption">{item.title}</figcaption>
                            </figure>
                          ))}

                          <p className="merge-core-body">{card.mergeCoreExperience.body}</p>
                        </div>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.mergeFinalDesign ? (
                    <section
                      className="case-redesign-content-section merge-final-section"
                      aria-label="Final design section"
                    >
                      <div className="merge-final-inner">
                        <div className="merge-final-heading">
                          <p className="merge-final-label">{card.mergeFinalDesign.label}</p>
                          <div className="merge-final-heading-copy">
                            <h2 className="merge-final-title">{card.mergeFinalDesign.title}</h2>
                            <p className="merge-final-description">{card.mergeFinalDesign.description}</p>
                          </div>
                        </div>

                        <div className="merge-final-grid">
                          {card.mergeFinalDesign.videos.slice(0, 2).map((item) => (
                            <article key={item.title} className="merge-final-item">
                              <video
                                src={item.videoUrl}
                                className="merge-final-video"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                aria-label={item.title}
                              />
                              <div className="merge-final-item-copy">
                                <h3 className="merge-final-item-title">{item.title}</h3>
                                <p className="merge-final-item-description">{item.description}</p>
                              </div>
                            </article>
                          ))}
                        </div>

                        {card.mergeFinalDesign.videos[2] ? (
                          <div className="merge-final-centered-row">
                            <article className="merge-final-item merge-final-item-centered">
                              <video
                                src={card.mergeFinalDesign.videos[2].videoUrl}
                                className="merge-final-video"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                aria-label={card.mergeFinalDesign.videos[2].title}
                              />
                              <div className="merge-final-item-copy">
                                <h3 className="merge-final-item-title">{card.mergeFinalDesign.videos[2].title}</h3>
                                <p className="merge-final-item-description">
                                  {card.mergeFinalDesign.videos[2].description}
                                </p>
                              </div>
                            </article>
                          </div>
                        ) : null}
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.mergeDesignDecisions ? (
                    <section
                      className="case-redesign-content-section merge-decisions-section"
                      aria-label="Design decisions section"
                    >
                      <div className="merge-decisions-inner">
                        <div className="merge-decisions-heading">
                          <p className="merge-decisions-label">{card.mergeDesignDecisions.label}</p>
                          <div className="merge-decisions-heading-copy">
                            <h2 className="merge-decisions-title">{card.mergeDesignDecisions.title}</h2>
                            <p className="merge-decisions-description">
                              {card.mergeDesignDecisions.description}
                            </p>
                          </div>
                        </div>

                        <div className="merge-decisions-body">
                          <section className="merge-decisions-visibility" aria-label="Visibility decision">
                            <div className="merge-decisions-copy-block">
                              <h3 className="merge-decisions-block-title">
                                {card.mergeDesignDecisions.visibility.title}
                              </h3>
                              <p className="merge-decisions-block-description">
                                {card.mergeDesignDecisions.visibility.description}
                              </p>
                            </div>

                            <figure className="merge-decisions-primary-figure">
                              <img
                                src={card.mergeDesignDecisions.visibility.imageUrl}
                                alt={card.mergeDesignDecisions.visibility.imageAlt}
                                className="merge-decisions-primary-image"
                                loading="lazy"
                              />
                              <figcaption className="merge-decisions-caption">
                                {card.mergeDesignDecisions.visibility.caption}
                              </figcaption>
                            </figure>
                          </section>

                          <section className="merge-decisions-permissions" aria-label="Controlled permissions decision">
                            <div className="merge-decisions-permissions-copy">
                              <h3 className="merge-decisions-block-title">
                                {card.mergeDesignDecisions.permissions.title}
                              </h3>
                              <p className="merge-decisions-block-description">
                                {card.mergeDesignDecisions.permissions.description}
                              </p>
                            </div>

                            <div className="merge-decisions-comparison">
                              {card.mergeDesignDecisions.permissions.items.map((item) => (
                                <figure key={item.caption} className="merge-decisions-comparison-card">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.imageAlt}
                                    className="merge-decisions-comparison-image"
                                    loading="lazy"
                                  />
                                  <figcaption className="merge-decisions-caption">{item.caption}</figcaption>
                                </figure>
                              ))}
                            </div>
                          </section>
                        </div>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.mergeTrust ? (
                    <section
                      className="case-redesign-content-section merge-trust-section"
                      aria-label="Trust section"
                    >
                      <div className="merge-trust-inner">
                        <div className="merge-trust-heading">
                          <p className="merge-trust-label">{card.mergeTrust.label}</p>
                          <h2 className="merge-trust-title">{card.mergeTrust.title}</h2>
                          <p className="merge-trust-description">{card.mergeTrust.description}</p>
                        </div>

                        <div className="merge-trust-body-wrap">
                          <p className="merge-trust-body">{card.mergeTrust.body}</p>
                        </div>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.mergeOutcome ? (
                    <section
                      className="case-redesign-content-section merge-outcome-section"
                      aria-label="Outcome section"
                    >
                      <div className="merge-outcome-inner">
                        <div className="merge-outcome-heading">
                          <p className="merge-outcome-label">{card.mergeOutcome.label}</p>
                          <h2 className="merge-outcome-title">{card.mergeOutcome.title}</h2>
                          <p className="merge-outcome-description">{card.mergeOutcome.description}</p>
                        </div>

                        <div className="merge-outcome-panel">
                          <div className="merge-outcome-grid">
                            {card.mergeOutcome.items.map((item, index) => (
                              <article key={`${item.icon}-${index}`} className="merge-outcome-item">
                                <div className="merge-outcome-icon">
                                  <MergeOutcomeIcon kind={item.icon} />
                                </div>
                                <h3 className="merge-outcome-item-title">{item.title}</h3>
                                <p className="merge-outcome-item-description">{item.description}</p>
                              </article>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.mergeUsabilityTesting ? (
                    <section
                      className="case-redesign-content-section merge-closing-section"
                      aria-label="Usability testing section"
                    >
                      <div className="merge-closing-inner">
                        <div className="merge-closing-heading">
                          <p className="merge-closing-label">{card.mergeUsabilityTesting.label}</p>
                          <h2 className="merge-closing-title">{card.mergeUsabilityTesting.title}</h2>
                          <p className="merge-closing-description">{card.mergeUsabilityTesting.description}</p>
                        </div>

                        <div className="merge-closing-panel merge-testing-panel">
                          <div className="merge-testing-grid">
                            {card.mergeUsabilityTesting.items.map((item) => (
                              <article key={item.title} className="merge-testing-card">
                                <h3 className="merge-testing-card-title">{item.title}</h3>
                                <p className="merge-testing-card-body">{item.body}</p>
                                <p className="merge-testing-card-implication">
                                  <span className="merge-testing-card-implication-label">
                                    {item.implicationLabel}{' '}
                                  </span>
                                  {item.implication}
                                </p>
                              </article>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.mergeReflection ? (
                    <section
                      className="case-redesign-content-section merge-closing-section merge-reflection-section"
                      aria-label="Reflection section"
                    >
                      <div className="merge-closing-inner">
                        <div className="merge-closing-heading">
                          <p className="merge-closing-label">{card.mergeReflection.label}</p>
                          <h2 className="merge-closing-title">{card.mergeReflection.title}</h2>
                          <p className="merge-closing-description">{card.mergeReflection.description}</p>
                        </div>

                        <div className="merge-closing-panel merge-reflection-panel">
                          <div className="merge-reflection-grid">
                            {card.mergeReflection.items.map((item, index) => (
                              <article key={`${item.title}-${index}`} className="merge-reflection-card">
                                <h3 className="merge-reflection-card-title">{item.title}</h3>
                                <p className="merge-reflection-card-body">{item.body}</p>
                              </article>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.designIntent ? (
                    <section
                      className="case-redesign-content-section case-redesign-design-intent"
                      aria-label="Design intent section"
                    >
                      <div className="case-redesign-design-intent-card">
                        <div className="case-redesign-design-intent-heading">
                          <p className="case-redesign-design-intent-label">{card.designIntent.label}</p>
                          <h2 className="case-redesign-design-intent-title">{card.designIntent.title}</h2>
                        </div>

                        <div className="case-redesign-design-intent-media-wrap">
                          <div className="case-redesign-design-intent-phone-frame">
                            <div className="case-redesign-design-intent-screen-viewport">
                              <video
                                src={card.designIntent.videoUrl}
                                className="case-redesign-design-intent-video"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                aria-label="Design intent prototype preview"
                              />
                            </div>
                            <img
                              src={card.designIntent.bezelUrl}
                              alt=""
                              className="case-redesign-design-intent-bezel"
                              loading="lazy"
                              aria-hidden="true"
                            />
                          </div>
                        </div>

                        <p className="case-redesign-design-intent-description">{card.designIntent.description}</p>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.systemScope ? (
                    <section
                      className="case-redesign-content-section case-redesign-system-scope"
                      aria-label="System scope section"
                    >
                      <div className="case-redesign-system-scope-inner">
                        <p className="case-redesign-system-scope-label">{card.systemScope.label}</p>
                        <h2 className="case-redesign-system-scope-title">{card.systemScope.title}</h2>
                        <p className="case-redesign-system-scope-description">{card.systemScope.description}</p>

                        <div className="case-redesign-system-scope-media-panel">
                          <button
                            type="button"
                            className="case-redesign-system-scope-media-trigger"
                            aria-label="Enlarge system scope image"
                            onClick={() => setSystemScopeZoomOpen(true)}
                          >
                            <div className="case-redesign-system-scope-media-wrap">
                              <img
                                src={groupCollectionSystemScopeImage}
                                alt="System scope information architecture"
                                className="case-redesign-system-scope-media"
                                loading="lazy"
                              />
                            </div>
                          </button>
                          <p className="case-redesign-system-scope-caption">{card.systemScope.caption}</p>
                        </div>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.principles ? (
                    <section
                      className="case-redesign-content-section case-redesign-principles"
                      aria-label="Design principles section"
                    >
                      <div className="case-redesign-principles-inner">
                        <p className="case-redesign-principles-label">{card.principles.label}</p>
                        <h2 className="case-redesign-principles-title">{card.principles.title}</h2>
                        <p className="case-redesign-principles-description">{card.principles.description}</p>

                        <div className="case-redesign-principles-cards">
                          {card.principles.cards.map((principle) => (
                            <article key={principle.title} className="case-redesign-principles-card">
                              <div
                                className={`case-redesign-principles-card-copy ${
                                  principle.align === 'right' ? 'is-right' : ''
                                }`.trim()}
                              >
                                <h3 className="case-redesign-principles-card-title">{principle.title}</h3>
                                <p className="case-redesign-principles-card-description">
                                  {principle.description}
                                </p>
                              </div>

                              <div className="case-redesign-principles-card-media-container">
                                {principle.videoUrl ? (
                                  <video
                                    className="case-redesign-principles-card-media"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="metadata"
                                    aria-hidden="true"
                                  >
                                    <source src={principle.videoUrl} type="video/mp4" />
                                  </video>
                                ) : (
                                  <img
                                    src={principle.imageUrl}
                                    alt=""
                                    className="case-redesign-principles-card-media"
                                    loading="lazy"
                                    aria-hidden="true"
                                  />
                                )}
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.finalDesign ? (
                    <section
                      className="case-redesign-content-section case-redesign-final-design"
                      aria-label="Final design section"
                    >
                      <div className="case-redesign-final-design-inner">
                        <section className="case-redesign-final-design-subsection case-redesign-final-design-header">
                          <p className="case-redesign-final-design-label">{card.finalDesign.label}</p>
                          <h2 className="case-redesign-final-design-title">{card.finalDesign.title}</h2>
                          <p className="case-redesign-final-design-description">{card.finalDesign.description}</p>
                        </section>

                        {card.finalDesign.steps.map((step) => (
                          <section
                            key={step.title}
                            className="case-redesign-final-design-subsection case-redesign-final-design-step"
                          >
                            <div
                              className={`case-redesign-final-design-step-heading ${
                                step.align === 'right' ? 'is-right' : ''
                              }`.trim()}
                            >
                              <div className="case-redesign-final-design-step-copy">
                                <h3 className="case-redesign-final-design-step-title">{step.title}</h3>
                                <p className="case-redesign-final-design-step-description">{step.description}</p>
                              </div>
                            </div>

                            <div
                              className={`case-redesign-final-design-media case-redesign-final-design-media-${step.layout}`}
                            >
                              {step.mediaItems.map((mediaItem, mediaIndex) => (
                                <figure
                                  key={`${step.title}-${String(mediaIndex + 1)}`}
                                  className="case-redesign-final-design-media-item"
                                >
                                  {mediaItem.videoUrl ? (
                                    mediaItem.device === 'ipad' ? (
                                      <div className="case-redesign-final-design-ipad-frame">
                                        <div className="case-redesign-final-design-ipad-screen-viewport">
                                          <video
                                            src={mediaItem.videoUrl}
                                            className="case-redesign-final-design-ipad-video"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="metadata"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <img
                                          src={mediaItem.bezelUrl}
                                          alt=""
                                          className="case-redesign-final-design-ipad-bezel"
                                          loading="lazy"
                                          aria-hidden="true"
                                        />
                                      </div>
                                    ) : (
                                      <div className="case-redesign-design-intent-phone-frame case-redesign-final-design-intent-phone-frame">
                                        <div className="case-redesign-design-intent-screen-viewport">
                                          <video
                                            src={mediaItem.videoUrl}
                                            className="case-redesign-design-intent-video"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="metadata"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <img
                                          src={mediaItem.bezelUrl}
                                          alt=""
                                          className="case-redesign-design-intent-bezel"
                                          loading="lazy"
                                          aria-hidden="true"
                                        />
                                      </div>
                                    )
                                  ) : (
                                    <img
                                      src={mediaItem.imageUrl}
                                      alt=""
                                      className="case-redesign-final-design-image"
                                      loading="lazy"
                                      aria-hidden="true"
                                    />
                                  )}
                                  <figcaption className="case-redesign-final-design-media-caption">
                                    {mediaItem.caption}
                                  </figcaption>
                                </figure>
                              ))}
                            </div>
                          </section>
                        ))}
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.edgeCases ? (
                    <section
                      className="case-redesign-content-section case-redesign-edge-cases"
                      aria-label="Edge cases and system thinking section"
                    >
                      <div className="case-redesign-edge-cases-inner">
                        <div className="case-redesign-edge-cases-header">
                          <p className="case-redesign-edge-cases-label">{card.edgeCases.label}</p>
                          <h2 className="case-redesign-edge-cases-title">{card.edgeCases.title}</h2>
                          <p className="case-redesign-edge-cases-description">{card.edgeCases.description}</p>
                        </div>

                        <div className="case-redesign-edge-cases-grid">
                          {card.edgeCases.cards.slice(0, 4).map((item) => (
                            <article key={item.index} className="case-redesign-edge-cases-card">
                              <span className="case-redesign-edge-cases-number">{item.index}</span>
                              <p className="case-redesign-edge-cases-card-text">{item.text}</p>
                            </article>
                          ))}
                        </div>

                        <article className="case-redesign-edge-cases-card case-redesign-edge-cases-card-centered">
                          <span className="case-redesign-edge-cases-number">{card.edgeCases.cards[4].index}</span>
                          <p className="case-redesign-edge-cases-card-text">{card.edgeCases.cards[4].text}</p>
                        </article>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.expectedImpact ? (
                    <section
                      className="case-redesign-content-section case-redesign-expected-impact"
                      aria-label="Expected impact section"
                    >
                      <div className="case-redesign-expected-impact-inner">
                        <div className="case-redesign-expected-impact-header">
                          <p className="case-redesign-expected-impact-label">{card.expectedImpact.label}</p>
                          <h2 className="case-redesign-expected-impact-title">{card.expectedImpact.title}</h2>
                        </div>
                        <p className="case-redesign-expected-impact-description">
                          {card.expectedImpact.description}
                        </p>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.reflection ? (
                    <section
                      className="case-redesign-content-section case-redesign-reflection"
                      aria-label="Reflection section"
                    >
                      <div className="case-redesign-reflection-inner">
                        <div className="case-redesign-reflection-header">
                          <p className="case-redesign-reflection-label">{card.reflection.label}</p>
                          <h2 className="case-redesign-reflection-title">{card.reflection.title}</h2>
                          <p className="case-redesign-reflection-description">{card.reflection.description}</p>
                        </div>
                        <p className="case-redesign-reflection-support">{card.reflection.support}</p>
                      </div>
                    </section>
                  ) : null}

                  {isOpenProjectPanel && card.thankYou ? (
                    <section
                      className="case-redesign-content-section case-redesign-thank-you"
                      aria-label="Thank you section"
                    >
                      <div className="case-redesign-thank-you-inner">
                        <p className="case-redesign-thank-you-title">{card.thankYou.title}</p>
                        <img src={introLogo} alt="" className="case-redesign-thank-you-logo" aria-hidden="true" />
                      </div>
                    </section>
                  ) : null}
                </section>
              )
            })}
          </div>
        </div>

        {!isProjectOpen ? (
          <div
            ref={fixedSkillsOverlayRef}
            className="fixed-skills-overlay"
            aria-hidden="true"
          >
            <div className="fixed-skills-column">
              <div className="case-redesign-skill-group">
                <p className="case-redesign-skill-item">RESEARCH</p>
                <p className="case-redesign-skill-item">PROTOTYPING</p>
                <p className="case-redesign-skill-item">DESIGN</p>
              </div>
              <div className="case-redesign-skill-group">
                <p className="case-redesign-skill-item">WIREFRAMING</p>
                <p className="case-redesign-skill-item">TESTING</p>
              </div>
            </div>

            <div className="fixed-skills-column">
              <div className="case-redesign-skill-group">
                <p className="case-redesign-skill-item">UX WRITING</p>
                <p className="case-redesign-skill-item">VISUAL SYSTEM</p>
                <p className="case-redesign-skill-item">INTERACTION</p>
              </div>
              <div className="case-redesign-skill-group">
                <p className="case-redesign-skill-item">HANDOFF</p>
                <p className="case-redesign-skill-item">IMPACT</p>
              </div>
            </div>
          </div>
        ) : null}
      </main>
      <Footer />
      <section
        id="contact-page-modal"
        className={`contact-page-modal ${isContactModalOpen ? 'is-open' : ''}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isContactModalOpen}
        aria-label="Contact methods"
        onClick={closeContactModal}
      >
        <div
          className="contact-container"
          style={
            contactContainerRect
              ? {
                  top: `${contactContainerRect.top - 4}px`,
                  left: `${contactContainerRect.left - 4}px`,
                  width: `${contactContainerRect.width + 8}px`,
                  height: `${contactContainerRect.height + 8}px`,
                  transform: 'none',
                }
              : undefined
          }
          onClick={closeContactModal}
        >
          <div
            className="contact-methods"
            aria-label="Contact methods list"
            onClick={(event) => event.stopPropagation()}
          >
            <a className="contact-method-item contact-method-email" href={CONTACT_LINKS.email}>
              EMAIL
            </a>
            <a className="contact-method-item" href={CONTACT_LINKS.phone}>
              PHONE
            </a>
            <a
              className="contact-method-item contact-method-linkedin"
              href={CONTACT_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <span>LINKEDIN</span>
              <svg
                className="contact-linkedin-icon"
                viewBox="0 0 10 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 8L9 1M9 1H4.5M9 1V5.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      {isSystemScopeZoomOpen ? (
        <section
          className="system-scope-zoom-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="System scope image preview"
          onClick={() => setSystemScopeZoomOpen(false)}
        >
          <div className="system-scope-zoom-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="system-scope-zoom-close"
              aria-label="Close image preview"
              onClick={() => setSystemScopeZoomOpen(false)}
            >
              <img src={closeIcon} alt="" aria-hidden="true" className="system-scope-zoom-close-icon" />
            </button>
            <img
              src={groupCollectionSystemScopeImage}
              alt="System scope information architecture expanded"
              className="system-scope-zoom-image"
            />
          </div>
        </section>
      ) : null}
      {isIntroVisible ? (
        <IntroSplash
          isNameFading={isIntroNameFading}
          isMetaFading={isIntroMetaFading}
          isLogoFading={isIntroLogoFading}
          isHeroTextVisible={isIntroHeroTextVisible}
        />
      ) : null}
      {isCustomCursorEnabled ? (
        <div
          ref={cursorRef}
          className={`custom-cursor ${isCursorVisible ? 'is-visible' : ''} ${isCursorExpanded ? 'is-expanded' : ''}`.trim()}
          aria-hidden="true"
        />
      ) : null}
    </div>
  )
}

export default App
