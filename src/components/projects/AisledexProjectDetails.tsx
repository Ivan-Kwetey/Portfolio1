import AutoplayVideo from '../AutoplayVideo'
import Footer from '../Footer'
import { withCssVars } from '../../lib/withCssVars'
import introLogo from '../../assets/man-logo.svg'
import aisledexProblemImage from '../../assets/aisledex/problem.png'
import aisldexAccessibilityIcon from '../../assets/aisledex/accessibility.svg'
import aisldexClearIcon from '../../assets/aisledex/clear.svg'
import aisldexAudioIcon from '../../assets/aisledex/audio.svg'
import aisldexCartIcon from '../../assets/aisledex/cart.svg'
import aisldexClockIcon from '../../assets/aisledex/clock.svg'
import aisldexConfirmIcon from '../../assets/aisledex/confirm.svg'
import aisldexFinalImage1 from '../../assets/aisledex/f1.png'
import aisldexFinalImage2 from '../../assets/aisledex/f2.png'
import aisldexLocateIcon from '../../assets/aisledex/locate.svg'
import aisldexLofi1 from '../../assets/aisledex/lofi1.png'
import aisldexLofi2 from '../../assets/aisledex/lofi2.png'
import aisldexLofi3 from '../../assets/aisledex/lofi3.png'
import aisldexLofi4 from '../../assets/aisledex/lofi4.png'
import aisldexLofi5 from '../../assets/aisledex/lofi5.png'
import aisldexLofi6 from '../../assets/aisledex/lofi6.png'
import aisldexPathIcon from '../../assets/aisledex/path.svg'
import aisldexResearchImage1 from '../../assets/aisledex/r1.png'
import aisldexResearchImage2 from '../../assets/aisledex/r2.png'
import aisldexResearchImage3 from '../../assets/aisledex/r3.png'
import aisldexSolvingVideo from '../../assets/aisledex/solving.mp4'
import aisldexAislefinderImage from '../../assets/aisledex/aislefinder.png'
import aisldexDetourIcon from '../../assets/aisledex/detour.svg'
import aisldexTestingImage1 from '../../assets/aisledex/t1.png'
import aisldexTestingImage2 from '../../assets/aisledex/t2.png'
import aisldexTestingImage3 from '../../assets/aisledex/t3.png'
import aisldexScreenImage1 from '../../assets/aisledex/s1.png'
import aisldexScreenImage2 from '../../assets/aisledex/s2.png'
import aisldexScreenImage3 from '../../assets/aisledex/s3.png'
import aisldexPauseIcon from '../../assets/aisledex/pause.svg'
import aisldexUnavailableIcon from '../../assets/aisledex/unavailable.svg'
import aisldexUberImage from '../../assets/aisledex/uber.png'
import aisldexVisualIcon from '../../assets/aisledex/visual.svg'
import aisldexWalkIcon from '../../assets/aisledex/walk.svg'
import aisldexWalmartImage from '../../assets/aisledex/walmart.png'

const OVERVIEW = {
  label: 'About the project',
  title: (
    <>
      A smarter way
      <br />
      to navigate physical retail
    </>
  ),
  paragraphs: [
    'It was early 2025.',
    'Grocery trips had become inefficient and stressful crowded aisles, shifting layouts, and shoppers juggling multiple tasks. Existing shopping apps offered lists and deals, but none addressed the core challenge: helping people find products in-store with clarity.',
    'Through observing shoppers, it became clear this wasn’t a problem of lists or loyalty programs, it was a navigation problem that added cognitive load and wasted time.',
    'Aisledex was designed to address this: a guided, predictable, human-centered in-store experience that reduces mental effort instead of adding unnecessary screens. The system evolved through research, prototyping, and continuous iteration, always focused on helping shoppers move through stores efficiently and confidently.',
  ],
} as const

const PROBLEM = {
  label: 'The Problem',
  imageUrl: aisledexProblemImage,
  imageAlt: 'Problem statement about shoppers lacking a reliable way to orient themselves inside grocery stores.',
} as const

const SOLVING = {
  label: 'Solving the problem',
  title:
    'Aisledex provides route-based guidance that helps shoppers move through the store with confidence.',
  description: 'Aisledex does this in three clear steps.',
  videoUrl: aisldexSolvingVideo,
  prototypeUrl:
    'https://www.figma.com/proto/BQ76NayUdFgYixZk6lVHxp/Aisledex-new?node-id=127-1333&viewport=223%2C-66%2C0.06&t=7KkIuXlF9LsXeQix-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=127%3A1333&show-proto-sidebar=1&page-id=0%3A1',
  leftCallout: (
    <>
      Search Navigate Arrive
      <br />
      <span>in one continuous flow</span>
    </>
  ),
  rightCallout: (
    <>
      From search to shelf
      <br />
      <span>without missing a step</span>
    </>
  ),
  prototypeLabel: 'Try prototype here',
} as const

