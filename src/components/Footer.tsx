function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="global-footer" aria-label="Global footer">
      <div className="footer-segment" />
      <div className="footer-segment footer-segment-center">
        <img src="/logo.svg" alt="Logo" className="footer-logo" />
      </div>
      <div className="footer-segment footer-segment-end">
        <span className="footer-year">{currentYear}</span>
      </div>
    </footer>
  )
}

export default Footer
