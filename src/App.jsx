import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Navbar from './components/Navbar'
import ContentArea from './components/ContentArea'
import IntroSplash from './components/IntroSplash'
import groupCollectionAvatars from './assets/group-collection/UserAvatars.png'
import groupCollectionSystemScopeImage from './assets/group-collection/System scope image.png'
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

const GROUP_COLLECTIONS_DESIGN_INTENT = {
  label: 'Design Intent',
  title: 'Make groups easy to discover and run',
  description:
    'The core goal was dual-sided: members should quickly find credible communities, while admins should manage access and governance without heavy operational overhead.',
  imageUrl: 'https://www.figma.com/api/mcp/asset/e88b5488-0b12-44aa-92c4-85b10f6043a2',
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
    },
    {
      title: 'Workflow moderation',
      description:
        'Centralize join-request handling so moderation feels operational and scalable, not scattered.',
    },
    {
      title: 'Authority boundaries',
      description:
        'Make Primary vs Second Admin responsibilities explicit in the UI to prevent permission ambiguity.',
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
          imageUrl: 'https://www.figma.com/api/mcp/asset/d3979137-84c7-4712-8b49-338886e635b3',
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
          imageUrl: 'https://www.figma.com/api/mcp/asset/5ef606c9-d742-4a4c-ac6c-8e1a6251fc54',
          caption: 'Group Page',
        },
        {
          imageUrl: 'https://www.figma.com/api/mcp/asset/5ef606c9-d742-4a4c-ac6c-8e1a6251fc54',
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
          imageUrl: 'https://www.figma.com/api/mcp/asset/5ef606c9-d742-4a4c-ac6c-8e1a6251fc54',
          caption: 'Create Group',
        },
        {
          imageUrl: 'https://www.figma.com/api/mcp/asset/5ef606c9-d742-4a4c-ac6c-8e1a6251fc54',
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
    headline: 'Adding a community layer to a video-first professional network',
    description: (
      <>
        Adding a community layer to a
        <br />
        video-first professional network
      </>
    ),
    metaDetails: null,
    opportunity: null,
    problem: null,
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
const CURSOR_INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, label, [role="button"], [data-cursor-hover]'
const VIEW_STATE_STORAGE_KEY = 'portfolio1.groupCollectionsViewState'
const CONTACT_LINKS = {
  email: 'mailto:hello@example.com',
  phone: 'tel:+10000000000',
  linkedin: 'https://www.linkedin.com/in/your-handle',
}
const GROUP_COLLECTIONS_BACK_ARROW_ICON =
  'https://www.figma.com/api/mcp/asset/8ccade5a-af62-4722-b4de-b1e726594a98'

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

  const initialViewStateRef = useRef(null)
  if (initialViewStateRef.current === null) {
    initialViewStateRef.current = parseInitialViewState()
  }
  const initialViewState = initialViewStateRef.current
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
  const [projectBackButtonTop, setProjectBackButtonTop] = useState(null)
  const activeSectionRef = useRef(initialViewState.sectionIndex)
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
  const projectTitleRefs = useRef([])
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

  const syncProjectBackButtonTop = useCallback(() => {
    if (openProjectIndex === null) {
      setProjectBackButtonTop(null)
      return
    }

    const titleNode = projectTitleRefs.current[openProjectIndex] ?? null
    if (!titleNode) {
      return
    }

    const { top } = titleNode.getBoundingClientRect()
    setProjectBackButtonTop(Math.round(top))
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
      if (trackRef.current) {
        gsap.set(trackRef.current, { yPercent: 0 })
      }
      isTransitioningRef.current = false
      setCaseDescriptionVisible(false)
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

      persistViewState({
        showIntro: false,
        openProjectIndex: index,
        sectionIndex: activeSectionRef.current,
        caseScrollTop: 0,
      })
    },
    [openProjectIndex, persistViewState]
  )

  const handleCloseCaseProject = useCallback(() => {
    if (openProjectIndex === null) {
      return
    }

    const targetSectionIndex = Math.max(1, Math.min(SECTION_COUNT - 1, openProjectIndex + 1))

    if (trackTweenRef.current) {
      trackTweenRef.current.kill()
      trackTweenRef.current = null
    }

    if (trackRef.current) {
      gsap.set(trackRef.current, { yPercent: -targetSectionIndex * 100 })
    }

    activeSectionRef.current = targetSectionIndex
    isTransitioningRef.current = false
    setSystemScopeZoomOpen(false)
    setOpenProjectIndex(null)
    setCaseDescriptionVisible(true)
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
    persistViewState({
      showIntro: false,
      openProjectIndex: null,
      sectionIndex: targetSectionIndex,
      caseScrollTop: 0,
    })
  }, [openProjectIndex, persistViewState])

  const measureContactContainerRect = useCallback(() => {
    if (openProjectIndex !== null) {
      const mediaNode = caseMediaRefs.current[openProjectIndex] ?? null
      if (!mediaNode) {
        return
      }

      const rect = mediaNode.getBoundingClientRect()
      setContactContainerRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      })
      return
    }

    const activeMediaIndex = Math.max(activeSectionRef.current - 1, 0)
    const mediaNode = caseMediaRefs.current[activeMediaIndex] ?? caseMediaRefs.current[0] ?? null

    if (!mediaNode) {
      return
    }

    const rect = mediaNode.getBoundingClientRect()
    setContactContainerRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    })
  }, [openProjectIndex])

  const enforceMobileSkillsGap = useCallback(() => {
    const skillsNode = fixedSkillsOverlayRef.current
    const activeMediaIndex = Math.max(activeSectionRef.current - 1, 0)
    const mediaNode = caseMediaRefs.current[activeMediaIndex] ?? caseMediaRefs.current[0] ?? null

    if (!skillsNode) {
      return
    }

    skillsNode.style.removeProperty('top')
    skillsNode.style.removeProperty('bottom')
    skillsNode.style.removeProperty('transform')

    if (!window.matchMedia('(max-width: 900px)').matches || !mediaNode) {
      return
    }

    const defaultTop = skillsNode.getBoundingClientRect().top
    const minTop = mediaNode.getBoundingClientRect().bottom + 16

    if (defaultTop < minTop) {
      skillsNode.style.top = `${Math.ceil(minTop)}px`
      skillsNode.style.bottom = 'auto'
      skillsNode.style.transform = 'none'
    }
  }, [])

  const goToSection = useCallback(
    (targetIndex) => {
      if (isProjectOpen) {
        return
      }

      const clampedIndex = Math.max(0, Math.min(SECTION_COUNT - 1, targetIndex))
      if (clampedIndex === activeSectionRef.current || isTransitioningRef.current) {
        return
      }

      isTransitioningRef.current = true
      activeSectionRef.current = clampedIndex
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
    if (isProjectOpen) {
      return undefined
    }

    const updateSkillsGap = () => {
      window.requestAnimationFrame(() => {
        enforceMobileSkillsGap()
      })
    }

    updateSkillsGap()

    window.addEventListener('resize', updateSkillsGap)
    window.addEventListener('orientationchange', updateSkillsGap)

    return () => {
      window.removeEventListener('resize', updateSkillsGap)
      window.removeEventListener('orientationchange', updateSkillsGap)
    }
  }, [enforceMobileSkillsGap, isCaseDescriptionVisible, isIntroVisible, isProjectOpen])

  useEffect(() => {
    if (!isProjectOpen) {
      setProjectBackButtonTop(null)
      return undefined
    }

    const updateBackButtonTop = () => {
      window.requestAnimationFrame(() => {
        syncProjectBackButtonTop()
      })
    }

    updateBackButtonTop()

    window.addEventListener('resize', updateBackButtonTop)
    window.addEventListener('orientationchange', updateBackButtonTop)
    window.visualViewport?.addEventListener('resize', updateBackButtonTop)

    return () => {
      window.removeEventListener('resize', updateBackButtonTop)
      window.removeEventListener('orientationchange', updateBackButtonTop)
      window.visualViewport?.removeEventListener('resize', updateBackButtonTop)
    }
  }, [isProjectOpen, syncProjectBackButtonTop])

  useEffect(() => {
    if (!isCustomCursorEnabled) {
      setCursorVisible(false)
      setCursorExpanded(false)
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

      current.x += (target.x - current.x) * 0.12
      current.y += (target.y - current.y) * 0.12

      cursorNode.style.left = `${current.x}px`
      cursorNode.style.top = `${current.y}px`

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
    rafId = window.requestAnimationFrame(animateCursor)

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleWindowMouseOut)
      root.classList.remove('has-custom-cursor')
    }
  }, [isCustomCursorEnabled])

  return (
    <div className="landing-page">
      <Navbar isContactModalOpen={isContactModalOpen} onContactClick={handleContactClick} />
      <main
        ref={mainRef}
        className={`landing-main case-redesign-main ${isProjectOpen ? 'is-project-open' : ''}`.trim()}
        onWheel={handleMainWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label="Portfolio sections"
      >
        {isProjectOpen ? (
          <button
            type="button"
            className="case-redesign-back-button"
            aria-label="Back to home project preview"
            onClick={handleCloseCaseProject}
            style={projectBackButtonTop === null ? undefined : { top: `${projectBackButtonTop}px` }}
          >
            <img
              src={GROUP_COLLECTIONS_BACK_ARROW_ICON}
              alt=""
              className="case-redesign-back-button-icon"
              aria-hidden="true"
            />
          </button>
        ) : null}

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
              const isPreviewContentVisible = isCaseDescriptionVisible && !isProjectOpen

              return (
                <section
                  key={card.id}
                  className={`section-panel section-panel-case-redesign ${
                    isProjectOpen
                      ? isOpenProjectPanel
                        ? 'is-open-project-panel'
                        : 'is-hidden-project-panel'
                      : ''
                  }`.trim()}
                  aria-label="Case section"
                >
                  <section
                    className={`case-redesign-stage ${isOpenProjectPanel ? 'is-project-open' : ''}`.trim()}
                    aria-label="Project section"
                  >
                    <div
                      className={`case-redesign-card-container ${isOpenProjectPanel ? 'is-project-open' : ''}`.trim()}
                    >
                      <p
                        className={`case-redesign-description ${isPreviewContentVisible ? 'is-visible' : ''}`.trim()}
                      >
                        {card.description}
                      </p>

                      <div className="case-redesign-media-shell">
                        <h1
                          className={`case-redesign-project-title ${isOpenProjectPanel ? 'is-visible' : ''}`.trim()}
                          ref={(node) => {
                            projectTitleRefs.current[index] = node
                          }}
                        >
                          {card.headline}
                        </h1>

                        <div
                          className={`case-redesign-media ${isOpenProjectPanel ? 'is-project-open' : ''}`.trim()}
                          ref={(node) => {
                            caseMediaRefs.current[index] = node
                          }}
                          role="img"
                          aria-label="Project media cover"
                        />

                        {card.metaDetails ? (
                          <div
                            className={`case-redesign-meta ${isOpenProjectPanel ? 'is-visible' : ''}`.trim()}
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

                      {!isProjectOpen ? (
                        <button
                          type="button"
                          className={`case-redesign-arrow-button ${isPreviewContentVisible ? 'is-visible' : ''}`.trim()}
                          aria-label="Open project details"
                          onClick={() => handleOpenCaseProject(index)}
                        >
                          <svg
                            className="case-redesign-arrow-icon"
                            viewBox="0 0 50 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <circle cx="25" cy="25" r="25" fill="#050409" />
                            <path
                              d="M18 25H32M32 25L25 18M32 25L25 32"
                              stroke="#FDFDFF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      ) : null}
                    </div>

                    {!isProjectOpen ? (
                      <p
                        className={`case-redesign-pagination ${isPreviewContentVisible ? 'is-visible' : ''}`.trim()}
                      >
                        {String(index + 1).padStart(2, '0')} / {String(PROJECT_CARDS.length).padStart(2, '0')}
                      </p>
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
                          <img
                            src={card.designIntent.imageUrl}
                            alt="Design intent phone mockup"
                            className="case-redesign-design-intent-media"
                            loading="lazy"
                          />
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
                              <h3 className="case-redesign-principles-card-title">{principle.title}</h3>
                              <p className="case-redesign-principles-card-description">
                                {principle.description}
                              </p>
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
                                  <img
                                    src={mediaItem.imageUrl}
                                    alt=""
                                    className="case-redesign-final-design-image"
                                    loading="lazy"
                                    aria-hidden="true"
                                  />
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
          <div ref={fixedSkillsOverlayRef} className="fixed-skills-overlay" aria-hidden="true">
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
