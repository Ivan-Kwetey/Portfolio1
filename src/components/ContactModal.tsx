import type { CSSProperties } from 'react'

import type { ContactContainerRect } from '../types/portfolio'

interface ContactModalProps {
  contactLinks: {
    email: string
    phone: string
    linkedin: string
  }
  containerRect: ContactContainerRect | null
  isOpen: boolean
  onClose: () => void
}

function ContactModal({ contactLinks, containerRect, isOpen, onClose }: ContactModalProps) {
  if (!isOpen) {
    return null
  }

  const containerStyle: CSSProperties | undefined = containerRect
    ? {
        top: `${containerRect.top - 4}px`,
        left: `${containerRect.left - 4}px`,
        width: `${containerRect.width + 8}px`,
        height: `${containerRect.height + 8}px`,
        transform: 'none',
      }
    : undefined

  return (
    <section
      id="contact-page-modal"
      className="contact-page-modal is-open"
      role="dialog"
      aria-modal="true"
      aria-hidden={false}
      aria-label="Contact methods"
      onClick={onClose}
    >
      <div className="contact-container" style={containerStyle} onClick={onClose}>
        <div className="contact-methods" aria-label="Contact methods list" onClick={(event) => event.stopPropagation()}>
          <a className="contact-method-item contact-method-email" href={contactLinks.email}>
            EMAIL
          </a>
          <a className="contact-method-item" href={contactLinks.phone}>
            PHONE
          </a>
          <a
            className="contact-method-item contact-method-linkedin"
            href={contactLinks.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <span>LINKEDIN</span>
            <svg
              className="contact-linkedin-icon"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 8L9 1M9 1H4.5M9 1V5.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactModal
