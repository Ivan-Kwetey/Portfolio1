import AnimatedText from './AnimatedText'

function ContentArea({ onNext }) {
  return (
    <div className="content-area" aria-label="Content area">
      <div className="card-container">
        <div className="content-card">
          <div className="card-text">
            <AnimatedText
              className="content-copy"
              text="I design mobile and web products for social consumer experiences people want to return to"
              targetColor="#060514"
              baseColor="#b2b2b2"
              letterSpacing={-1}
              revealDuration={1.5}
              delayStep={0.18}
              startDelay={0.28}
            />
          </div>
        </div>

        <button
          type="button"
          className="arrow-button"
          aria-label="Go to case study section"
          onClick={onNext}
        >
          <svg
            className="arrow-icon"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <g filter="url(#arrowShadow)">
              <path
                d="M29 52C42.8071 52 54 40.8071 54 27C54 13.1929 42.8071 2 29 2C15.1929 2 4 13.1929 4 27C4 40.8071 15.1929 52 29 52Z"
                fill="#F4F4F5"
              />
            </g>
            <path
              d="M29 20V34M29 34L22 27M29 34L36 27"
              stroke="#8D8F93"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <filter
                id="arrowShadow"
                x="0"
                y="0"
                width="58"
                height="58"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
              </filter>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ContentArea
