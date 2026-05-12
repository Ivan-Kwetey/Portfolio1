import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import Footer from './Footer'
import PhoneMediaStage from './PhoneMediaStage'

const HOME_CARD_SLIDE_DURATION = 1.65
const HOME_CARD_SLIDE_EASE = 'sine.inOut'
const HOME_CARD_TOUCH_TRIGGER_THRESHOLD = 36
type HomeCardSkillAnchors = {
  product: number
  relocate: number
}

const HOME_CARD_DEFAULT_SKILL_ANCHORS: HomeCardSkillAnchors = {
  product: 516,
  relocate: 1077,
}
const HOME_CARD_SKILL_CLUSTERS = [
  {
    anchor: 'product',
    columns: [
      ['Research', 'Prototype'],
      ['Wireframes', 'Testing'],
    ],
    id: 'product',
  },
  {
    anchor: 'relocate',
    columns: [
      ['Strategy', 'Design'],
      ['Systems'],
    ],
    id: 'relocate',
  },
] as const

interface HomepageHeroCard {
  descriptionLines: string[]
  id: string
  projectIndex: number
  title: string
  videoUrl: string
}

interface HomepageHeroProps {
  cards: HomepageHeroCard[]
  isActive: boolean
  isInteractionLocked?: boolean
  onOpenProject: (index: number) => void
  onSetMediaRef: (node: HTMLDivElement | null) => void
}

