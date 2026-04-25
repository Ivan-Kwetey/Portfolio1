import caseStudyArrow from '../assets/case-study/arrow-dark.svg'
import caseStudyPhone from '../assets/case-study/instagram-phone.png'

function CaseStudySection({ isDescriptionVisible = false, description = '' }) {
  return (
    <div className="case-study-section">
      <div className="case-study-container">
        <div
          className={`case-study-description-overlay ${isDescriptionVisible ? 'is-visible' : ''}`.trim()}
        >
          <p className="case-study-description">{description}</p>
        </div>

        <div className="case-study-card-container">
          <div className="case-study-card">
            <img
              src={caseStudyPhone}
              alt="Case preview on iPhone"
              className="case-study-phone-image"
            />
          </div>

          <button
            type="button"
            className={`case-study-arrow-button ${isDescriptionVisible ? 'is-visible' : ''}`.trim()}
            aria-label="Open case study"
          >
            <img src={caseStudyArrow} alt="" aria-hidden="true" className="case-study-arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CaseStudySection
