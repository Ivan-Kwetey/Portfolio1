import { useEffect, useRef, useState } from 'react'

const CURSOR_FOLLOW_LERP = 0.28
const CURSOR_SNAP_DISTANCE = 0.35
const CURSOR_INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, label, [role="button"], [data-cursor-hover]'

function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [label, setLabel] = useState('')
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const cursorIsVisibleRef = useRef(false)
  const cursorIsExpandedRef = useRef(false)
  const cursorLabelRef = useRef('')
  const cursorTargetPositionRef = useRef({ x: 0, y: 0 })
  const cursorCurrentPositionRef = useRef({ x: 0, y: 0 })
  const cursorHasPositionRef = useRef(false)

  useEffect(() => {
    const root = document.documentElement
    const cursorNode = cursorRef.current
    if (!cursorNode) {
      return undefined
    }

    root.classList.add('has-custom-cursor')

    let rafId: number | null = null

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

    const updateHoverState = (target: EventTarget | null) => {
      const targetElement = target instanceof Element ? target : null
      const isInteractive = Boolean(targetElement?.closest(CURSOR_INTERACTIVE_SELECTOR))
      const nextLabel = targetElement?.closest<HTMLElement>('[data-cursor-label]')?.dataset.cursorLabel ?? ''
      const hasLabel = nextLabel.length > 0

      if (cursorIsExpandedRef.current !== (hasLabel || isInteractive)) {
        cursorIsExpandedRef.current = hasLabel || isInteractive
        setIsExpanded(hasLabel || isInteractive)
      }

      if (cursorLabelRef.current !== nextLabel) {
        cursorLabelRef.current = nextLabel
        setLabel(nextLabel)
      }

      const shouldCursorBeVisible = hasLabel || !isInteractive
      if (cursorIsVisibleRef.current !== shouldCursorBeVisible) {
        cursorIsVisibleRef.current = shouldCursorBeVisible
        setIsVisible(shouldCursorBeVisible)
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
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

    const handleWindowMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget !== null) {
        return
      }

      cursorIsVisibleRef.current = false
      setIsVisible(false)
      if (cursorIsExpandedRef.current) {
        cursorIsExpandedRef.current = false
        setIsExpanded(false)
      }
      if (cursorLabelRef.current) {
        cursorLabelRef.current = ''
        setLabel('')
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
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isVisible ? 'is-visible' : ''} ${isExpanded ? 'is-expanded' : ''} ${label ? 'has-label' : ''}`.trim()}
      aria-hidden="true"
    >
      <span className="custom-cursor-text">{label}</span>
    </div>
  )
}

export default CustomCursor
