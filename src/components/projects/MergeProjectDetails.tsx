import AutoplayVideo from '../AutoplayVideo'
import Footer from '../Footer'
import introLogo from '../../assets/man-logo.svg'
import mergeResearchCard from '../../assets/merge/Research.png'
import mergeSlide1Image from '../../assets/merge/slide1.png'
import mergeSlide2Image from '../../assets/merge/slide2.png'
import mergeSlide3Image from '../../assets/merge/slide3.png'
import mergeSlide4Image from '../../assets/merge/slide4.png'
import mergeReviewingImage from '../../assets/merge/reviewing.png'
import mergeSendingImage from '../../assets/merge/sending.png'
import mergeHifi1Video from '../../assets/merge/hifi1.mp4'
import mergeHifi2Video from '../../assets/merge/hifi2.mp4'
import mergeHifi3Video from '../../assets/merge/hifi3.mp4'
import mergeSolutionVideo from '../../assets/merge/solution.mp4'
import mergeInstagramIcon from '../../assets/merge/instagram.svg'
import mergeTiktokIcon from '../../assets/merge/tiktok.svg'
import mergeSnapchatIcon from '../../assets/merge/snapchat.svg'
import mergeFigmaIcon from '../../assets/merge/figma.svg'
import mergeLightroomIcon from '../../assets/merge/lightroom.png'
import mergeLofi1Image from '../../assets/merge/lofi1.png'
import mergeLofi2Image from '../../assets/merge/lofi2.png'
import mergeLofi3Image from '../../assets/merge/lofi3.png'

const PROBLEM = {
  label: 'The Problem',
  title: 'Most creative platforms are built for publishing, not co-creation',
  description:
    'Creative work is collaborative, but social platforms treat it like a finished artifact. When creators want to build on someone else’s work, they usually leave the app, download the asset, edit elsewhere, and repost manually. Merge removes that break by making contribution, review, and shared authorship happen inside the product.',
} as const

const RESEARCH = {
  label: 'Research',
  title: 'Collaboration is possible today but it is slow, fragmented, and hard to control',
  description: 'Conversations with creatives surfaced friction in both participation and ownership.',
  imageUrl: mergeResearchCard,
  imageAlt: 'Research quotes from creatives about manual contribution workflows and ownership control.',
} as const

const PROTOTYPE_URL =
  'https://www.figma.com/proto/IzFeQVLWgthUSvK41Ri77W/Merge?node-id=434-3541&viewport=-1095%2C828%2C0.09&t=NgnAAwm810SQEGXk-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=434%3A3541&page-id=0%3A1&show-proto-sidebar=1'

const OPPORTUNITY = {
  label: 'Opportunity',
  title: 'Creative version control meets social discovery',
  description: 'The gap was not a missing feature. It was a missing model.',
  columns: [
    {
      title: 'Social platforms',
      description:
        'Social apps make discovery frictionless, but collaboration is informal and hard to trace.',
      icons: [
        { src: mergeInstagramIcon, alt: 'Instagram' },
        { src: mergeTiktokIcon, alt: 'TikTok' },
        { src: mergeSnapchatIcon, alt: 'Snapchat' },
      ],
    },
    {
      title: 'Creative tooling',
      description:
        'Collaboration tools support branching, review, and version history, but they are not designed for creator-friendly participation at social scale.',
      icons: [
        { src: mergeFigmaIcon, alt: 'Figma' },
        { src: mergeLightroomIcon, alt: 'Lightroom' },
      ],
    },
  ],
} as const

const SOLUTION = {
  label: 'Merge',
  title:
    'Merge sits between those worlds by letting creatives contribute, review, and merge work directly inside the product.',
  description: 'Collaboration no longer depends on disconnected, off-platform workflows.',
  videoUrl: mergeSolutionVideo,
  prototypeUrl: PROTOTYPE_URL,
  leftCallout: (
    <>
      Request Merge Post
      <br />
      <span>in a creative social space</span>
    </>
  ),
  rightCallout: (
    <>
      Ownership Contribution
      <br />
      <span>system built on trust</span>
    </>
  ),
} as const

const CORE_EXPERIENCE = {
  label: 'Core experience',
  title: 'A piece does not end at publishing, it can evolve',
  description: 'Merge turns viewers into contributors through one native in-app flow.',
  items: [
    {
      title: 'Sending Merge Request',
      imageUrl: mergeSendingImage,
      imageAlt: 'Flow diagram showing how a creator sends a merge request.',
    },
    {
      title: 'Reviewing Merge Request',
      imageUrl: mergeReviewingImage,
      imageAlt: 'Flow diagram showing how a creator reviews a merge request.',
    },
  ],
  body:
    'A creator publishes a piece and chooses whether it is open to outside contribution. If it is, another creative contributes in-app, submits a merge request in context, explains what changed, and defines credit. The original creator reviews and accepts or declines; accepted requests become a new version with visible attribution.',
} as const

const FINAL_DESIGN = {
  label: 'Final design',
  title: 'The interface reveals the process of creation',
  description: 'Every key screen was designed to make collaboration visible, legible, and easy to join.',
  videos: [
    {
      title: 'Collaborative feed',
      description: 'The feed shows openness, versioning, and participation at a glance.',
      videoUrl: mergeHifi1Video,
    },
    {
      title: 'Participation-ready detail',
      description: 'The detail view combines the work, contributors, status, and next action in one place.',
      videoUrl: mergeHifi2Video,
    },
    {
      title: 'Visible evolution',
      description: "Composer, review, and timeline make a piece's evolution easy to follow.",
      videoUrl: mergeHifi3Video,
    },
  ],
  supportingScreens: {
    eyebrow: 'Beyond the core flow',
    title: 'Supporting screens keep collaboration cues consistent across the product.',
    slides: [
      { imageUrl: mergeSlide1Image, alt: 'Merge supporting screen preview one.' },
      { imageUrl: mergeSlide2Image, alt: 'Merge supporting screen preview two.' },
      { imageUrl: mergeSlide3Image, alt: 'Merge supporting screen preview three.' },
      { imageUrl: mergeSlide4Image, alt: 'Merge supporting screen preview four.' },
    ],
  },
} as const

const DESIGN_DECISIONS = {
  label: 'Designs decisions',
  title: 'Make contribution visible, structured, and trustworthy',
  description: 'The product works because participation is not left to vague social behavior.',
  visibility: {
    title: 'Visibility',
    description: 'Make contribution visible so the final output does not hide the process.',
    imageUrl: mergeLofi1Image,
    imageAlt: 'Low-fidelity screen showing visible contribution history.',
    caption: 'Every creative gets credit with transparency and trust',
  },
  permissions: {
    title: 'Controlled permissions',
    description: 'Make merge requests the primary interaction, so collaboration is reviewable.',
    items: [
      {
        imageUrl: mergeLofi2Image,
        imageAlt: 'Low-fidelity screen showing work permission settings.',
        caption: 'Setting permissions of a work to Open, Request or closed',
      },
      {
        imageUrl: mergeLofi3Image,
        imageAlt: 'Low-fidelity screen showing merge request review actions.',
        caption: 'Accepting, decline, or respond to a request',
      },
    ],
  },
} as const

const TRUST = {
  label: 'Trust',
  title: 'The hardest problem was ownership',
  description: 'Collaboration only works when contribution feels safe.',
  body:
    'Users needed clarity on permissions, authorship, conflicts, and rejected contributions. Clear permissions, visible contributors, version history, review states, and explicit credit became core trust-building mechanisms.',
} as const

const OUTCOME = {
  label: 'Outcome',
  title: 'Early signal shows demand for in-app co-creation with ownership controls',
  description:
    'Merge is still in development, so impact is tracked through a beta scorecard, not live growth metrics.',
  items: [
    {
      title: 'End-to-end flow instrumented',
      description:
        'Beta metric: merge-request completion from intent to submission, including step-level drop-off.',
    },
    {
      title: 'Feedback confidence measured',
      description:
        'Beta metric: contributor confidence after tasks involving permissions, authorship, and credit.',
    },
    {
      title: 'Handoff readiness tracked',
      description: 'Beta metric: median turnaround from request submission to final decision.',
    },
  ],
} as const

const TESTING = {
  label: 'Testing',
  title: 'Usability testing surfaced two capabilities needed for deeper creative work',
  description:
    'Testers validated the core merge flow, then asked for recording and cross-device continuity.',
  items: [
    {
      title: 'Native audio capture in merge flow',
      body: 'Creators wanted to record audio directly in Merge, not rely only on imported samples.',
      implicationLabel: 'Design implication:',
      implication:
        'add in-app recording with take management so audio-first workflows stay native.',
    },
    {
      title: 'Continue on iPad for precision work',
      body: 'Creators asked for a "Continue on iPad" handoff to move from phone to a larger stylus-friendly canvas.',
      implicationLabel: 'Design implication:',
      implication:
        'add cross-device session continuity with state-preserving handoff across screen sizes.',
    },
  ],
} as const

const REFLECTION = {
  label: 'Reflection',
  title: 'Building Merge taught me that collaboration UX is a systems problem',
  description:
    'The biggest lesson: participation breaks down when ownership and permissions are unclear.',
  items: [
    {
      title: 'Trust precedes participation',
      body: 'Creators engage more when permissions, credit, and decision history are explicit.',
    },
    {
      title: 'Collaboration is state-driven',
      body: 'Clear request, review, and merge states turned a vague social action into a reliable workflow.',
    },
    {
      title: 'Design-dev pairing de-risked the concept',
      body: 'Designing alongside implementation constraints produced a stronger, ship-ready system.',
    },
  ],
} as const

function MergeProjectDetails() {
  return (
    <>
      <section className="case-redesign-content-section case-redesign-problem case-redesign-problem-merge" aria-label="Problem section">
        <div className="case-redesign-problem-inner">
          <p className="case-redesign-problem-label">{PROBLEM.label}</p>
          <h2 className="case-redesign-problem-title">{PROBLEM.title}</h2>
          <p className="case-redesign-problem-description">{PROBLEM.description}</p>
        </div>
      </section>

      <section className="case-redesign-content-section merge-research-section" aria-label="Research section">
        <div className="merge-research-inner">
          <div className="merge-research-heading">
            <p className="merge-research-label">{RESEARCH.label}</p>
            <h2 className="merge-research-title">{RESEARCH.title}</h2>
            <p className="merge-research-description">{RESEARCH.description}</p>
          </div>
          <figure className="merge-research-card-wrap">
            <img
              src={RESEARCH.imageUrl}
              alt={RESEARCH.imageAlt}
              className="merge-research-card-image"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section className="case-redesign-content-section merge-opportunity-section" aria-label="Opportunity section">
        <div className="merge-opportunity-inner">
          <div className="merge-opportunity-heading">
            <p className="merge-opportunity-label">{OPPORTUNITY.label}</p>
            <h2 className="merge-opportunity-title">{OPPORTUNITY.title}</h2>
            <p className="merge-opportunity-description">{OPPORTUNITY.description}</p>
          </div>

          <div className="merge-opportunity-grid">
            {OPPORTUNITY.columns.map((column) => (
              <article key={column.title} className="merge-opportunity-card">
                <div className="merge-opportunity-card-copy">
                  <h3 className="merge-opportunity-card-title">{column.title}</h3>
                  <p className="merge-opportunity-card-description">{column.description}</p>
                </div>

                <div className="merge-opportunity-icons" aria-label={`${column.title} examples`}>
                  {column.icons.map((icon) => (
                    <img
                      key={icon.alt}
                      src={icon.src}
                      alt={icon.alt}
                      className="merge-opportunity-icon"
                      loading="lazy"
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-redesign-content-section merge-solution-section" aria-label="Merge solution section">
        <div className="merge-solution-inner">
          <div className="merge-solution-heading">
            <p className="merge-solution-label">{SOLUTION.label}</p>
            <h2 className="merge-solution-title">{SOLUTION.title}</h2>
            <p className="merge-solution-description">{SOLUTION.description}</p>
          </div>

          <div className="merge-solution-media-stage">
            <AutoplayVideo
              src={SOLUTION.videoUrl}
              className="merge-solution-video"
              preload="auto"
              aria-label="Merge solution preview"
            />

            <div className="merge-solution-footer-texts">
              <p className="merge-solution-callout merge-solution-callout-left">{SOLUTION.leftCallout}</p>
              <p className="merge-solution-callout merge-solution-callout-right">{SOLUTION.rightCallout}</p>
            </div>
          </div>

          <a className="merge-solution-prototype-button" href={SOLUTION.prototypeUrl} target="_blank" rel="noreferrer">
            Try prototype here
          </a>
        </div>
      </section>

      <section className="case-redesign-content-section merge-core-section" aria-label="Core experience section">
        <div className="merge-core-inner">
          <div className="merge-core-heading">
            <p className="merge-core-label">{CORE_EXPERIENCE.label}</p>
            <div className="merge-core-heading-copy">
              <h2 className="merge-core-title">{CORE_EXPERIENCE.title}</h2>
              <p className="merge-core-description">{CORE_EXPERIENCE.description}</p>
            </div>
          </div>

          <div className="merge-core-image-panel">
            {CORE_EXPERIENCE.items.map((item) => (
              <figure key={item.title} className="merge-core-figure">
                <img src={item.imageUrl} alt={item.imageAlt} className="merge-core-image" loading="lazy" />
                <figcaption className="merge-core-caption">{item.title}</figcaption>
              </figure>
            ))}
          </div>

          <p className="merge-core-body">{CORE_EXPERIENCE.body}</p>
        </div>
      </section>

      <section className="case-redesign-content-section merge-final-section" aria-label="Final design section">
        <div className="merge-final-inner">
          <div className="merge-final-heading">
            <p className="merge-final-label">{FINAL_DESIGN.label}</p>
            <div className="merge-final-heading-copy">
              <h2 className="merge-final-title">{FINAL_DESIGN.title}</h2>
              <p className="merge-final-description">{FINAL_DESIGN.description}</p>
            </div>
          </div>

          <div className="merge-final-grid">
            {FINAL_DESIGN.videos.slice(0, 2).map((item) => (
              <article key={item.title} className="merge-final-item">
                <div className="merge-final-video-container">
                  <AutoplayVideo
                    src={item.videoUrl}
                    className="merge-final-video"
                    preload="auto"
                    aria-label={item.title}
                  />
                </div>
                <div className="merge-final-item-copy">
                  <h3 className="merge-final-item-title">{item.title}</h3>
                  <p className="merge-final-item-description">{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          {FINAL_DESIGN.videos[2] ? (
            <div className="merge-final-centered-row">
              <article className="merge-final-item">
                <div className="merge-final-video-container">
                  <AutoplayVideo
                    src={FINAL_DESIGN.videos[2].videoUrl}
                    className="merge-final-video"
                    preload="auto"
                    aria-label={FINAL_DESIGN.videos[2].title}
                  />
                </div>
                <div className="merge-final-item-copy">
                  <h3 className="merge-final-item-title">{FINAL_DESIGN.videos[2].title}</h3>
                  <p className="merge-final-item-description">{FINAL_DESIGN.videos[2].description}</p>
                </div>
              </article>
            </div>
          ) : null}

          <section className="merge-final-slides-section" aria-label="Supporting screens">
            <div className="merge-final-slides-copy">
              <p className="merge-final-slides-eyebrow">{FINAL_DESIGN.supportingScreens.eyebrow}</p>
              <h3 className="merge-final-slides-title">{FINAL_DESIGN.supportingScreens.title}</h3>
            </div>

            <div className="merge-final-slides-marquee">
              <div className="merge-final-slides-rail">
                {[0, 1].map((groupIndex) => (
                  <div
                    key={groupIndex}
                    className="merge-final-slides-track"
                    aria-hidden={groupIndex === 1 ? 'true' : undefined}
                  >
                    {FINAL_DESIGN.supportingScreens.slides.map((slide, slideIndex) => (
                      <figure key={`${groupIndex}-${String(slideIndex)}`} className="merge-final-slide-item">
                        <img
                          src={slide.imageUrl}
                          alt={groupIndex === 0 ? slide.alt : ''}
                          className="merge-final-slide-image"
                          loading="lazy"
                        />
                      </figure>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="case-redesign-content-section merge-decisions-section" aria-label="Design decisions section">
        <div className="merge-decisions-inner">
          <div className="merge-decisions-heading">
            <p className="merge-decisions-label">{DESIGN_DECISIONS.label}</p>
            <div className="merge-decisions-heading-copy">
              <h2 className="merge-decisions-title">{DESIGN_DECISIONS.title}</h2>
              <p className="merge-decisions-description">{DESIGN_DECISIONS.description}</p>
            </div>
          </div>

          <div className="merge-decisions-body">
            <article className="merge-decisions-visibility">
              <div className="merge-decisions-copy-block">
                <h3 className="merge-decisions-block-title">{DESIGN_DECISIONS.visibility.title}</h3>
                <p className="merge-decisions-block-description">{DESIGN_DECISIONS.visibility.description}</p>
              </div>

              <figure className="merge-decisions-primary-figure">
                <img
                  src={DESIGN_DECISIONS.visibility.imageUrl}
                  alt={DESIGN_DECISIONS.visibility.imageAlt}
                  className="merge-decisions-primary-image"
                  loading="lazy"
                />
                <figcaption className="merge-decisions-caption">{DESIGN_DECISIONS.visibility.caption}</figcaption>
              </figure>
            </article>

            <article className="merge-decisions-permissions">
              <div className="merge-decisions-permissions-copy">
                <h3 className="merge-decisions-block-title">{DESIGN_DECISIONS.permissions.title}</h3>
                <p className="merge-decisions-block-description">{DESIGN_DECISIONS.permissions.description}</p>
              </div>

              <div className="merge-decisions-comparison">
                {DESIGN_DECISIONS.permissions.items.map((item) => (
                  <figure key={item.caption} className="merge-decisions-comparison-card">
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      className="merge-decisions-comparison-image"
                      loading="lazy"
                    />
                    <figcaption className="merge-decisions-caption">{item.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="case-redesign-content-section merge-trust-section" aria-label="Trust section">
        <div className="merge-trust-inner">
          <div className="merge-trust-heading">
            <p className="merge-trust-label">{TRUST.label}</p>
            <h2 className="merge-trust-title">{TRUST.title}</h2>
            <p className="merge-trust-description">{TRUST.description}</p>
          </div>

          <div className="merge-trust-body-wrap">
            <p className="merge-trust-body">{TRUST.body}</p>
          </div>
        </div>
      </section>

      <section className="case-redesign-content-section merge-outcome-section" aria-label="Outcome section">
        <div className="merge-outcome-inner">
          <div className="merge-outcome-heading">
            <p className="merge-outcome-label">{OUTCOME.label}</p>
            <h2 className="merge-outcome-title">{OUTCOME.title}</h2>
            <p className="merge-outcome-description">{OUTCOME.description}</p>
          </div>

          <div className="merge-outcome-panel">
            <div className="merge-outcome-grid">
              {OUTCOME.items.map((item) => (
                <article key={item.title} className="merge-outcome-item">
                  <h3 className="merge-outcome-item-title">{item.title}</h3>
                  <p className="merge-outcome-item-description">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="case-redesign-content-section merge-closing-section" aria-label="Usability testing section">
        <div className="merge-closing-inner">
          <div className="merge-closing-heading">
            <p className="merge-closing-label">{TESTING.label}</p>
            <h2 className="merge-closing-title">{TESTING.title}</h2>
            <p className="merge-closing-description">{TESTING.description}</p>
          </div>

          <div className="merge-closing-panel merge-testing-panel">
            <div className="merge-testing-grid">
              {TESTING.items.map((item) => (
                <article key={item.title} className="merge-testing-card">
                  <h3 className="merge-testing-card-title">{item.title}</h3>
                  <p className="merge-testing-card-body">{item.body}</p>
                  <p className="merge-testing-card-implication">
                    <span className="merge-testing-card-implication-label">{item.implicationLabel} </span>
                    {item.implication}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="case-redesign-content-section merge-closing-section merge-reflection-section"
        aria-label="Reflection section"
      >
        <div className="merge-closing-inner">
          <div className="merge-closing-heading">
            <p className="merge-closing-label">{REFLECTION.label}</p>
            <h2 className="merge-closing-title">{REFLECTION.title}</h2>
            <p className="merge-closing-description">{REFLECTION.description}</p>
          </div>

          <div className="merge-closing-panel merge-reflection-panel">
            <div className="merge-reflection-grid">
              {REFLECTION.items.map((item, index) => (
                <article key={`${item.title}-${String(index)}`} className="merge-reflection-card">
                  <h3 className="merge-reflection-card-title">{item.title}</h3>
                  <p className="merge-reflection-card-body">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="case-redesign-content-section case-redesign-thank-you" aria-label="Thank you section">
        <div className="case-redesign-thank-you-inner">
          <p className="case-redesign-thank-you-title">Thank you!</p>
          <img src={introLogo} alt="" className="case-redesign-thank-you-logo" aria-hidden="true" />
        </div>
      </section>

      <Footer />
    </>
  )
}

export default MergeProjectDetails
