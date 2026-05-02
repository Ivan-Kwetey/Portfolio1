interface NavbarProps {
  isContactModalOpen?: boolean
  onContactClick: () => void
  onHomeClick: () => void
}

function Navbar({ isContactModalOpen = false, onContactClick, onHomeClick }: NavbarProps) {
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
        <span className="nav-item nav-item-secondary nav-item-relocate">
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
