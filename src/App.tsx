import { useCallback, useEffect, useRef, useState } from 'react'

import ContactModal from './components/ContactModal'
import CustomCursor from './components/CustomCursor'
import HomepageHero from './components/HomepageHero'
import Navbar from './components/Navbar'
import SystemScopeZoom from './components/SystemScopeZoom'
import ProjectDetails from './components/projects/ProjectDetails'
import ProjectSection from './components/projects/ProjectSection'
import groupCollectionHomeVideo from './assets/group-collection/grouphomevideo.mp4'
import mergeHomeVideo from './assets/merge/newmergehome.mp4'
import closeIcon from './assets/close.svg'
import groupCollectionSystemScopeImage from './assets/group-collection/System scope image.png'
import { PROJECT_CARDS, SECTION_COUNT } from './data/projectCards'
import { useMediaQuery } from './hooks/useMediaQuery'
import {
  buildLocationUrl,
  getContactContainerRect,
  getLocationRouteMode,
  normalizePathname,
  parseLocationRoute,
} from './lib/portfolioRouting'
import type { ContactContainerRect } from './types/portfolio'
import type { ProjectSlug } from './types/projectCard'
import './App.css'

const CONTACT_LINKS = {
  email: 'mailto:hello@example.com',
  phone: 'tel:+10000000000',
  linkedin: 'https://www.linkedin.com/in/your-handle',
} as const

const HOME_HERO_PHONE_VIDEO = mergeHomeVideo
const HOME_HERO_GROUP_COLLECTION_VIDEO = groupCollectionHomeVideo
const HOME_HERO_PROJECT_TITLES: Record<ProjectSlug, string> = {
  'group-collection': 'Group Collections',
  aisldex: 'Aisledex',
  merge: 'Merge',
}

const HOME_HERO_CARD_ORDER: ProjectSlug[] = ['merge', 'group-collection', 'aisldex']

const HOME_HERO_CARDS = HOME_HERO_CARD_ORDER.flatMap((slug) => {
  const projectIndex = PROJECT_CARDS.findIndex((projectCard) => projectCard.slug === slug)
  const card = projectIndex >= 0 ? PROJECT_CARDS[projectIndex] : null
  if (!card) {
    return []
  }

  return [
    {
      description: card.description,
      id: card.id,
      projectIndex,
      title: HOME_HERO_PROJECT_TITLES[card.slug],
      videoUrl:
        card.slug === 'merge'
          ? HOME_HERO_PHONE_VIDEO
          : card.slug === 'group-collection'
            ? HOME_HERO_GROUP_COLLECTION_VIDEO
            : card.previewVideoUrl,
    },
  ]
})

function getInitialOpenProjectIndex() {
  if (typeof window === 'undefined') {
    return null
  }

  const initialRoute = parseLocationRoute(
    window.location.pathname,
    window.location.hash,
    window.location.protocol,
    PROJECT_CARDS,
    SECTION_COUNT
  )

  return initialRoute?.openProjectIndex ?? null
}