const COMPETITOR_ANALYSIS = {
  label: 'How existing solutions handle wayfinding',
  title: 'Most existing tools stop at item location, leaving shoppers to navigate on their own.',
  description: 'Knowing where an item is does not mean shoppers can get there confidently.',
  items: [
    {
      title: 'Aislefinder',
      imageUrl: aisldexAislefinderImage,
      imageAlt: 'Aislefinder search results showing aisle information without guided routing.',
      description:
        'Offers general aisle information, but does not adapt to a specific store or provide turn by turn routing',
    },
    {
      title: 'Uber',
      imageUrl: aisldexUberImage,
      imageAlt: 'Uber grocery item search flow without store-specific in-store navigation.',
      description:
        'Helps users search for items, but does not provide store specific aisle guidance or route support inside store',
    },
    {
      title: 'Walmart',
      imageUrl: aisldexWalmartImage,
      imageAlt: 'Walmart map and aisle labels that stop short of exact shelf guidance.',
      description:
        'Provides store specific aisle labels and basic aisle direction but stops short of guiding shoppers directly to the exact shelf',
    },
  ],
} as const

const USER_RESEARCH = {
  label: 'Understanding shopper frustrations',
  title: 'Early research combined social listening and 26 informal interviews.',
  description: 'These findings shaped the principles behind Aisledex.',
  media: [
    {
      src: aisldexResearchImage1,
      alt: 'Social post describing confusion in a store with no arrows or directions.',
      width: 199.487,
    },
    {
      src: aisldexResearchImage2,
      alt: 'Social post criticizing a grocery store for failing when shoppers need to ask for help.',
      width: 260.212,
    },
    {
      src: aisldexResearchImage3,
      alt: 'Social post about poor local grocery store wayfinding and missing aisle labels.',
      width: 204.033,
    },
  ],
  leftColumn: [
    {
      value: '31',
      description: 'Shoppers feel lost without clear directional cues at store entry.',
      tone: 'blue',
      height: 314.053,
    },
    {
      value: '13',
      description: 'Say, aisle signage is often mistrusted due to item-label mismatch.',
      tone: 'neutral',
      height: 188.268,
    },
  ],
  quoteCard: {
    text: 'Shoppers weren’t lost because the store was big,',
    highlight: 'they were frustrated by uncertainty.',
    width: 277,
    height: 271,
  },
  rightTopStat: {
    value: '23',
    description: 'Asking for help is seen as a system failure, not a user issue.',
    tone: 'cream',
    height: 270.481,
  },
  bottomStats: [
    {
      value: '15',
      description: 'Agree layout changes break learned shortcuts, and slow shopping.',
      tone: 'peach',
      height: 231.018,
    },
    {
      value: '18',
      description: 'Failure to find items quickly leads to abandoned or shortened trips.',
      tone: 'lavender',
      height: 231.018,
    },
  ],
} as const

const PRINCIPLES = {
  label: 'Design principles for confident navigation',
  title: 'Three principles shaped a clearer, more confident navigation flow',
  description: 'Clarity, confirmation, and micro-guidance shaped every design decision.',
  items: [
    {
      label: 'Clear orientation',
      title: 'Keep shoppers on track and confident',
      iconUrl: aisldexClearIcon,
      iconAlt: 'Clear orientation icon',
    },
    {
      label: 'Visual confirmation',
      title: 'Trust what you see',
      iconUrl: aisldexVisualIcon,
      iconAlt: 'Visual confirmation icon',
    },
    {
      label: 'Accessible guidance',
      title: 'Navigation for everyone',
      iconUrl: aisldexAccessibilityIcon,
      iconAlt: 'Accessible guidance icon',
    },
  ],
} as const

