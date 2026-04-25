import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const BLOB_CONFIG = [
  { x: 0.14, y: 0.2, radius: 0.26, color: '196,208,236', alpha: 0.25, mass: 1.0, speed: 0.24 },
  { x: 0.76, y: 0.2, radius: 0.24, color: '202,214,240', alpha: 0.26, mass: 1.05, speed: 0.2 },
  { x: 0.5, y: 0.56, radius: 0.3, color: '210,220,244', alpha: 0.24, mass: 1.15, speed: 0.22 },
  { x: 0.24, y: 0.78, radius: 0.22, color: '188,200,230', alpha: 0.22, mass: 0.95, speed: 0.16 },
  { x: 0.84, y: 0.74, radius: 0.2, color: '204,216,242', alpha: 0.21, mass: 0.9, speed: 0.14 },
  { x: 0.37, y: 0.34, radius: 0.18, color: '194,207,236', alpha: 0.2, mass: 0.88, speed: 0.19 },
  { x: 0.66, y: 0.46, radius: 0.16, color: '206,217,242', alpha: 0.19, mass: 0.84, speed: 0.17 },
  { x: 0.12, y: 0.58, radius: 0.15, color: '186,199,229', alpha: 0.18, mass: 0.8, speed: 0.15 },
  { x: 0.92, y: 0.36, radius: 0.14, color: '200,213,240', alpha: 0.17, mass: 0.78, speed: 0.13 },
]

function FluidBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) {
      return undefined
    }

    let width = 0
    let height = 0
    let dpr = 1

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const smoothPointer = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      intensity: 0,
    }

    const pointerMotion = {
      prevX: smoothPointer.x,
      prevY: smoothPointer.y,
    }

    const updatePointerX = gsap.quickTo(smoothPointer, 'x', { duration: 0.45, ease: 'power3.out' })
    const updatePointerY = gsap.quickTo(smoothPointer, 'y', { duration: 0.45, ease: 'power3.out' })
    const updatePointerIntensity = gsap.quickTo(smoothPointer, 'intensity', {
      duration: 0.35,
      ease: 'power2.out',
    })

    const blobs = BLOB_CONFIG.map((blob, index) => ({
      ...blob,
      xPx: 0,
      yPx: 0,
      vx: 0,
      vy: 0,
      phaseX: index * 1.7 + Math.random() * Math.PI,
      phaseY: index * 2.1 + Math.random() * Math.PI,
    }))

    const setSize = () => {
      const previousWidth = width
      const previousHeight = height

      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const scaleX = previousWidth > 0 ? width / previousWidth : 1
      const scaleY = previousHeight > 0 ? height / previousHeight : 1

      for (const blob of blobs) {
        if (previousWidth === 0 || previousHeight === 0) {
          blob.xPx = blob.x * width
          blob.yPx = blob.y * height
        } else {
          blob.xPx *= scaleX
          blob.yPx *= scaleY
        }
      }
    }

    const draw = (time) => {
      context.clearRect(0, 0, width, height)

      const minSide = Math.min(width, height)
      const pointerRange = minSide * 0.38
      const ambientScale = reduceMotion ? 0.018 : 0.03
      const velocityScale = reduceMotion ? 1.8 : 2.25
      const maxSpeed = reduceMotion ? 0.44 : 0.68
      const pointerVX = smoothPointer.x - pointerMotion.prevX
      const pointerVY = smoothPointer.y - pointerMotion.prevY
      const pointerSpeed = Math.hypot(pointerVX, pointerVY)
      const movementEnergy = gsap.utils.clamp(0, 1, pointerSpeed / 18) * smoothPointer.intensity

      pointerMotion.prevX = smoothPointer.x
      pointerMotion.prevY = smoothPointer.y

      for (let index = 0; index < blobs.length; index += 1) {
        const blobA = blobs[index]
        const radiusA = Math.max(92, blobA.radius * minSide)
        for (let otherIndex = index + 1; otherIndex < blobs.length; otherIndex += 1) {
          const blobB = blobs[otherIndex]
          const radiusB = Math.max(92, blobB.radius * minSide)

          const dx = blobB.xPx - blobA.xPx
          const dy = blobB.yPx - blobA.yPx
          const distance = Math.hypot(dx, dy) || 1
          const preferredDistance = (radiusA + radiusB) * 0.34

          if (distance >= preferredDistance) {
            continue
          }

          const nx = dx / distance
          const ny = dy / distance
          const overlap = (preferredDistance - distance) / preferredDistance
          const push = overlap * 0.3

          blobA.vx -= (nx * push) / blobA.mass
          blobA.vy -= (ny * push) / blobA.mass
          blobB.vx += (nx * push) / blobB.mass
          blobB.vy += (ny * push) / blobB.mass
        }
      }

      for (const blob of blobs) {
        const radius = Math.max(92, blob.radius * minSide)

        const dx = blob.xPx - smoothPointer.x
        const dy = blob.yPx - smoothPointer.y
        const distance = Math.hypot(dx, dy) || 1
        const influence = Math.max(0, 1 - distance / pointerRange)
        const nx = dx / distance
        const ny = dy / distance

        if (movementEnergy > 0.001 && influence > 0) {
          const impulse = (influence * influence * 1.45 * movementEnergy) / blob.mass
          blob.vx += nx * impulse + pointerVX * influence * 0.018
          blob.vy += ny * impulse + pointerVY * influence * 0.018
        }

        blob.vx += Math.sin(time * blob.speed + blob.phaseX) * ambientScale
        blob.vy += Math.cos(time * (blob.speed * 0.94) + blob.phaseY) * ambientScale

        blob.vx *= 0.95
        blob.vy *= 0.95

        const speed = Math.hypot(blob.vx, blob.vy) || 1
        if (speed > maxSpeed) {
          const scale = maxSpeed / speed
          blob.vx *= scale
          blob.vy *= scale
        }

        blob.xPx += blob.vx * velocityScale
        blob.yPx += blob.vy * velocityScale

        const minX = -radius * 0.28
        const maxX = width + radius * 0.28
        const minY = -radius * 0.28
        const maxY = height + radius * 0.28

        if (blob.xPx < minX) {
          blob.xPx = minX
          blob.vx *= -0.42
        } else if (blob.xPx > maxX) {
          blob.xPx = maxX
          blob.vx *= -0.42
        }

        if (blob.yPx < minY) {
          blob.yPx = minY
          blob.vy *= -0.42
        } else if (blob.yPx > maxY) {
          blob.yPx = maxY
          blob.vy *= -0.42
        }

        const gradient = context.createRadialGradient(
          blob.xPx,
          blob.yPx,
          radius * 0.14,
          blob.xPx,
          blob.yPx,
          radius
        )
        gradient.addColorStop(0, `rgba(${blob.color}, ${blob.alpha})`)
        gradient.addColorStop(0.62, `rgba(${blob.color}, ${blob.alpha * 0.44})`)
        gradient.addColorStop(1, `rgba(${blob.color}, 0)`)

        context.fillStyle = gradient
        context.beginPath()
        context.arc(blob.xPx, blob.yPx, radius, 0, Math.PI * 2)
        context.fill()
      }

    }

    const handlePointerMove = (event) => {
      updatePointerX(event.clientX)
      updatePointerY(event.clientY)
      updatePointerIntensity(0.8)
    }

    const handleTouchMove = (event) => {
      const touch = event.touches[0]
      if (!touch) {
        return
      }

      updatePointerX(touch.clientX)
      updatePointerY(touch.clientY)
      updatePointerIntensity(0.75)
    }

    const handlePointerExit = () => {
      updatePointerIntensity(0)
    }

    setSize()
    draw(0)

    window.addEventListener('resize', setSize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerExit)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handlePointerExit, { passive: true })

    gsap.ticker.add(draw)

    return () => {
      window.removeEventListener('resize', setSize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerExit)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handlePointerExit)
      gsap.ticker.remove(draw)
    }
  }, [])

  return <canvas ref={canvasRef} className="fluid-background" aria-hidden="true" />
}

export default FluidBackground
