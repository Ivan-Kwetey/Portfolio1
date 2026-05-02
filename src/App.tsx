import { useCallback, useEffect, useRef, useState, type TouchEvent, type WheelEvent } from 'react'
import { gsap } from 'gsap'

import ContactModal from './components/ContactModal'
import ContentArea from './components/ContentArea'
import CustomCursor from './components/CustomCursor'
import FixedSkillsOverlay from './components/FixedSkillsOverlay'
import IntroSplash from './components/IntroSplash'
import Navbar from './components/Navbar'
import SystemScopeZoom from './components/SystemScopeZoom'
import ProjectDetails from './components/projects/ProjectDetails'
import ProjectSection from './components/projects/ProjectSection'
import { PROJECT_CARDS, SECTION_COUNT } from './data/projectCards'
import { useMediaQuery } from './hooks/useMediaQuery'
import {
  buildLocationUrl,
  getContactContainerRect,
  getInitialViewState,
  getLocationRouteMode,
  normalizePathname,
  parseLocationRoute,
  VIEW_STATE_STORAGE_KEY,
} from './lib/portfolioRouting'
import type { ContactContainerRect, ViewState } from './types/portfolio'
import closeIcon from './assets/close.svg'
import groupCollectionSystemScopeImage from './assets/group-collection/System scope image.png'
import './App.css'

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
const CONTACT_LINKS = {
  email: 'mailto:hello@example.com',
  phone: 'tel:+10000000000',
  linkedin: 'https://www.linkedin.com/in/your-handle',
} as const

type CaseStripeMode = 'fixed' | 'hidden' | 'section'