function HomepageHero({
  cards,
  isActive,
  isInteractionLocked = false,
  onOpenProject,
  onSetMediaRef,
}: HomepageHeroProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [displayedCardIndex, setDisplayedCardIndex] = useState(0)
  const [isCardTransitioning, setIsCardTransitioning] = useState(false)
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true)
  const [skillAnchors, setSkillAnchors] = useState(HOME_CARD_DEFAULT_SKILL_ANCHORS)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const scrollShellRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const slideTweenRef = useRef<gsap.core.Tween | null>(null)
  const activeCardIndexRef = useRef(0)
  const touchStartXRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)
  const touchGestureConsumedRef = useRef(false)
  const wheelLockRef = useRef(false)
  const hasPrimedCardVideosRef = useRef(false)
  const displayedCard = cards[displayedCardIndex] ?? cards[0]
  const progressRatio = cards.length <= 1 ? 1 : (activeCardIndex + 1) / cards.length

  useEffect(() => {
    activeCardIndexRef.current = activeCardIndex
  }, [activeCardIndex])

  useLayoutEffect(() => {
    const scrollShellNode = scrollShellRef.current
    const trackNode = trackRef.current
    if (!scrollShellNode || !trackNode) {
      return undefined
    }

    const getTargetX = (index: number) => {
      const cardNode = cardRefs.current[index]
      if (!cardNode) {
        return 0
      }

      return scrollShellNode.clientWidth / 2 - (cardNode.offsetLeft + cardNode.offsetWidth / 2)
    }

    const setTrackToActiveCard = (index: number) => {
      gsap.set(trackNode, { x: getTargetX(index) })
    }

    const primeCardVideos = () => {
      if (hasPrimedCardVideosRef.current) {
        return
      }

      hasPrimedCardVideosRef.current = true

      cardRefs.current.forEach((cardNode, index) => {
        const videoNode = cardNode?.querySelector<HTMLVideoElement>('video')
        if (!videoNode) {
          return
        }

        videoNode.defaultMuted = true
        videoNode.muted = true
        videoNode.playsInline = true
        videoNode.setAttribute('muted', '')
        videoNode.setAttribute('playsinline', '')
        videoNode.setAttribute('webkit-playsinline', '')

        const playAttempt = videoNode.play()
        if (index === activeCardIndexRef.current) {
          void playAttempt?.catch(() => {})
          return
        }

        void playAttempt
          ?.then(() => {
            videoNode.pause()
            try {
              videoNode.currentTime = 0
            } catch {
              // Some browsers reject immediate seeks while metadata is still settling.
            }
          })
          .catch(() => {})
      })
    }

    const handleWheel = (event: WheelEvent) => {
      if (isInteractionLocked) {
        return
      }

      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX

      if (Math.abs(delta) < 18) {
        return
      }

      event.preventDefault()

      if (wheelLockRef.current) {
        return
      }

      const direction = delta > 0 ? 1 : -1
      const nextIndex = Math.max(
        0,
        Math.min(cards.length - 1, activeCardIndexRef.current + direction)
      )

      if (nextIndex === activeCardIndexRef.current) {
        return
      }

      wheelLockRef.current = true
      setIsCardTransitioning(true)
      setIsDescriptionVisible(false)
      setActiveCardIndex(nextIndex)
    }

    const handleTouchStart = (event: TouchEvent) => {
      primeCardVideos()

      const touch = event.touches[0]
      if (!touch) {
        return
      }

      touchStartXRef.current = touch.clientX
      touchStartYRef.current = touch.clientY
      touchGestureConsumedRef.current = false
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (isInteractionLocked) {
        return
      }

      if (touchGestureConsumedRef.current || wheelLockRef.current) {
        event.preventDefault()
        return
      }

      const touch = event.touches[0]
      const startX = touchStartXRef.current
      const startY = touchStartYRef.current
      if (!touch || startX === null || startY === null) {
        return
      }

      const deltaX = touch.clientX - startX
      const deltaY = startY - touch.clientY

      if (Math.abs(deltaY) <= Math.abs(deltaX)) {
        return
      }

      if (Math.abs(deltaY) < HOME_CARD_TOUCH_TRIGGER_THRESHOLD) {
        return
      }

      event.preventDefault()
      touchGestureConsumedRef.current = true

      if (wheelLockRef.current) {
        return
      }

      const direction = deltaY > 0 ? 1 : -1
      const nextIndex = Math.max(
        0,
        Math.min(cards.length - 1, activeCardIndexRef.current + direction)
      )

      if (nextIndex === activeCardIndexRef.current) {
        return
      }

      wheelLockRef.current = true
      setIsCardTransitioning(true)
      setIsDescriptionVisible(false)
      setActiveCardIndex(nextIndex)
    }

    const resetTouchGesture = () => {
      touchStartXRef.current = null
      touchStartYRef.current = null
      touchGestureConsumedRef.current = false
    }

    setTrackToActiveCard(activeCardIndexRef.current)

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', resetTouchGesture)
    window.addEventListener('touchcancel', resetTouchGesture)
    const handleResize = () => {
      setTrackToActiveCard(activeCardIndexRef.current)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      slideTweenRef.current?.kill()
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', resetTouchGesture)
      window.removeEventListener('touchcancel', resetTouchGesture)
      window.removeEventListener('resize', handleResize)
    }
  }, [cards.length, isInteractionLocked])

  useEffect(() => {
    const scrollShellNode = scrollShellRef.current
    const trackNode = trackRef.current
    const activeCardNode = cardRefs.current[activeCardIndex]

    if (!scrollShellNode || !trackNode || !activeCardNode) {
      return
    }

    const targetX = scrollShellNode.clientWidth / 2 - (activeCardNode.offsetLeft + activeCardNode.offsetWidth / 2)

    slideTweenRef.current?.kill()
    slideTweenRef.current = gsap.to(trackNode, {
      x: targetX,
      duration: HOME_CARD_SLIDE_DURATION,
      ease: HOME_CARD_SLIDE_EASE,
      onComplete: () => {
        setDisplayedCardIndex(activeCardIndex)
        setIsDescriptionVisible(true)
        setIsCardTransitioning(false)
        wheelLockRef.current = false
      },
    })

    return () => {
      slideTweenRef.current?.kill()
      slideTweenRef.current = null
    }
  }, [activeCardIndex])

  useEffect(() => {
    onSetMediaRef(cardRefs.current[activeCardIndex] ?? null)

    return () => {
      onSetMediaRef(null)
    }
  }, [activeCardIndex, onSetMediaRef])

  useLayoutEffect(() => {
    const heroNode = heroRef.current
    const navbarNode = document.querySelector<HTMLElement>('.global-navbar')
    const productNode = document.querySelector<HTMLElement>('.nav-item-product')
    const relocateNode = document.querySelector<HTMLElement>('.nav-item-relocate')

    if (!heroNode || !navbarNode || !productNode || !relocateNode) {
      return undefined
    }

    let frameId = 0

    const updateSkillAnchors = () => {
      frameId = 0

      const heroRect = heroNode.getBoundingClientRect()
      const nextAnchors = {
        product: productNode.getBoundingClientRect().left - heroRect.left,
        relocate: relocateNode.getBoundingClientRect().left - heroRect.left,
      }

      setSkillAnchors((previousAnchors) => {
        if (
          Math.abs(previousAnchors.product - nextAnchors.product) < 0.5 &&
          Math.abs(previousAnchors.relocate - nextAnchors.relocate) < 0.5
        ) {
          return previousAnchors
        }

        return nextAnchors
      })
    }

    const scheduleSkillAnchorUpdate = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(updateSkillAnchors)
    }

    scheduleSkillAnchorUpdate()

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            scheduleSkillAnchorUpdate()
          })

    resizeObserver?.observe(heroNode)
    resizeObserver?.observe(navbarNode)
    resizeObserver?.observe(productNode)
    resizeObserver?.observe(relocateNode)
    window.addEventListener('resize', scheduleSkillAnchorUpdate)

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }

      resizeObserver?.disconnect()
      window.removeEventListener('resize', scheduleSkillAnchorUpdate)
    }
  }, [])

  return (
    <div
      ref={heroRef}
      className={`homepage-hero ${isCardTransitioning ? 'is-card-transitioning' : ''}`.trim()}
      aria-label="Homepage"
    >
      <div className="homepage-hero-nav-surface" aria-hidden="true" />

      <div className="homepage-hero-top-meta" aria-hidden="true">
        <p className="homepage-hero-cases-label">Cases</p>

        {HOME_CARD_SKILL_CLUSTERS.map((cluster) => (
          <div
            key={cluster.id}
            className="homepage-hero-skill-cluster"
            style={{ left: skillAnchors[cluster.anchor] }}
          >
            {cluster.columns.map((column, columnIndex) => (
              <div key={`${cluster.id}-${columnIndex}`} className="homepage-hero-skill-column">
                {column.map((skill) => (
                  <span key={skill} className="homepage-hero-skill-item">
                    {skill}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div ref={scrollShellRef} className="homepage-hero-scroll-shell" aria-label="Project cards">
        <div ref={trackRef} className="homepage-hero-scroll-track">
          {cards.map((card, index) => {
            const isActiveCard = index === activeCardIndex
            const isPlaybackCard = index === displayedCardIndex

            return (
              <div
                key={card.id}
                className={`homepage-hero-card-stack ${isActiveCard ? 'is-active' : 'is-inactive'}`.trim()}
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
              >
                <button
                  type="button"
                  className="homepage-hero-card-button"
                  aria-label={`Open ${card.title} project`}
                  onClick={() => onOpenProject(card.projectIndex)}
                >
                  <PhoneMediaStage
                    isActive={isActive && isPlaybackCard}
                    isHoverEnabled={isActiveCard}
                    videoUrl={card.videoUrl}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className={`homepage-hero-description-zone ${isDescriptionVisible ? 'is-visible' : 'is-hidden'}`.trim()}>
        <div className="homepage-hero-description-wrap">
          <p className="homepage-hero-card-title">{displayedCard.title}</p>
          <p className="homepage-hero-card-description">
            {displayedCard.descriptionLines.map((line, index) => (
              <Fragment key={`${displayedCard.id}-${line}`}>
                {line}
                {index < displayedCard.descriptionLines.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </p>
        </div>
      </div>

      <div className="homepage-hero-progress-shell" aria-hidden="true">
        <div className="homepage-hero-progress-track">
          <div
            className="homepage-hero-progress-fill"
            style={{ transform: `scaleX(${progressRatio})` }}
          />
        </div>
      </div>

      <div className="homepage-footer">
        <Footer />
      </div>
    </div>
  )
}

export default HomepageHero
