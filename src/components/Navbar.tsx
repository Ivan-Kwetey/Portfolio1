interface NavbarProps {
  isContactModalOpen?: boolean
  locationLabel: string
  name: string
  onContactClick: () => void
  onHomeClick: () => void
  roleLabel: string
}

function Navbar({
  isContactModalOpen = false,
  locationLabel,
  name,
  onContactClick,
  onHomeClick,
  roleLabel,
}: NavbarProps) {
  return (
    <header className="global-navbar-wrapper" aria-label="Global navigation">
      <nav className="global-navbar">
        <button
          type="button"
          className="nav-item nav-item-primary nav-home-trigger"
          onClick={onHomeClick}
        >
          {name}
        </button>
        <span className="nav-item nav-item-secondary nav-item-product">{roleLabel.toUpperCase()}</span>
        <span className="nav-item nav-item-secondary nav-item-relocate">{locationLabel.toUpperCase()}</span>
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
