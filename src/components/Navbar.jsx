import { useLayoutEffect, useRef } from 'react'

function Navbar({ isContactModalOpen = false, onContactClick, onHomeClick }) {
  const relocateRef = useRef(null)

  useLayoutEffect(() => {
    if (!relocateRef.current) {
      return undefined
    }

    const root = document.documentElement

    const updateRelocateStart = () => {
      if (!relocateRef.current) {
        return
      }

      const { left } = relocateRef.current.getBoundingClientRect()
      root.style.setProperty('--relocate-start-x', `${Math.round(left)}px`)
    }

    updateRelocateStart()

    window.addEventListener('resize', updateRelocateStart)
    window.addEventListener('orientationchange', updateRelocateStart)

    let resizeObserver
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateRelocateStart)
      resizeObserver.observe(document.body)
    }

    return () => {
      window.removeEventListener('resize', updateRelocateStart)
      window.removeEventListener('orientationchange', updateRelocateStart)

      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [])

  return (
    <header className="global-navbar-wrapper" aria-label="Global navigation">
      <nav className="global-navbar">
        <button
          type="button"
          className="nav-item nav-item-primary nav-home-trigger"
          onClick={onHomeClick}
        >
          IVAN K
        </button>
        <span className="nav-item nav-item-secondary nav-item-product">PRODUCT DESIGNER</span>
        <span ref={relocateRef} className="nav-item nav-item-secondary nav-item-relocate">
          WILLING TO RELOCATE
        </span>
        <button
          type="button"
          className="nav-item nav-item-secondary nav-item-contact nav-contact-trigger"
          onClick={onContactClick}
          aria-haspopup="dialog"
          aria-expanded={isContactModalOpen}
          aria-controls="contact-page-modal"
        >
          CONTACT
        </button>
      </nav>
    </header>
  )
}

export default Navbar