const LOFI = {
  label: 'Why These Decisions Won',
  title: 'Three decisions shaped the final navigation flow',
  description:
    'Each one shows the alternative explored, why it fell short, and why the final direction worked better.',
  routeDecision: {
    title: 'Route shoppers immediately after item selection.',
    description:
      'Route-first guidance let shoppers start moving immediately instead of planning the trip themselves.',
    copyWidth: 292,
    exploredLabel: 'Explored alternatives',
    exploredItems: [
      {
        title: 'Map-First',
        imageUrl: aisldexLofi1,
        imageAlt: 'Map-first Aisldex low-fidelity prototype.',
      },
      {
        title: 'Browse-First',
        imageUrl: aisldexLofi2,
        imageAlt: 'Browse-first Aisldex low-fidelity prototype.',
      },
    ],
    exploredCaption:
      'Map-first and browse-first ideas still asked shoppers to interpret layout and plan their own route.',
    chosenLabel: 'Chosen solution',
    chosenItem: {
      title: 'Route-First Navigation',
      imageUrl: aisldexLofi3,
      imageAlt: 'Route-first navigation Aisldex low-fidelity prototype.',
    },
    chosenCaption:
      'Route-first routing removes planning overhead and gets shoppers moving faster.',
  },
  progressDecision: {
    title: 'Keep progress and location feedback continuously visible.',
    description: 'Persistent progress cues reduced second-guessing in unfamiliar layouts.',
    copyWidth: 266,
    items: [
      {
        title: 'Without progress bar',
        imageUrl: aisldexLofi4,
        imageAlt: 'Low-fidelity navigation screen without progress bar.',
        tone: 'accent',
      },
      {
        title: 'With progress bar',
        imageUrl: aisldexLofi5,
        imageAlt: 'Low-fidelity navigation screen with progress bar.',
        tone: 'default',
      },
    ],
    caption: 'Visible progress helped users stay oriented without stopping to reassess.',
  },
  oneHandDecision: {
    title: 'Design for one-handed use while moving.',
    description: 'Navigation had to work while walking, carrying items, or pushing a cart.',
    copyWidth: 310,
    item: {
      title: 'No frequent taps',
      imageUrl: aisldexLofi6,
      imageAlt: 'Low-fidelity navigation screen designed for fewer taps while moving.',
    },
    caption:
      'Early tests showed users tapped for reassurance too often, slowing movement and breaking focus.',
  },
} as const

const TESTING = {
  label: 'Usability Testing & Validation',
  title: '25+ moderated sessions focused on in-aisle navigation behavior.',
  description:
    'I tested an interactive low-fidelity prototype in real-store contexts to evaluate routing, progress clarity, and confidence while users were moving.',
  images: [
    {
      src: aisldexTestingImage1,
      alt: 'Testing image showing an Aisledex in-store navigation prototype during moderated evaluation.',
      width: 123,
    },
    {
      src: aisldexTestingImage2,
      alt: 'Testing image showing a second Aisledex prototype state used during moderated sessions.',
      width: 123,
    },
    {
      src: aisldexTestingImage3,
      alt: 'Testing image showing a third Aisledex prototype state observed during validation.',
      width: 124,
    },
  ],
  observationsLabel: 'Observations',
  observations:
    'Users often tapped the screen for reassurance, pulling attention away from the route. The final flow advances automatically and adds optional audio cues to support navigation while in motion.',
} as const

const FINAL_DESIGN = {
  label: 'Final Design',
  title: 'A focused flow guides shoppers from item selection to the exact shelf',
  description: 'Designed to reduce time, decisions, and effort while navigating the store.',
  topRow: {
    phone: {
      imageUrl: aisldexFinalImage1,
      imageAlt: 'Final Aisledex product confirmation and route entry screen.',
    },
    features: [
      {
        iconUrl: aisldexConfirmIcon,
        iconAlt: 'Confirm icon',
        eyebrow: '1. Confirm',
        title: 'Item confirmation details',
        body: 'Helps users verify product before navigation.',
        width: 253,
        bodyWidth: 253,
        bodyAlign: 'center',
        eyebrowSize: 'large',
      },
      {
        iconUrl: aisldexLocateIcon,
        iconAlt: 'Locate item icon',
        eyebrow: '2. Locate item',
        title: 'Just one tap to locate item',
        body: 'Starts navigation without\nmanual progression.',
        width: 224,
        bodyWidth: 182,
        bodyAlign: 'left',
        eyebrowSize: 'large',
      },
    ],
  },
  bottomRow: {
    features: [
      {
        iconUrl: aisldexPathIcon,
        iconAlt: 'Path finding icon',
        eyebrow: '3. Path finding',
        title: 'Instant route visualization',
        body: 'Shows the shopper’s current position\nand the optimal path to the item.',
        width: 267,
        bodyWidth: 267,
        bodyAlign: 'left',
      },
      {
        iconUrl: aisldexLocateIcon,
        iconAlt: 'Route progress icon',
        eyebrow: '4. Route progress',
        title: 'Total distance update',
        body: 'Live route indicators with clear progress.',
        width: 287,
        bodyWidth: 287,
        bodyAlign: 'center',
      },
      {
        iconUrl: aisldexAudioIcon,
        iconAlt: 'Audio cues icon',
        eyebrow: '5. Audio cues',
        title: 'Voice assistance on the go',
        body: 'Provide distance and progress updates when users can’t look at the screen.',
        width: 339,
        bodyWidth: 339,
        bodyAlign: 'left',
      },
    ],
    phone: {
      imageUrl: aisldexFinalImage2,
      imageAlt: 'Final Aisledex route guidance screen with progress and audio support.',
    },
  },
} as const

