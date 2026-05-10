import { useCallback, useEffect, useRef, type VideoHTMLAttributes } from 'react'

interface AutoplayVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  restartOnPlay?: boolean
  shouldPlay?: boolean
}

/**
 * True for desktop/iOS Safari. WebKit blocks programmatic `play()` without user
 * activation; Chrome (incl. CriOS, Electron) and other engines are excluded.
 */
function isStrictWebKitSafari(): boolean {
  if (typeof navigator === 'undefined') {
    return false
  }

  const ua = navigator.userAgent
  if (/Chrome|Chromium|Edg|OPR|CriOS|EdgiOS|FxiOS/i.test(ua)) {
    return false
  }

  return /Safari/i.test(ua) && /AppleWebKit/i.test(ua)
}

function AutoplayVideo({
  children,
  className,
  controls = false,
  muted = true,
  playsInline = true,
  autoPlay = true,
  loop = true,
  preload = 'auto',
  restartOnPlay = false,
  shouldPlay = true,
  onPointerDown,
  ...videoProps
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const previousShouldPlayRef = useRef(shouldPlay)

  const prepareVideo = useCallback(() => {
    const videoNode = videoRef.current
    if (!videoNode) {
      return null
    }

    videoNode.controls = controls
    videoNode.defaultMuted = muted
    videoNode.muted = muted
    videoNode.autoplay = autoPlay && shouldPlay
    videoNode.playsInline = playsInline
    videoNode.disableRemotePlayback = true
    if (autoPlay && shouldPlay) {
      videoNode.setAttribute('autoplay', '')
    } else {
      videoNode.removeAttribute('autoplay')
    }
    videoNode.setAttribute('muted', '')
    videoNode.setAttribute('playsinline', '')
    videoNode.setAttribute('webkit-playsinline', '')

    return videoNode
  }, [autoPlay, controls, muted, playsInline, shouldPlay])

  const playVideo = useCallback(() => {
    if (!shouldPlay) {
      return
    }

    const videoNode = prepareVideo()
    if (!videoNode) {
      return
    }

    const strictSafari = isStrictWebKitSafari()
    const activation =
      typeof navigator !== 'undefined' && 'userActivation' in navigator
        ? (navigator as Navigator & { userActivation?: { hasBeenActive?: boolean } })
            .userActivation
        : undefined

    if (strictSafari && !activation?.hasBeenActive) {
      return
    }

    void videoNode.play().catch(() => {})
  }, [prepareVideo, shouldPlay])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const preparedVideo = prepareVideo()
    if (!preparedVideo) {
      return undefined
    }

    const wasPlaying = previousShouldPlayRef.current
    previousShouldPlayRef.current = shouldPlay

    if (!shouldPlay) {
      preparedVideo.pause()
      return undefined
    }

    if (restartOnPlay && !wasPlaying) {
      try {
        preparedVideo.currentTime = 0
      } catch {
        // Some browsers can briefly reject seeking before metadata is ready.
      }
    }

    const strictSafari = isStrictWebKitSafari()
    const videoNode = preparedVideo

    const playWhenReady = () => {
      playVideo()
    }

    window.addEventListener('pointerdown', playWhenReady, { passive: true })
    window.addEventListener('touchstart', playWhenReady, { passive: true })

    let wheelRaf = 0
    const onWheel = () => {
      if (wheelRaf !== 0 || strictSafari) {
        return
      }
      wheelRaf = window.requestAnimationFrame(() => {
        wheelRaf = 0
        playVideo()
      })
    }
    if (!strictSafari) {
      window.addEventListener('wheel', onWheel, { passive: true })
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        playVideo()
      }
    }
    if (!strictSafari) {
      document.addEventListener('visibilitychange', onVisibility)
    }

    const onPageShow = () => {
      playVideo()
    }
    if (!strictSafari) {
      window.addEventListener('pageshow', onPageShow)
    }

    const onCanPlay = () => {
      playVideo()
    }
    if (!strictSafari && videoNode) {
      videoNode.addEventListener('canplay', onCanPlay)
    }

    let observer: IntersectionObserver | null = null
    if (!strictSafari && videoNode && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          const visible =
            Boolean(entry?.isIntersecting) && (entry?.intersectionRatio ?? 0) >= 0.02
          if (visible) {
            playVideo()
          }
        },
        { threshold: [0, 0.05, 0.1, 0.2] }
      )
      observer.observe(videoNode)
    }

    let rafId = 0
    if (!strictSafari) {
      rafId = window.requestAnimationFrame(() => {
        playVideo()
      })
    }

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener('pointerdown', playWhenReady)
      window.removeEventListener('touchstart', playWhenReady)
      window.removeEventListener('wheel', onWheel)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pageshow', onPageShow)
      videoNode?.removeEventListener('canplay', onCanPlay)
      observer?.disconnect()
      if (wheelRaf !== 0) {
        window.cancelAnimationFrame(wheelRaf)
      }
    }
  }, [playVideo, prepareVideo, restartOnPlay, shouldPlay])

  return (
    <video
      ref={videoRef}
      {...videoProps}
      className={className}
      autoPlay={autoPlay && shouldPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      controls={controls}
      disablePictureInPicture
      disableRemotePlayback
      onPointerDown={(event) => {
        playVideo()
        onPointerDown?.(event)
      }}
    >
      {children}
    </video>
  )
}

export default AutoplayVideo
