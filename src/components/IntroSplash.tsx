import AnimatedText from './AnimatedText'
import manLogo from '../assets/man-logo.svg'
import { HOME_TAGLINE } from '../content/homeText'

interface IntroSplashProps {
  isHeroTextVisible: boolean
  isLogoFading: boolean
  isMetaFading: boolean
  isNameFading: boolean
}

function IntroSplash({
  isNameFading,
  isMetaFading,
  isLogoFading,
  isHeroTextVisible,
}: IntroSplashProps) {
  return (
    <div className="intro-splash" aria-hidden="true">
      <div className="intro-splash-content" data-node-id="816:7540">
        <p className={`intro-splash-name ${isNameFading ? 'is-fading' : ''}`.trim()} data-node-id="816:7534">
          IVAN K
        </p>

        <img
          src={manLogo}
          alt=""
          className={`intro-splash-logo ${isLogoFading ? 'is-fading' : ''}`.trim()}
          data-node-id="816:7534"
        />

        <div
          className={`intro-splash-meta ${isMetaFading ? 'is-fading' : ''}`.trim()}
          data-node-id="816:7543"
        >
          <p className="intro-splash-role" data-node-id="816:7539">
            PRODUCT DESIGNER
          </p>
          <p className="intro-splash-cta" data-node-id="816:7541">
            Lets work
          </p>
        </div>

        {isHeroTextVisible ? (
          <div className="intro-splash-hero-copy">
            <AnimatedText
              className="intro-splash-hero-text"
              text={HOME_TAGLINE}
              targetColor="#060514"
              baseColor="#b2b2b2"
              letterSpacing={-1}
              revealDuration={1.5}
              delayStep={0.18}
              startDelay={0.28}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default IntroSplash
