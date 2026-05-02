import AutoplayVideo from '../AutoplayVideo'
import Footer from '../Footer'
import introLogo from '../../assets/man-logo.svg'
import groupCollectionAvatars from '../../assets/group-collection/UserAvatars.png'
import groupCollectionBoundariesVideo from '../../assets/group-collection/boundaries.mp4'
import groupCollectionCentralizedRequestsVideo from '../../assets/group-collection/centralized-requests.mp4'
import groupCollectionCreateGroupVideo from '../../assets/group-collection/create-group.mp4'
import groupCollectionCuratedRecGroupsVideo from '../../assets/group-collection/curated-rec-groups.mp4'
import groupCollectionDesignIntentVideo from '../../assets/group-collection/design-intent.mp4'
import groupCollectionEditGroupVideo from '../../assets/group-collection/edit-group.mp4'
import groupCollectionGroupPageVideo from '../../assets/group-collection/group-page.mp4'
import groupCollectionIpadBezel from '../../assets/ipad bezle.png'
import groupCollectionJoinRequestVideo from '../../assets/group-collection/join-request.mp4'
import groupCollectionPhoneBezel from '../../assets/phone bezle.png'
import groupCollectionSystemScopeImage from '../../assets/group-collection/System scope image.png'
import groupCollectionViewGroupVideo from '../../assets/group-collection/viewgroup.mp4'

const OPPORTUNITY = {
  label: 'The Opportunity',
  title: 'Networking needed a shared space, not just individual profiles',
  description:
    'Superstars already supported individual visibility through video resumes and professional content. Group Collection adds the missing community layer for shared professional identity and collaboration.',
} as const

const PROBLEM = {
  label: 'The Problem',
  title: 'Community discovery and community governance were both missing',
  description:
    'The challenge was broader than browse UX. The product needed one end-to-end system for discovery, trust, moderation, and ownership.',
} as const

const DESIGN_INTENT = {
  label: 'Design Intent',
  title: 'Make groups easy to discover and run',
  description:
    'The core goal was dual-sided: members should quickly find credible communities, while admins should manage access and governance without heavy operational overhead.',
  bezelUrl: groupCollectionPhoneBezel,
  videoUrl: groupCollectionDesignIntentVideo,
} as const

const SYSTEM_SCOPE = {
  label: 'The System / Scope',
  title: 'Group Collection was designed as one connected product system',
  description:
    'The entry point stays lightweight while operational work moves into dedicated, role-specific flows.',
  caption: 'Information Architecture',
} as const

const PRINCIPLES = {
  label: 'Design Principles',
  title: 'Top principles that shaped Group Collection',
  description:
    'These principles guided discovery behavior, moderation operations, and role clarity across the full system.',
  cards: [
    {
      title: 'Progressive discovery',
      description:
        'Start with a small, curated entry point and expand only when users ask for deeper browsing.',
      align: 'left',
      videoUrl: groupCollectionCuratedRecGroupsVideo,
    },
    {
      title: 'Workflow moderation',
      description:
        'Centralize join-request handling so moderation feels operational and scalable, not scattered.',
      align: 'right',
      videoUrl: groupCollectionCentralizedRequestsVideo,
    },
    {
      title: 'Authority boundaries',
      description:
        'Make Primary vs Second Admin responsibilities explicit in the UI to prevent permission ambiguity.',
      align: 'left',
      videoUrl: groupCollectionBoundariesVideo,
    },
  ],
} as const

const FINAL_DESIGN = {
  label: 'Final Design',
  title: 'Group Collection was shaped as a connected experience across three moments.',
  description:
    'How a community is found, how it is entered, and how it is sustained. Together, these flows position groups as a more intentional layer of professional networking inside Superstars.',
  steps: [
    {
      title: 'Entering the Network',
      description:
        'Discovery starts focused, then expands as intent becomes clearer. Users see relevance early before exploring further.',
      align: 'left',
      layout: 'wide',
      mediaItems: [
        {
          videoUrl: groupCollectionViewGroupVideo,
          bezelUrl: groupCollectionIpadBezel,
          device: 'ipad',
          caption: 'Groups Hub + View All Groups',
        },
      ],
    },
    {
      title: 'Crossing the Threshold',
      description:
        'Participation balances member trust with admin clarity in one flow. Users assess fit while admins manage access with clearer context.',
      align: 'right',
      layout: 'dual',
      mediaItems: [
        {
          videoUrl: groupCollectionGroupPageVideo,
          bezelUrl: groupCollectionPhoneBezel,
          device: 'phone',
          caption: 'Group Page',
        },
        {
          videoUrl: groupCollectionJoinRequestVideo,
          bezelUrl: groupCollectionPhoneBezel,
          device: 'phone',
          caption: 'Join Requests',
        },
      ],
    },
    {
      title: 'Holding the Structure',
      description:
        'Governance stays lightweight to start, with clear authority boundaries. Creation and settings support continuity without ambiguity.',
      align: 'left',
      layout: 'dual',
      mediaItems: [
        {
          videoUrl: groupCollectionCreateGroupVideo,
          bezelUrl: groupCollectionPhoneBezel,
          device: 'phone',
          caption: 'Create Group',
        },
        {
          videoUrl: groupCollectionEditGroupVideo,
          bezelUrl: groupCollectionPhoneBezel,
          device: 'phone',
          caption: 'Edit Group',
        },
      ],
    },
  ],
} as const

const EDGE_CASES = {
  label: 'Edge Cases / System Thinking',
  title: 'The experience had to work beyond the ideal path',
  description: 'Pre-launch quality depended on handling ambiguity, scale, and empty states clearly.',
  cards: [
    {
      index: '1',
      text: 'If a group has no Second Admin, that state should be visible and easy to resolve.',
    },
    {
      index: '2',
      text: 'If request volume grows, sorting and future bulk actions should reduce triage cost.',
    },
    {
      index: '3',
      text: 'If a Second Admin reaches ownership-level controls, boundaries should be explained in context.',
    },
    {
      index: '4',
      text: 'If requests are empty or membership is sparse, empty states should still guide next actions.',
    },
    {
      index: '5',
      text: 'If requests are empty or membership is sparse, empty states should still guide next actions.',
    },
  ],
} as const

const EXPECTED_IMPACT = {
  label: 'Expected Impact',
  title: 'Because Group Collection is pre-launch, success is framed as measurable hypotheses.',
  description:
    'Higher group discovery and group-page visits, stronger request-to-approval conversion, lower review time for join requests, reduced admin effort per approved member, and fewer permission-related mistakes.',
} as const

const REFLECTION = {
  label: 'Reflection',
  title: 'The hardest part was not the interface. It was the authority model.',
  description:
    'Community features succeed when member experience and admin operations are designed together.',
  support:
    'Designing Group Collection reinforced that product coherence comes from linking discovery, moderation, and governance as one system. Once ownership boundaries were explicit, the product felt safer, more scalable, and more trustworthy for both members and operators.',
} as const

interface GroupCollectionsProjectDetailsProps {
  onOpenSystemScopeZoom: () => void
}

function GroupCollectionsProjectDetails({ onOpenSystemScopeZoom }: GroupCollectionsProjectDetailsProps) {
  return (
    <>
      <section className="case-redesign-content-section case-redesign-opportunity" aria-label="Opportunity section">
        <div className="case-redesign-opportunity-inner">
          <p className="case-redesign-opportunity-label">{OPPORTUNITY.label}</p>
          <h2 className="case-redesign-opportunity-title">{OPPORTUNITY.title}</h2>
          <p className="case-redesign-opportunity-description">{OPPORTUNITY.description}</p>

          <img
            src={groupCollectionAvatars}
            alt=""
            className="case-redesign-opportunity-avatars-image"
            loading="lazy"
            aria-hidden="true"
          />
        </div>
      </section>

      <section
        className="case-redesign-content-section case-redesign-problem"
        aria-label="Problem section"
      >
        <div className="case-redesign-problem-inner">
          <p className="case-redesign-problem-label">{PROBLEM.label}</p>
          <h2 className="case-redesign-problem-title">{PROBLEM.title}</h2>
          <p className="case-redesign-problem-description">{PROBLEM.description}</p>
        </div>
      </section>

      <section
        className="case-redesign-content-section case-redesign-design-intent"
        aria-label="Design intent section"
      >
        <div className="case-redesign-design-intent-card">
          <div className="case-redesign-design-intent-heading">
            <p className="case-redesign-design-intent-label">{DESIGN_INTENT.label}</p>
            <h2 className="case-redesign-design-intent-title">{DESIGN_INTENT.title}</h2>
          </div>

          <div className="case-redesign-design-intent-media-wrap">
            <div className="case-redesign-design-intent-phone-frame">
              <div className="case-redesign-design-intent-screen-viewport">
                <AutoplayVideo
                  src={DESIGN_INTENT.videoUrl}
                  className="case-redesign-design-intent-video"
                  preload="auto"
                  aria-label="Design intent prototype preview"
                />
              </div>
              <img
                src={DESIGN_INTENT.bezelUrl}
                alt=""
                className="case-redesign-design-intent-bezel"
                loading="lazy"
                aria-hidden="true"
              />
            </div>
          </div>

          <p className="case-redesign-design-intent-description">{DESIGN_INTENT.description}</p>
        </div>
      </section>

      <section
        className="case-redesign-content-section case-redesign-system-scope"
        aria-label="System scope section"
      >
        <div className="case-redesign-system-scope-inner">
          <p className="case-redesign-system-scope-label">{SYSTEM_SCOPE.label}</p>
          <h2 className="case-redesign-system-scope-title">{SYSTEM_SCOPE.title}</h2>
          <p className="case-redesign-system-scope-description">{SYSTEM_SCOPE.description}</p>

          <div className="case-redesign-system-scope-media-panel">
            <button
              type="button"
              className="case-redesign-system-scope-media-trigger"
              aria-label="Enlarge system scope image"
              onClick={onOpenSystemScopeZoom}
            >
              <div className="case-redesign-system-scope-media-wrap">
                <img
                  src={groupCollectionSystemScopeImage}
                  alt="System scope information architecture"
                  className="case-redesign-system-scope-media"
                  loading="lazy"
                />
              </div>
            </button>
            <p className="case-redesign-system-scope-caption">{SYSTEM_SCOPE.caption}</p>
          </div>
        </div>
      </section>

      <section className="case-redesign-content-section case-redesign-principles" aria-label="Design principles section">
        <div className="case-redesign-principles-inner">
          <div className="case-redesign-principles-heading">
            <p className="case-redesign-principles-label">{PRINCIPLES.label}</p>
            <h2 className="case-redesign-principles-title">{PRINCIPLES.title}</h2>
            <p className="case-redesign-principles-description">{PRINCIPLES.description}</p>
          </div>

          <div className="case-redesign-principles-cards">
            {PRINCIPLES.cards.map((principle) => (
              <article key={principle.title} className="case-redesign-principles-card">
                <div
                  className={`case-redesign-principles-card-copy ${principle.align === 'right' ? 'is-right' : ''}`.trim()}
                >
                  <h3 className="case-redesign-principles-card-title">{principle.title}</h3>
                  <p className="case-redesign-principles-card-description">{principle.description}</p>
                </div>

                <div className="case-redesign-principles-card-media-container">
                  <AutoplayVideo
                    className="case-redesign-principles-card-media"
                    preload="auto"
                    aria-hidden="true"
                  >
                    <source src={principle.videoUrl} type="video/mp4" />
                  </AutoplayVideo>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-redesign-content-section case-redesign-final-design" aria-label="Final design section">
        <div className="case-redesign-final-design-inner">
          <section className="case-redesign-final-design-subsection case-redesign-final-design-header">
            <p className="case-redesign-final-design-label">{FINAL_DESIGN.label}</p>
            <h2 className="case-redesign-final-design-title">{FINAL_DESIGN.title}</h2>
            <p className="case-redesign-final-design-description">{FINAL_DESIGN.description}</p>
          </section>

          {FINAL_DESIGN.steps.map((step) => (
            <section
              key={step.title}
              className="case-redesign-final-design-subsection case-redesign-final-design-step"
            >
              <div
                className={`case-redesign-final-design-step-heading ${step.align === 'right' ? 'is-right' : ''}`.trim()}
              >
                <div className="case-redesign-final-design-step-copy">
                  <h3 className="case-redesign-final-design-step-title">{step.title}</h3>
                  <p className="case-redesign-final-design-step-description">{step.description}</p>
                </div>
              </div>

              <div className={`case-redesign-final-design-media case-redesign-final-design-media-${step.layout}`}>
                {step.mediaItems.map((mediaItem, mediaIndex) => (
                  <figure key={`${step.title}-${String(mediaIndex + 1)}`} className="case-redesign-final-design-media-item">
                    {mediaItem.device === 'ipad' ? (
                      <div className="case-redesign-final-design-ipad-frame">
                        <div className="case-redesign-final-design-ipad-screen-viewport">
                          <AutoplayVideo
                            src={mediaItem.videoUrl}
                            className="case-redesign-final-design-ipad-video"
                            preload="auto"
                            aria-hidden="true"
                          />
                        </div>
                        <img
                          src={mediaItem.bezelUrl}
                          alt=""
                          className="case-redesign-final-design-ipad-bezel"
                          loading="lazy"
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <div className="case-redesign-design-intent-phone-frame case-redesign-final-design-intent-phone-frame">
                        <div className="case-redesign-design-intent-screen-viewport">
                          <AutoplayVideo
                            src={mediaItem.videoUrl}
                            className="case-redesign-design-intent-video"
                            preload="auto"
                            aria-hidden="true"
                          />
                        </div>
                        <img
                          src={mediaItem.bezelUrl}
                          alt=""
                          className="case-redesign-design-intent-bezel"
                          loading="lazy"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <figcaption className="case-redesign-final-design-media-caption">
                      {mediaItem.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="case-redesign-content-section case-redesign-edge-cases" aria-label="Edge cases and system thinking section">
        <div className="case-redesign-edge-cases-inner">
          <div className="case-redesign-edge-cases-header">
            <p className="case-redesign-edge-cases-label">{EDGE_CASES.label}</p>
            <h2 className="case-redesign-edge-cases-title">{EDGE_CASES.title}</h2>
            <p className="case-redesign-edge-cases-description">{EDGE_CASES.description}</p>
          </div>

          <div className="case-redesign-edge-cases-grid">
            {EDGE_CASES.cards.slice(0, 4).map((item) => (
              <article key={item.index} className="case-redesign-edge-cases-card">
                <span className="case-redesign-edge-cases-number">{item.index}</span>
                <p className="case-redesign-edge-cases-card-text">{item.text}</p>
              </article>
            ))}
          </div>

          <article className="case-redesign-edge-cases-card case-redesign-edge-cases-card-centered">
            <span className="case-redesign-edge-cases-number">{EDGE_CASES.cards[4].index}</span>
            <p className="case-redesign-edge-cases-card-text">{EDGE_CASES.cards[4].text}</p>
          </article>
        </div>
      </section>

      <section className="case-redesign-content-section case-redesign-expected-impact" aria-label="Expected impact section">
        <div className="case-redesign-expected-impact-inner">
          <div className="case-redesign-expected-impact-header">
            <p className="case-redesign-expected-impact-label">{EXPECTED_IMPACT.label}</p>
            <h2 className="case-redesign-expected-impact-title">{EXPECTED_IMPACT.title}</h2>
          </div>
          <p className="case-redesign-expected-impact-description">{EXPECTED_IMPACT.description}</p>
        </div>
      </section>

      <section className="case-redesign-content-section case-redesign-reflection" aria-label="Reflection section">
        <div className="case-redesign-reflection-inner">
          <div className="case-redesign-reflection-header">
            <p className="case-redesign-reflection-label">{REFLECTION.label}</p>
            <h2 className="case-redesign-reflection-title">{REFLECTION.title}</h2>
            <p className="case-redesign-reflection-description">{REFLECTION.description}</p>
          </div>
          <p className="case-redesign-reflection-support">{REFLECTION.support}</p>
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

export default GroupCollectionsProjectDetails
