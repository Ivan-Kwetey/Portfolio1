import AutoplayVideo from './AutoplayVideo'

interface PhoneMediaStageProps {
  isHoverEnabled?: boolean
  isActive: boolean
  videoUrl: string
}

function PhoneMediaStage({ isActive, isHoverEnabled = false, videoUrl }: PhoneMediaStageProps) {
  return (
    <div
      className="homepage-media-card"
      data-cursor-hover={isHoverEnabled ? '' : undefined}
      data-cursor-label={isHoverEnabled ? 'VIEW' : undefined}
    >
      <AutoplayVideo
        src={videoUrl}
        className="homepage-media-card-video"
        preload="auto"
        restartOnPlay
        shouldPlay={isActive}
        aria-hidden="true"
      />
    </div>
  )
}

export default PhoneMediaStage
