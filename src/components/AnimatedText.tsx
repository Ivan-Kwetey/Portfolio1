import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface AnimatedTextProps {
  baseColor: string
  className?: string
  delayStep?: number
  letterSpacing?: number
  revealDuration?: number
  startDelay?: number
  targetColor: string
  text: string
}

function AnimatedText({
  text,
  className = '',
  targetColor,
  baseColor,
  letterSpacing = 0,
  revealDuration = 0.6,
  delayStep = 0.06,
  startDelay = 0,
}: AnimatedTextProps) {
  const rootRef = useRef<HTMLSpanElement | null>(null)
  const wordsRef = useRef<Array<HTMLSpanElement | null>>([])
  const words = text.split(' ')

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const wordElements = wordsRef.current.filter(Boolean)

      gsap.set(wordElements, {
        color: baseColor,
      })

      if (prefersReducedMotion) {
        gsap.set(wordElements, {
          color: targetColor,
        })
        return
      }

      gsap.to(wordElements, {
        color: targetColor,
        duration: revealDuration,
        delay: startDelay,
        stagger: delayStep,
        ease: 'power2.out',
      })
    }, rootRef)

    return () => {
      ctx.revert()
    }
  }, [baseColor, delayStep, revealDuration, startDelay, targetColor, text])

  return (
    <span
      ref={rootRef}
      className={`animated-text ${className}`.trim()}
      aria-label={text}
      style={{ letterSpacing: `${letterSpacing}px` }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${String(index)}`} aria-hidden="true">
          <span
            ref={(node) => {
              wordsRef.current[index] = node
            }}
            className="animated-word"
          >
            {word}
          </span>
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

export default AnimatedText