function App() {
  const [initialViewState] = useState<ViewState>(() => getInitialViewState(PROJECT_CARDS, SECTION_COUNT))
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
  const [outgoingHomePreviewIndex, setOutgoingHomePreviewIndex] = useState<number | null>(null)
  const activeSectionRef = useRef(initialViewState.sectionIndex)
  const [visibleSectionIndex, setVisibleSectionIndex] = useState(initialViewState.sectionIndex)
  const [caseStripeMode, setCaseStripeMode] = useState<CaseStripeMode>(() =>
    !initialViewState.showIntro &&
      initialViewState.openProjectIndex === null &&
      initialViewState.sectionIndex > 0
      ? 'fixed'
      : 'hidden'
  )
  const isTransitioningRef = useRef(false)
  const mainRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const trackTweenRef = useRef<gsap.core.Tween | null>(null)
  const accumulatedWheelDeltaRef = useRef(0)
  const wheelResetTimeoutRef = useRef<number | null>(null)
  const wheelGestureIdleTimeoutRef = useRef<number | null>(null)
  const wheelGestureConsumedRef = useRef(false)
  const touchStartYRef = useRef<number | null>(null)
  const touchGestureConsumedRef = useRef(false)
  const lastInputAtRef = useRef(0)
  const caseMediaRefs = useRef<Array<HTMLDivElement | null>>([])
  const [contactContainerRect, setContactContainerRect] = useState<ContactContainerRect | null>(null)
  const lastAppliedLocationRef = useRef<string | null>(null)
  const hydratedCaseScrollTopRef = useRef(initialViewState.caseScrollTop)
  const isCustomCursorEnabled = useMediaQuery('(hover: hover) and (pointer: fine)')
  const isProjectOpen = openProjectIndex !== null
  const isProjectContentVisible = isProjectOpen

  const closeContactModal = useCallback(() => {
    setContactModalOpen(false)
  }, [])

  const closeSystemScopeZoom = useCallback(() => {
    setSystemScopeZoomOpen(false)
  }, [])

  const openSystemScopeZoom = useCallback(() => {
    setSystemScopeZoomOpen(true)
  }, [])

  const persistViewState = useCallback(
    (overrides: Partial<ViewState> = {}) => {
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

  const syncLocationRoute = useCallback(
    (nextOpenProjectIndex: number | null, nextSectionIndex: number, method: 'push' | 'replace' = 'replace') => {
      if (typeof window === 'undefined') {
        return
      }

      const nextUrl = buildLocationUrl(
        nextOpenProjectIndex,
        nextSectionIndex,
        window.location.protocol,
        PROJECT_CARDS,
        SECTION_COUNT
      )
      const currentUrl =
        getLocationRouteMode(window.location.protocol) === 'hash'
          ? window.location.hash
          : `${normalizePathname(window.location.pathname)}${window.location.hash}`

      if (currentUrl === nextUrl) {
        return
      }

      const historyMethod = method === 'push' ? 'pushState' : 'replaceState'
      window.history[historyMethod](null, '', nextUrl)
    },
    []
  )

  const handleOpenCaseProject = useCallback(
    (index: number) => {
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
      syncLocationRoute(index, activeSectionRef.current, 'push')
    },
    [openProjectIndex, persistViewState, syncLocationRoute]
  )

  const handleSetMediaRef = useCallback((index: number, node: HTMLDivElement | null) => {
    caseMediaRefs.current[index] = node
  }, [])

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
    (targetIndex: number) => {
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
      setCaseStripeMode(isEnteringCaseCanvas || isLeavingCaseCanvas ? 'section' : clampedIndex > 0 ? 'fixed' : 'hidden')
      setOutgoingHomePreviewIndex(previousIndex > 0 ? previousIndex - 1 : null)
      setCaseDescriptionVisible(false)

      persistViewState({
        showIntro: false,
        openProjectIndex: null,
        sectionIndex: clampedIndex,
        caseScrollTop: 0,
      })
      syncLocationRoute(null, clampedIndex, 'push')

      if (!trackRef.current) {
        setVisibleSectionIndex(clampedIndex)
        return
      }

      setVisibleSectionIndex(clampedIndex)

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

          setVisibleSectionIndex(activeSectionRef.current)
          trackTweenRef.current = null
        },
      })
    },
    [isProjectOpen, persistViewState, syncLocationRoute]
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
    (event: WheelEvent<HTMLElement>) => {
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
    (event: TouchEvent<HTMLElement>) => {
      if (isProjectOpen) {
        return
      }

      touchStartYRef.current = event.touches[0]?.clientY ?? null
      touchGestureConsumedRef.current = false
    },
    [isProjectOpen]
  )

  const handleTouchMove = useCallback(
    (event: TouchEvent<HTMLElement>) => {
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

  const handleHomeClick = useCallback(() => {
    closeContactModal()
    closeSystemScopeZoom()

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
      setVisibleSectionIndex(0)

      persistViewState({
        showIntro: false,
        openProjectIndex: null,
        sectionIndex: 0,
        caseScrollTop: 0,
      })
      syncLocationRoute(null, 0, 'push')
      return
    }

    if (activeSectionRef.current === 0) {
      persistViewState({
        showIntro: false,
        openProjectIndex: null,
        sectionIndex: 0,
        caseScrollTop: 0,
      })
      syncLocationRoute(null, 0, 'replace')
      return
    }

    goToSection(0)
  }, [
    closeContactModal,
    closeSystemScopeZoom,
    goToSection,
    openProjectIndex,
    persistViewState,
    syncLocationRoute,
  ])

  useEffect(() => {
    if (!isIntroVisible) {
      return undefined
    }

    const nameFadeStartMs = INTRO_DISPLAY_MS
    const metaFadeStartMs = INTRO_DISPLAY_MS + INTRO_NAME_FADE_MS + INTRO_STAGGER_MS
    const logoFadeStartMs = metaFadeStartMs + INTRO_META_FADE_MS + INTRO_STAGGER_MS
    const heroTextStartMs = logoFadeStartMs + INTRO_LOGO_FADE_MS + INTRO_STAGGER_MS
    const hideSplashMs = heroTextStartMs + INTRO_HERO_TEXT_WINDOW_MS + INTRO_POST_FADE_HOLD_MS
    const timeouts: number[] = []

    timeouts.push(window.setTimeout(() => setIntroNameFading(true), nameFadeStartMs))
    timeouts.push(window.setTimeout(() => setIntroMetaFading(true), metaFadeStartMs))
    timeouts.push(window.setTimeout(() => setIntroLogoFading(true), logoFadeStartMs))
    timeouts.push(window.setTimeout(() => setIntroHeroTextVisible(true), heroTextStartMs))
    timeouts.push(
      window.setTimeout(() => {
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

        setVisibleSectionIndex(introExitSectionIndex)

        persistViewState({
          showIntro: false,
          openProjectIndex: null,
          sectionIndex: introExitSectionIndex,
          caseScrollTop: 0,
        })
        syncLocationRoute(null, introExitSectionIndex, 'replace')
      }, hideSplashMs)
    )

    return () => {
      timeouts.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
    }
  }, [isIntroVisible, persistViewState, syncLocationRoute])

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
    syncLocationRoute(initialViewState.openProjectIndex, initialViewState.sectionIndex, 'replace')
  }, [initialViewState.openProjectIndex, initialViewState.sectionIndex, syncLocationRoute])

  useEffect(() => {
    const applyLocationRoute = () => {
      const nextLocationKey =
        getLocationRouteMode(window.location.protocol) === 'hash'
          ? window.location.hash
          : `${normalizePathname(window.location.pathname)}${window.location.hash}`

      if (lastAppliedLocationRef.current === nextLocationKey) {
        return
      }

      lastAppliedLocationRef.current = nextLocationKey

      const nextRoute = parseLocationRoute(
        window.location.pathname,
        window.location.hash,
        window.location.protocol,
        PROJECT_CARDS,
        SECTION_COUNT
      ) ?? { openProjectIndex: null, sectionIndex: 0 }

      if (trackTweenRef.current) {
        trackTweenRef.current.kill()
        trackTweenRef.current = null
      }

      if (wheelResetTimeoutRef.current) {
        window.clearTimeout(wheelResetTimeoutRef.current)
      }
      if (wheelGestureIdleTimeoutRef.current) {
        window.clearTimeout(wheelGestureIdleTimeoutRef.current)
      }

      isTransitioningRef.current = false
      wheelGestureConsumedRef.current = false
      touchGestureConsumedRef.current = false
      accumulatedWheelDeltaRef.current = 0
      touchStartYRef.current = null
      setOutgoingHomePreviewIndex(null)
      closeContactModal()
      closeSystemScopeZoom()
      setIntroVisible(false)
      setHeroReady(true)

      activeSectionRef.current = nextRoute.sectionIndex
      setVisibleSectionIndex(nextRoute.openProjectIndex === null ? nextRoute.sectionIndex : 0)

      if (mainRef.current) {
        mainRef.current.scrollTop = 0
      }

      if (nextRoute.openProjectIndex !== null) {
        setOpenProjectIndex(nextRoute.openProjectIndex)
        setCaseDescriptionVisible(false)
        setCaseStripeMode('hidden')

        if (trackRef.current) {
          gsap.set(trackRef.current, { yPercent: 0 })
        }

        persistViewState({
          showIntro: false,
          openProjectIndex: nextRoute.openProjectIndex,
          sectionIndex: nextRoute.sectionIndex,
          caseScrollTop: 0,
        })
        return
      }

      setOpenProjectIndex(null)
      setCaseStripeMode(nextRoute.sectionIndex > 0 ? 'fixed' : 'hidden')
      setCaseDescriptionVisible(nextRoute.sectionIndex > 0)

      if (trackRef.current) {
        gsap.set(trackRef.current, { yPercent: -nextRoute.sectionIndex * 100 })
      }

      setVisibleSectionIndex(nextRoute.sectionIndex)

      if (nextRoute.sectionIndex === 0) {
        setHeroAnimationSeed((seed) => seed + 1)
      }

      persistViewState({
        showIntro: false,
        openProjectIndex: null,
        sectionIndex: nextRoute.sectionIndex,
        caseScrollTop: 0,
      })
    }

    window.addEventListener('popstate', applyLocationRoute)
    return () => {
      window.removeEventListener('popstate', applyLocationRoute)
    }
  }, [closeContactModal, closeSystemScopeZoom, persistViewState])

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

    const handleKeyDown = (event: KeyboardEvent) => {
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSystemScopeZoom()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeSystemScopeZoom, isSystemScopeZoomOpen])

  return (
    <div className="landing-page">
      <Navbar
        isContactModalOpen={isContactModalOpen}
        onContactClick={handleContactClick}
        onHomeClick={handleHomeClick}
      />

      <main
        ref={mainRef}
        className={`landing-main case-redesign-main ${isProjectOpen ? 'is-project-open' : ''} is-case-stripe-${caseStripeMode}`.trim()}
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

            {PROJECT_CARDS.map((card, index) => (
              <ProjectSection
                key={card.id}
                card={card}
                index={index}
                isLastProject={index === PROJECT_CARDS.length - 1}
                isCaseDescriptionVisible={isCaseDescriptionVisible}
                isIntroVisible={isIntroVisible}
                isProjectContentVisible={isProjectContentVisible}
                isProjectOpen={isProjectOpen}
                isProjectPanelOpen={openProjectIndex === index}
                isOutgoingHomePreview={outgoingHomePreviewIndex === index}
                onOpenProject={handleOpenCaseProject}
                onSetMediaRef={handleSetMediaRef}
                visibleSectionIndex={visibleSectionIndex}
              >
                <ProjectDetails slug={card.slug} onOpenSystemScopeZoom={openSystemScopeZoom} />
              </ProjectSection>
            ))}
          </div>
        </div>

        {!isProjectOpen ? <FixedSkillsOverlay /> : null}
      </main>

      <ContactModal
        contactLinks={CONTACT_LINKS}
        containerRect={contactContainerRect}
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
      />

      <SystemScopeZoom
        closeIconSrc={closeIcon}
        imageSrc={groupCollectionSystemScopeImage}
        isOpen={isSystemScopeZoomOpen}
        onClose={closeSystemScopeZoom}
      />

      {isIntroVisible ? (
        <IntroSplash
          isNameFading={isIntroNameFading}
          isMetaFading={isIntroMetaFading}
          isLogoFading={isIntroLogoFading}
          isHeroTextVisible={isIntroHeroTextVisible}
        />
      ) : null}

      {isCustomCursorEnabled ? <CustomCursor /> : null}
    </div>
  )
}

export default App
