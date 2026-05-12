import { useCallback, useEffect, useRef, type VideoHTMLAttributes } from 'react'

interface AutoplayVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  restartOnPlay?: boolean
  shouldPlay?: boolean
}

type PlaybackSignalListener = () => void

const playbackSignalListeners = new Set<PlaybackSignalListener>()
let playbackSignalCleanup: (() => void) | null = null

function emitPlaybackSignal() {
  playbackSignalListeners.forEach((listener) => {
    listener()
  })
}

function subscribeToPlaybackSignals(listener: PlaybackSignalListener) {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  playbackSignalListeners.add(listener)

  if (!playbackSignalCleanup) {
    let wheelRaf = 0

    const onPlaybackSignal = () => {
      emitPlaybackSignal()
    }

    const onWheel = () => {
      if (wheelRaf !== 0) {
        return
      }

      wheelRaf = window.requestAnimationFrame(() => {
        wheelRaf = 0
        emitPlaybackSignal()
      })
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        emitPlaybackSignal()
      }
    }

    window.addEventListener('pointerdown', onPlaybackSignal, { passive: true })
    window.addEventListener('touchstart', onPlaybackSignal, { passive: true })
    window.addEventListener('pageshow', onPlaybackSignal)
    window.addEventListener('wheel', onWheel, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    playbackSignalCleanup = () => {
      window.removeEventListener('pointerdown', onPlaybackSignal)
      window.removeEventListener('touchstart', onPlaybackSignal)
      window.removeEventListener('pageshow', onPlaybackSignal)
      window.removeEventListener('wheel', onWheel)
      document.removeEventListener('visibilitychange', onVisibilityChange)

      if (wheelRaf !== 0) {
        window.cancelAnimationFrame(wheelRaf)
      }

      playbackSignalCleanup = null
    }
  }

  return () => {
    playbackSignalListeners.delete(listener)

    if (playbackSignalListeners.size === 0) {
      playbackSignalCleanup?.()
    }
  }
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

    const videoNode = preparedVideo

    const playWhenReady = () => {
      playVideo()
    }

    const unsubscribePlaybackSignals = subscribeToPlaybackSignals(playWhenReady)

    const onCanPlay = () => {
      playVideo()
    }
    if (videoNode) {
      videoNode.addEventListener('canplay', onCanPlay)
    }

    let observer: IntersectionObserver | null = null
    if (videoNode && typeof IntersectionObserver !== 'undefined') {
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
    rafId = window.requestAnimationFrame(() => {
      playVideo()
    })

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId)
      }
      unsubscribePlaybackSignals()
      videoNode?.removeEventListener('canplay', onCanPlay)
      observer?.disconnect()
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
