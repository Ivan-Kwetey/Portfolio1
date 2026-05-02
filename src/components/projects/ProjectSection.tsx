import type { CSSProperties, ReactNode } from 'react'

import AutoplayVideo from '../AutoplayVideo'
import Footer from '../Footer'
import type { ProjectCard } from '../../types/projectCard'

type CaseMediaStyle = CSSProperties & { '--case-media-poster': string }

interface ProjectSectionProps {
  card: ProjectCard
  children?: ReactNode
  index: number
  isLastProject: boolean
  isCaseDescriptionVisible: boolean
  isIntroVisible: boolean
  isProjectContentVisible: boolean
  isProjectOpen: boolean
  isProjectPanelOpen: boolean
  isOutgoingHomePreview: boolean
  onOpenProject: (index: number) => void
  onSetMediaRef: (index: number, node: HTMLDivElement | null) => void
  visibleSectionIndex: number
}

function ProjectSection({
  card,
  children,
  index,
  isLastProject,
  isCaseDescriptionVisible,
  isIntroVisible,
  isProjectContentVisible,
  isProjectOpen,
  isProjectPanelOpen,
  isOutgoingHomePreview,
  onOpenProject,
  onSetMediaRef,
  visibleSectionIndex,
}: ProjectSectionProps) {
  const isPreviewChromeVisible = isCaseDescriptionVisible && !isProjectOpen
  const hasProjectMedia = Boolean(card.mediaVideoUrl || card.mediaPosterUrl)
  const isMetaOnlyProject = !hasProjectMedia && Boolean(card.metaVideoUrl)
  const caseMediaStyle = hasProjectMedia && card.mediaPosterUrl
    ? ({ '--case-media-poster': `url(${card.mediaPosterUrl})` } as CaseMediaStyle)
    : undefined

  return (
    <section
      className={`section-panel section-panel-case-redesign ${
        isProjectOpen
          ? isProjectPanelOpen
            ? `is-open-project-panel ${isProjectContentVisible ? 'is-project-content-visible' : ''}`
            : 'is-hidden-project-panel'
          : ''
      }`.trim()}
      aria-label="Case section"
    >
      <section
        className={`case-redesign-stage ${isProjectPanelOpen ? 'is-project-open' : ''}`.trim()}
        aria-label="Project section"
      >
        {!isProjectOpen ? (
          <>
            <div
              className={`case-home-preview ${isPreviewChromeVisible ? 'is-chrome-visible' : ''} ${
                isOutgoingHomePreview ? 'is-outgoing-case' : ''
              }`.trim()}
              data-node-id="1012:2829"
            >
              <div className="case-home-preview-card-container" data-node-id="1027:1581">
                <div className="case-home-preview-inner-card" data-node-id="1012:2839">
                  <div className="case-home-preview-image-container" data-node-id="1012:2823">
                    <AutoplayVideo
                      src={card.previewVideoUrl}
                      className="case-home-preview-image case-home-preview-video"
                      shouldPlay={
                        !isIntroVisible &&
                        (visibleSectionIndex === index + 1 || isOutgoingHomePreview)
                      }
                      preload="auto"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="case-home-preview-description-container" data-node-id="1012:2826">
                  <p className="case-home-preview-title" data-node-id="1012:2827">
                    {card.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className={`case-home-preview-arrow-button ${
                  isPreviewChromeVisible ? 'is-chrome-visible' : ''
                }`.trim()}
                aria-label="Open project details"
                onClick={() => onOpenProject(index)}
                data-node-id="1012:2840"
              >
                <img src={card.previewArrowUrl} alt="" className="case-home-preview-arrow-icon" />
              </button>
            </div>

            {isLastProject ? (
              <div className="case-home-footer">
                <Footer />
              </div>
            ) : null}
          </>
        ) : null}

        {isProjectPanelOpen ? (
          <div className="case-redesign-card-container is-project-open">
            <div className={`case-redesign-media-shell ${isMetaOnlyProject ? 'is-meta-only' : ''}`.trim()}>
              <div
                className={`case-redesign-project-header ${
                  isProjectContentVisible ? 'is-visible' : ''
                }`.trim()}
              >
                <h1 className="case-redesign-project-title">{card.headline}</h1>
              </div>

              {hasProjectMedia ? (
                <div
                  className="case-redesign-media is-project-open"
                  style={caseMediaStyle}
                  ref={(node) => {
                    onSetMediaRef(index, node)
                  }}
                  role="img"
                  aria-label="Project media cover"
                >
                  {card.mediaVideoUrl ? (
                    <AutoplayVideo
                      src={card.mediaVideoUrl}
                      className="case-redesign-media-video"
                      preload="auto"
                      poster={card.mediaPosterUrl ?? undefined}
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              ) : null}

              {card.metaDetails || card.metaVideoUrl ? (
                <div
                  className={`case-redesign-meta ${
                    card.metaVideoUrl ? 'is-video' : ''
                  } ${isMetaOnlyProject ? 'is-standalone' : ''} ${
                    isProjectContentVisible ? 'is-visible' : ''
                  }`.trim()}
                  aria-label={card.metaVideoUrl ? 'Project meta preview' : 'Project meta details'}
                >
                  {card.metaVideoUrl ? (
                    <div
                      className="case-redesign-meta-video-shell"
                      ref={(node) => {
                        if (isMetaOnlyProject) {
                          onSetMediaRef(index, node)
                        }
                      }}
                    >
                      <AutoplayVideo
                        src={card.metaVideoUrl}
                        className="case-redesign-meta-video"
                        preload="auto"
                        aria-label={`${card.headline} meta preview`}
                      />
                    </div>
                  ) : (
                    card.metaDetails?.map((detail) => (
                      <article key={detail.label} className="case-redesign-meta-item">
                        <p className="case-redesign-meta-label">{detail.label}</p>
                        <p className="case-redesign-meta-value">{detail.value}</p>
                        {detail.support ? (
                          <p className="case-redesign-meta-support">{detail.support}</p>
                        ) : null}
                      </article>
                    ))
                  )}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>

      {isProjectPanelOpen ? children : null}
    </section>
  )
}

export default ProjectSection