const EXTRA_SCREENS = {
  title: (
    <>
      A seamless,
      <br />
      in-aisle navigation experience
      <br />
      from start to finish
    </>
  ),
  screens: [
    {
      imageUrl: aisldexScreenImage1,
      imageAlt: 'Aisledex deal and locate item screen.',
    },
    {
      imageUrl: aisldexScreenImage2,
      imageAlt: 'Aisledex browse by category screen.',
    },
    {
      imageUrl: aisldexScreenImage3,
      imageAlt: 'Aisledex route completion and shelf guidance screen.',
    },
  ],
} as const

const OUTCOME = {
  label: 'What Success Would Look Like',
  title:
    'Because Aisledex is still in development, these are the signals that would validate the experience in pilot testing and after launch.',
  items: [
    {
      iconUrl: aisldexClockIcon,
      iconAlt: 'Clock icon',
      text: (
        <>
          Less time spent searching
          <br />
          for items
        </>
      ),
    },
    {
      iconUrl: aisldexWalkIcon,
      iconAlt: 'Walking icon',
      text: (
        <>
          Higher confidence in
          <br />
          unfamiliar stores
        </>
      ),
    },
    {
      iconUrl: aisldexCartIcon,
      iconAlt: 'Cart icon',
      text: (
        <>
          Lower cognitive load
          <br />
          during shopping
        </>
      ),
    },
  ],
} as const

const EDGE_CASES = {
  label: 'Edge Cases & System Thinking',
  title: 'Designed to support real-world shopping beyond the ideal path',
  description:
    'Additional scenarios were considered to ensure navigation remained flexible, resilient, and useful during real shopping behavior.',
  items: [
    {
      iconUrl: aisldexPauseIcon,
      title: 'Pausing or stopping mid-route',
    },
    {
      iconUrl: aisldexDetourIcon,
      title: 'Deviating from suggested path',
    },
    {
      iconUrl: aisldexUnavailableIcon,
      title: 'Item unavailable or missed',
    },
  ],
} as const

const REFLECTION = {
  label: 'Reflection & Next Steps',
  title: 'Evolving Aisledex through real-world validation and expanded functionality',
  description: 'Future iterations would focus on the following',
  items: [
    {
      title: 'Expand system flexibility',
      body:
        'Support more complex scenarios such as multi-item optimization, substitutions, and real-time store changes',
    },
    {
      title: 'Explore adaptive and personalized routing',
      body:
        'Incorporate user behavior, shopping habits, or store familiarity to tailor navigation paths and reduce unnecessary steps.',
    },
    {
      title: 'Validate high-fidelity in real environments',
      body:
        'Testing was conducted using a low-fidelity prototype. Future work would involve validating high-fidelity designs in-store to assess visibility, timing, and interaction while in motion.',
    },
  ],
} as const

interface AisledexProjectDetailsProps {
  onOpenNextCase: () => void
}