function App() {
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(() => getInitialOpenProjectIndex())
  const [isContactModalOpen, setContactModalOpen] = useState(false)
  const [isSystemScopeZoomOpen, setSystemScopeZoomOpen] = useState(false)
  const [contactContainerRect, setContactContainerRect] = useState<ContactContainerRect | null>(null)
  const mainRef = useRef<HTMLElement | null>(null)
  const homeMediaRef = useRef<HTMLDivElement | null>(null)
  const caseMediaRefs = useRef<Array<HTMLDivElement | null>>([])
  const isCustomCursorEnabled = useMediaQuery('(hover: hover) and (pointer: fine)')
  const isProjectOpen = openProjectIndex !== null
  const activeProjectIndex = openProjectIndex ?? -1
  const activeProjectCard = openProjectIndex !== null ? PROJECT_CARDS[openProjectIndex] ?? null : null

  const closeContactModal = useCallback(() => {
    setContactModalOpen(false)
  }, [])

  const closeSystemScopeZoom = useCallback(() => {
    setSystemScopeZoomOpen(false)
  }, [])

  const openSystemScopeZoom = useCallback(() => {
    setSystemScopeZoomOpen(true)
  }, [])

  const syncLocationRoute = useCallback(
    (nextOpenProjectIndex: number | null, method: 'push' | 'replace' = 'replace') => {
      if (typeof window === 'undefined') {
        return
      }

      const nextUrl = buildLocationUrl(
        nextOpenProjectIndex,
        0,
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

  const handleSetMediaRef = useCallback((index: number, node: HTMLDivElement | null) => {
    caseMediaRefs.current[index] = node
  }, [])

  const handleSetHomeMediaRef = useCallback((node: HTMLDivElement | null) => {
    homeMediaRef.current = node
  }, [])

  const measureContactContainerRect = useCallback(() => {
    const mediaNode =
      openProjectIndex !== null ? caseMediaRefs.current[openProjectIndex] ?? null : homeMediaRef.current
    setContactContainerRect(getContactContainerRect(mediaNode))
  }, [openProjectIndex])

  const handleOpenCaseProject = useCallback(
    (index: number) => {
      if (index < 0 || index >= PROJECT_CARDS.length) {
        return
      }

      closeContactModal()
      closeSystemScopeZoom()
      setOpenProjectIndex(index)

      if (mainRef.current) {
        mainRef.current.scrollTop = 0
      }

      syncLocationRoute(index, 'push')
    },
    [closeContactModal, closeSystemScopeZoom, syncLocationRoute]
  )

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
    setOpenProjectIndex(null)

    if (mainRef.current) {
      mainRef.current.scrollTop = 0
    }

    syncLocationRoute(null, openProjectIndex !== null ? 'push' : 'replace')
  }, [closeContactModal, closeSystemScopeZoom, openProjectIndex, syncLocationRoute])

  useEffect(() => {
    if (openProjectIndex === null) {
      syncLocationRoute(null, 'replace')
    }
  }, [openProjectIndex, syncLocationRoute])

  useEffect(() => {
    const applyLocationRoute = () => {
      const nextRoute = parseLocationRoute(
        window.location.pathname,
        window.location.hash,
        window.location.protocol,
        PROJECT_CARDS,
        SECTION_COUNT
      )

      setOpenProjectIndex(nextRoute?.openProjectIndex ?? null)
      closeContactModal()
      closeSystemScopeZoom()

      if (mainRef.current) {
        mainRef.current.scrollTop = 0
      }
    }

    window.addEventListener('popstate', applyLocationRoute)
    return () => {
      window.removeEventListener('popstate', applyLocationRoute)
    }
  }, [closeContactModal, closeSystemScopeZoom])

  useEffect(() => {
    if (!isContactModalOpen) {
      return undefined
    }

    const updateContactRect = () => {
      measureContactContainerRect()
    }

    updateContactRect()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeContactModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', updateContactRect)
    window.addEventListener('orientationchange', updateContactRect)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', updateContactRect)
      window.removeEventListener('orientationchange', updateContactRect)
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
        className={`landing-main ${isProjectOpen ? 'case-redesign-main is-project-open' : 'homepage-single-main'}`.trim()}
        aria-label={isProjectOpen ? 'Project page' : 'Homepage'}
      >
        {isProjectOpen && activeProjectCard ? (
          <ProjectSection
            card={activeProjectCard}
            index={activeProjectIndex}
            isLastProject={activeProjectIndex === PROJECT_CARDS.length - 1}
            isCaseDescriptionVisible={false}
            isIntroVisible={false}
            isProjectContentVisible={true}
            isProjectOpen={true}
            isProjectPanelOpen={true}
            isOutgoingHomePreview={false}
            onOpenProject={handleOpenCaseProject}
            onSetMediaRef={handleSetMediaRef}
            visibleSectionIndex={0}
          >
            <ProjectDetails slug={activeProjectCard.slug} onOpenSystemScopeZoom={openSystemScopeZoom} />
          </ProjectSection>
        ) : (
          <section className="section-panel section-panel-hero section-panel-homepage-single" aria-label="Homepage">
            <HomepageHero
              cards={HOME_HERO_CARDS}
              isActive
              onOpenProject={handleOpenCaseProject}
              onSetMediaRef={handleSetHomeMediaRef}
            />
          </section>
        )}
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

      {isCustomCursorEnabled ? <CustomCursor /> : null}
    </div>
  )
}

export default App
