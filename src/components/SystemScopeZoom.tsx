interface SystemScopeZoomProps {
  closeIconSrc: string
  imageSrc: string
  isOpen: boolean
  onClose: () => void
}

function SystemScopeZoom({ closeIconSrc, imageSrc, isOpen, onClose }: SystemScopeZoomProps) {
  if (!isOpen) {
    return null
  }

  return (
    <section
      className="system-scope-zoom-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="System scope image preview"
      onClick={onClose}
    >
      <div className="system-scope-zoom-content" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="system-scope-zoom-close"
          aria-label="Close image preview"
          onClick={onClose}
        >
          <img src={closeIconSrc} alt="" aria-hidden="true" className="system-scope-zoom-close-icon" />
        </button>
        <img
          src={imageSrc}
          alt="System scope information architecture expanded"
          className="system-scope-zoom-image"
        />
      </div>
    </section>
  )
}

export default SystemScopeZoom