function AisledexProjectDetails({ onOpenNextCase }: AisledexProjectDetailsProps) {
  return (
    <>
      <section className="case-redesign-content-section case-redesign-overview" aria-label="Overview section">
        <div className="case-redesign-overview-inner">
          <div className="case-redesign-overview-heading">
            <p className="case-redesign-overview-label">{OVERVIEW.label}</p>
            <h2 className="case-redesign-overview-title">{OVERVIEW.title}</h2>
          </div>

          <div className="case-redesign-overview-body">
            {OVERVIEW.paragraphs.map((paragraph) => (
              <p key={paragraph} className="case-redesign-overview-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        className="case-redesign-content-section case-redesign-problem case-redesign-problem-image"
        aria-label="Problem section"
      >
        <div className="case-redesign-problem-inner">
          <p className="case-redesign-problem-label">{PROBLEM.label}</p>
          <figure className="case-redesign-problem-figure">
            <img
              src={PROBLEM.imageUrl}
              alt={PROBLEM.imageAlt}
              className="case-redesign-problem-image-asset"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section className="case-redesign-content-section case-redesign-solving" aria-label="Solving section">
        <div className="case-redesign-solving-inner">
          <div className="case-redesign-solving-heading">
            <p className="case-redesign-solving-label">{SOLVING.label}</p>
            <h2 className="case-redesign-solving-title">{SOLVING.title}</h2>
            <p className="case-redesign-solving-description">{SOLVING.description}</p>
          </div>

          <div className="case-redesign-solving-stage">
            <p className="case-redesign-solving-callout case-redesign-solving-callout-left">
              {SOLVING.leftCallout}
            </p>

            <div className="case-redesign-solving-video-wrap">
              <AutoplayVideo
                src={SOLVING.videoUrl}
                className="case-redesign-solving-video"
                preload="auto"
                aria-label="Aisledex route guidance prototype preview"
              />
            </div>

            <p className="case-redesign-solving-callout case-redesign-solving-callout-right">
              {SOLVING.rightCallout}
            </p>
          </div>

          <a className="case-redesign-solving-button" href={SOLVING.prototypeUrl} target="_blank" rel="noreferrer">
            {SOLVING.prototypeLabel}
          </a>
        </div>
      </section>

      <section
        className="case-redesign-content-section case-redesign-competitor-analysis"
        aria-label="Competitor analysis section"
      >
        <div className="case-redesign-competitor-analysis-inner">
          <div className="case-redesign-competitor-analysis-heading">
            <p className="case-redesign-competitor-analysis-label">{COMPETITOR_ANALYSIS.label}</p>
            <h2 className="case-redesign-competitor-analysis-title">{COMPETITOR_ANALYSIS.title}</h2>
            <p className="case-redesign-competitor-analysis-description">{COMPETITOR_ANALYSIS.description}</p>
          </div>

          <div className="case-redesign-competitor-analysis-stage">
            {COMPETITOR_ANALYSIS.items.map((item) => (
              <article key={item.title} className="case-redesign-competitor-analysis-item">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  className="case-redesign-competitor-analysis-image"
                  loading="lazy"
                />

                <div className="case-redesign-competitor-analysis-copy">
                  <h3 className="case-redesign-competitor-analysis-item-title">{item.title}</h3>
                  <p className="case-redesign-competitor-analysis-item-description">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-redesign-content-section case-redesign-user-research" aria-label="User research section">
        <div className="case-redesign-user-research-inner">
          <div className="case-redesign-user-research-heading">
            <p className="case-redesign-user-research-label">{USER_RESEARCH.label}</p>
            <h2 className="case-redesign-user-research-title">{USER_RESEARCH.title}</h2>
            <p className="case-redesign-user-research-description">{USER_RESEARCH.description}</p>
          </div>

          <div className="case-redesign-user-research-media-stage">
            <div className="case-redesign-user-research-media-row">
              {USER_RESEARCH.media.map((item) => (
                <figure
                  key={item.alt}
                  className="case-redesign-user-research-media-card"
                  style={withCssVars({ '--user-research-media-width': `${item.width}px` })}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="case-redesign-user-research-media-image"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </div>

          <div className="case-redesign-user-research-stats">
            <div className="case-redesign-user-research-stats-left">
              {USER_RESEARCH.leftColumn.map((item) => (
                <article
                  key={item.value}
                  className={`case-redesign-user-research-stat-card is-${item.tone}`}
                  style={withCssVars({ '--user-research-card-height': `${item.height}px` })}
                >
                  <p className="case-redesign-user-research-stat-value">
                    <span className="case-redesign-user-research-stat-number">{item.value}</span>
                    <span className="case-redesign-user-research-stat-percent">%</span>
                  </p>
                  <p className="case-redesign-user-research-stat-copy">{item.description}</p>
                </article>
              ))}
            </div>

            <div className="case-redesign-user-research-stats-right">
              <div className="case-redesign-user-research-stats-top-row">
                <article
                  className="case-redesign-user-research-quote-card"
                  style={withCssVars({
                    '--user-research-card-height': `${USER_RESEARCH.quoteCard.height}px`,
                    '--user-research-quote-width': `${USER_RESEARCH.quoteCard.width}px`,
                  })}
                >
                  <p className="case-redesign-user-research-quote-copy">
                    {USER_RESEARCH.quoteCard.text} <span>{USER_RESEARCH.quoteCard.highlight}</span>
                  </p>
                </article>

                <article
                  className={`case-redesign-user-research-stat-card is-${USER_RESEARCH.rightTopStat.tone}`}
                  style={withCssVars({
                    '--user-research-card-height': `${USER_RESEARCH.rightTopStat.height}px`,
                  })}
                >
                  <p className="case-redesign-user-research-stat-value">
                    <span className="case-redesign-user-research-stat-number">
                      {USER_RESEARCH.rightTopStat.value}
                    </span>
                    <span className="case-redesign-user-research-stat-percent">%</span>
                  </p>
                  <p className="case-redesign-user-research-stat-copy">
                    {USER_RESEARCH.rightTopStat.description}
                  </p>
                </article>
              </div>

              <div className="case-redesign-user-research-stats-bottom-row">
                {USER_RESEARCH.bottomStats.map((item) => (
                  <article
                    key={item.value}
                    className={`case-redesign-user-research-stat-card is-${item.tone}`}
                    style={withCssVars({ '--user-research-card-height': `${item.height}px` })}
                  >
                    <p className="case-redesign-user-research-stat-value">
                      <span className="case-redesign-user-research-stat-number">{item.value}</span>
                      <span className="case-redesign-user-research-stat-percent">%</span>
                    </p>
                    <p className="case-redesign-user-research-stat-copy">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="case-redesign-content-section case-redesign-principles is-icon-row"
        aria-label="Design principles section"
      >
        <div className="case-redesign-principles-inner">
          <div className="case-redesign-principles-heading">
            <p className="case-redesign-principles-label">{PRINCIPLES.label}</p>
            <h2 className="case-redesign-principles-title">{PRINCIPLES.title}</h2>
            <p className="case-redesign-principles-description">{PRINCIPLES.description}</p>
          </div>

          <div className="case-redesign-principles-icon-grid">
            {PRINCIPLES.items.map((principle) => (
              <article key={principle.label} className="case-redesign-principles-icon-item">
                <img
                  src={principle.iconUrl}
                  alt={principle.iconAlt}
                  className="case-redesign-principles-icon"
                  loading="lazy"
                />

                <div className="case-redesign-principles-icon-copy">
                  <p className="case-redesign-principles-icon-label">{principle.label}</p>
                  <h3 className="case-redesign-principles-icon-title">{principle.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-redesign-content-section case-redesign-lofi" aria-label="Low fidelity section">
        <div className="case-redesign-lofi-inner">
          <div className="case-redesign-lofi-heading">
            <p className="case-redesign-lofi-label">{LOFI.label}</p>
            <h2 className="case-redesign-lofi-title">{LOFI.title}</h2>
            <p className="case-redesign-lofi-description">{LOFI.description}</p>
          </div>

          <div className="case-redesign-lofi-steps">
            <section className="case-redesign-lofi-step case-redesign-lofi-step-route">
              <div className="case-redesign-lofi-step-heading">
                <div
                  className="case-redesign-lofi-step-copy"
                  style={withCssVars({ '--aisldex-lofi-copy-width': `${LOFI.routeDecision.copyWidth}px` })}
                >
                  <h3 className="case-redesign-lofi-step-title">{LOFI.routeDecision.title}</h3>
                  <p className="case-redesign-lofi-step-description">{LOFI.routeDecision.description}</p>
                </div>
              </div>

              <div className="case-redesign-lofi-route-content">
                <div className="case-redesign-lofi-block case-redesign-lofi-block-explored">
                  <p className="case-redesign-lofi-block-label">{LOFI.routeDecision.exploredLabel}</p>

                  <div className="case-redesign-lofi-media-row">
                    {LOFI.routeDecision.exploredItems.map((item) => (
                      <figure key={item.title} className="case-redesign-lofi-media-card">
                        <img
                          src={item.imageUrl}
                          alt={item.imageAlt}
                          className="case-redesign-lofi-media-image"
                          loading="lazy"
                        />
                        <figcaption className="case-redesign-lofi-media-title">{item.title}</figcaption>
                      </figure>
                    ))}
                  </div>

                  <p className="case-redesign-lofi-group-caption is-accent">
                    {LOFI.routeDecision.exploredCaption}
                  </p>
                </div>

                <div className="case-redesign-lofi-block case-redesign-lofi-block-chosen">
                  <p className="case-redesign-lofi-block-label">{LOFI.routeDecision.chosenLabel}</p>

                  <figure className="case-redesign-lofi-media-card case-redesign-lofi-media-card-single">
                    <img
                      src={LOFI.routeDecision.chosenItem.imageUrl}
                      alt={LOFI.routeDecision.chosenItem.imageAlt}
                      className="case-redesign-lofi-media-image"
                      loading="lazy"
                    />
                    <figcaption className="case-redesign-lofi-media-title">
                      {LOFI.routeDecision.chosenItem.title}
                    </figcaption>
                  </figure>

                  <p className="case-redesign-lofi-group-caption">{LOFI.routeDecision.chosenCaption}</p>
                </div>
              </div>
            </section>

            <section className="case-redesign-lofi-step case-redesign-lofi-step-progress">
              <div className="case-redesign-lofi-step-heading is-right">
                <div
                  className="case-redesign-lofi-step-copy"
                  style={withCssVars({ '--aisldex-lofi-copy-width': `${LOFI.progressDecision.copyWidth}px` })}
                >
                  <h3 className="case-redesign-lofi-step-title">{LOFI.progressDecision.title}</h3>
                  <p className="case-redesign-lofi-step-description">{LOFI.progressDecision.description}</p>
                </div>
              </div>

              <div className="case-redesign-lofi-block case-redesign-lofi-block-progress">
                <div className="case-redesign-lofi-media-row">
                  {LOFI.progressDecision.items.map((item) => (
                    <figure key={item.title} className="case-redesign-lofi-media-card">
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        className="case-redesign-lofi-media-image"
                        loading="lazy"
                      />
                      <figcaption
                        className={`case-redesign-lofi-media-title is-progress${
                          item.tone === 'accent' ? ' is-accent' : ''
                        }`.trim()}
                      >
                        {item.title}
                      </figcaption>
                    </figure>
                  ))}
                </div>

                <p className="case-redesign-lofi-group-caption">{LOFI.progressDecision.caption}</p>
              </div>
            </section>

            <section className="case-redesign-lofi-step case-redesign-lofi-step-one-hand">
              <div className="case-redesign-lofi-step-heading">
                <div
                  className="case-redesign-lofi-step-copy"
                  style={withCssVars({ '--aisldex-lofi-copy-width': `${LOFI.oneHandDecision.copyWidth}px` })}
                >
                  <h3 className="case-redesign-lofi-step-title">{LOFI.oneHandDecision.title}</h3>
                  <p className="case-redesign-lofi-step-description">{LOFI.oneHandDecision.description}</p>
                </div>
              </div>

              <div className="case-redesign-lofi-block case-redesign-lofi-block-one-hand">
                <figure className="case-redesign-lofi-media-card case-redesign-lofi-media-card-single">
                  <img
                    src={LOFI.oneHandDecision.item.imageUrl}
                    alt={LOFI.oneHandDecision.item.imageAlt}
                    className="case-redesign-lofi-media-image"
                    loading="lazy"
                  />
                  <figcaption className="case-redesign-lofi-media-title">
                    {LOFI.oneHandDecision.item.title}
                  </figcaption>
                </figure>

                <p className="case-redesign-lofi-group-caption">{LOFI.oneHandDecision.caption}</p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="case-redesign-content-section case-redesign-testing" aria-label="Usability testing section">
        <div className="case-redesign-testing-inner">
          <div className="case-redesign-testing-heading">
            <p className="case-redesign-testing-label">{TESTING.label}</p>
            <h2 className="case-redesign-testing-title">{TESTING.title}</h2>
            <p className="case-redesign-testing-description">{TESTING.description}</p>
          </div>

          <div className="case-redesign-testing-image-row">
            {TESTING.images.map((image, index) => (
              <figure
                key={`${image.alt}-${String(index + 1)}`}
                className="case-redesign-testing-image-card"
                style={withCssVars({ '--aisldex-testing-width': `${image.width}px` })}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="case-redesign-testing-image"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>

          <div className="case-redesign-testing-footer">
            <p className="case-redesign-testing-footer-label">{TESTING.observationsLabel}</p>
            <p className="case-redesign-testing-footer-text">{TESTING.observations}</p>
          </div>
        </div>
      </section>

      <section className="case-redesign-content-section case-redesign-aisldex-final-design" aria-label="Final design section">
        <div className="case-redesign-aisldex-final-design-inner">
          <div className="case-redesign-aisldex-final-design-heading">
            <p className="case-redesign-aisldex-final-design-label">{FINAL_DESIGN.label}</p>
            <h2 className="case-redesign-aisldex-final-design-title">{FINAL_DESIGN.title}</h2>
            <p className="case-redesign-aisldex-final-design-description">{FINAL_DESIGN.description}</p>
          </div>

          <div className="case-redesign-aisldex-final-design-row case-redesign-aisldex-final-design-row-top">
            <figure className="case-redesign-aisldex-final-design-phone">
              <img
                src={FINAL_DESIGN.topRow.phone.imageUrl}
                alt={FINAL_DESIGN.topRow.phone.imageAlt}
                className="case-redesign-aisldex-final-design-phone-image"
                loading="lazy"
              />
            </figure>

            <div className="case-redesign-aisldex-final-design-feature-column is-top">
              {FINAL_DESIGN.topRow.features.map((feature) => (
                <article
                  key={feature.eyebrow}
                  className="case-redesign-aisldex-final-design-feature"
                  style={withCssVars({
                    '--aisldex-hifi-feature-width': `${feature.width}px`,
                    '--aisldex-hifi-feature-body-width': `${feature.bodyWidth}px`,
                  })}
                >
                  <img
                    src={feature.iconUrl}
                    alt={feature.iconAlt}
                    className="case-redesign-aisldex-final-design-feature-icon"
                    loading="lazy"
                  />
                  <div className="case-redesign-aisldex-final-design-feature-copy">
                    <p
                      className={`case-redesign-aisldex-final-design-feature-eyebrow${
                        feature.eyebrowSize === 'large' ? ' is-large' : ''
                      }`.trim()}
                    >
                      {feature.eyebrow}
                    </p>
                    <h3 className="case-redesign-aisldex-final-design-feature-title">{feature.title}</h3>
                    <p
                      className={`case-redesign-aisldex-final-design-feature-body is-${feature.bodyAlign}`.trim()}
                    >
                      {feature.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="case-redesign-aisldex-final-design-row case-redesign-aisldex-final-design-row-bottom">
            <div className="case-redesign-aisldex-final-design-feature-column is-bottom">
              {FINAL_DESIGN.bottomRow.features.map((feature) => (
                <article
                  key={feature.eyebrow}
                  className="case-redesign-aisldex-final-design-feature"
                  style={withCssVars({
                    '--aisldex-hifi-feature-width': `${feature.width}px`,
                    '--aisldex-hifi-feature-body-width': `${feature.bodyWidth}px`,
                  })}
                >
                  <img
                    src={feature.iconUrl}
                    alt={feature.iconAlt}
                    className="case-redesign-aisldex-final-design-feature-icon"
                    loading="lazy"
                  />
                  <div className="case-redesign-aisldex-final-design-feature-copy">
                    <p className="case-redesign-aisldex-final-design-feature-eyebrow">{feature.eyebrow}</p>
                    <h3 className="case-redesign-aisldex-final-design-feature-title">{feature.title}</h3>
                    <p
                      className={`case-redesign-aisldex-final-design-feature-body is-${feature.bodyAlign}`.trim()}
                    >
                      {feature.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <figure className="case-redesign-aisldex-final-design-phone">
              <img
                src={FINAL_DESIGN.bottomRow.phone.imageUrl}
                alt={FINAL_DESIGN.bottomRow.phone.imageAlt}
                className="case-redesign-aisldex-final-design-phone-image"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>

      <section
        className="case-redesign-content-section case-redesign-extra-screens"
        aria-label="Additional product screens section"
      >
        <div className="case-redesign-extra-screens-inner">
          <h2 className="case-redesign-extra-screens-title">{EXTRA_SCREENS.title}</h2>

          <div className="case-redesign-extra-screens-row">
            {EXTRA_SCREENS.screens.map((screen, index) => (
              <figure key={`${screen.imageAlt}-${String(index + 1)}`} className="case-redesign-extra-screens-card">
                <img
                  src={screen.imageUrl}
                  alt={screen.imageAlt}
                  className="case-redesign-extra-screens-image"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="case-redesign-content-section case-redesign-outcome" aria-label="Outcome section">
        <div className="case-redesign-outcome-inner">
          <div className="case-redesign-outcome-header">
            <p className="case-redesign-outcome-label">{OUTCOME.label}</p>
            <h2 className="case-redesign-outcome-title">{OUTCOME.title}</h2>
          </div>

          <div className="case-redesign-outcome-panel">
            <div className="case-redesign-outcome-grid">
              {OUTCOME.items.map((item, index) => (
                <article key={`${item.iconAlt}-${String(index + 1)}`} className="case-redesign-outcome-item">
                  <img
                    src={item.iconUrl}
                    alt={item.iconAlt}
                    className="case-redesign-outcome-icon"
                    loading="lazy"
                  />
                  <p className="case-redesign-outcome-item-text">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="case-redesign-content-section case-redesign-edge-cases is-systems"
        aria-label="Edge cases and system thinking section"
      >
        <div className="case-redesign-edge-cases-systems-inner">
          <div className="case-redesign-edge-cases-header case-redesign-edge-cases-systems-header">
            <p className="case-redesign-edge-cases-label">{EDGE_CASES.label}</p>
            <h2 className="case-redesign-edge-cases-title">{EDGE_CASES.title}</h2>
            <p className="case-redesign-edge-cases-description">{EDGE_CASES.description}</p>
          </div>

          <div className="case-redesign-edge-cases-systems-panel">
            <div className="case-redesign-edge-cases-systems-grid">
              {EDGE_CASES.items.map((item) => (
                <article key={item.title} className="case-redesign-edge-cases-system-item">
                  <img
                    src={item.iconUrl}
                    alt=""
                    className="case-redesign-edge-cases-system-icon"
                    loading="lazy"
                    aria-hidden="true"
                  />
                  <h3 className="case-redesign-edge-cases-system-title">{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="case-redesign-content-section case-redesign-reflection is-next-steps"
        aria-label="Reflection section"
      >
        <div className="case-redesign-reflection-next-steps-inner">
          <div className="case-redesign-reflection-header">
            <p className="case-redesign-reflection-label">{REFLECTION.label}</p>
            <h2 className="case-redesign-reflection-title">{REFLECTION.title}</h2>
            <p className="case-redesign-reflection-description">{REFLECTION.description}</p>
          </div>

          <div className="case-redesign-reflection-next-steps-grid">
            {REFLECTION.items.map((item) => (
              <article key={item.title} className="case-redesign-reflection-next-steps-item">
                <h3 className="case-redesign-reflection-next-steps-title">{item.title}</h3>
                <p className="case-redesign-reflection-next-steps-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-redesign-content-section case-redesign-thank-you" aria-label="Thank you section">
        <div className="case-redesign-thank-you-stack">
          <div className="case-redesign-thank-you-inner">
            <p className="case-redesign-thank-you-title">Thank you!</p>
            <img src={introLogo} alt="" className="case-redesign-thank-you-logo" aria-hidden="true" />
          </div>
          <button type="button" className="case-redesign-next-case-button" onClick={onOpenNextCase}>
            View next case
          </button>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AisledexProjectDetails
